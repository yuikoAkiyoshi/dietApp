import { useReducer, useEffect, useState } from "react";
import Router from "next/router";

import AppContext from "../contexts/appContext";
import Reducer from "../reducers/rootReducer";

import Layout from "../components/myLayout.js";
import NewTodo from "../components/newTodo.js";
import Initialize from "../components/initialize";

const Index = ({ todos, totalPoint }) => {
  const initialState = {
    todo: "",
    point: 0,
  };
  const [state, dispatch] = useReducer(Reducer, initialState);
  const [pointInstanceId, setPointInstanceId] = useState({});
  const [checked, setChecked] = useState({});
  const [initializeFinishedFlag, setInitializeFinishedFlag] = useState(false);

  let pointInstanceIdArray = [];
  let checkedObject = {};

  let initializeDOM = <></>;

  //日付を跨いだらlocalStorageをクリアする
  function clearLocalStorage(key) {
    let _jsonStoreObj = JSON.parse(localStorage.getItem(key));

    if (_jsonStoreObj != undefined && _jsonStoreObj.timestamp) {
      console.log("clearLocalStorage");
      var oBjTime = new Date(_jsonStoreObj.timestamp).getDate();
      var nowTime = new Date().getDate();
      console.log('作った時間',oBjTime);
      console.log('今',nowTime);

      if (oBjTime !== nowTime) {
        localStorage.removeItem(key);
      }
    }
  }

  //SSRされた後に実行されるので、localstrageがないというエラーは起きないが、jsxのなかで変数が使えない。のでこの中でsetStateする
  useEffect(() => {
    //ポイントインスタンスのIDを配列に格納
    {
      totalPoint.map((item, index) => {
        pointInstanceIdArray.push(item._id);
      });
    }
    setPointInstanceId(pointInstanceIdArray);

    //todoのIDごとにcheckedの状況を連想配列として格納
    {
      todos.map((todoItem, index) => {
        let todoItemId = todoItem._id;
        //localStorageをクリア
        clearLocalStorage(todoItemId);
        let localStorageObject = JSON.parse(localStorage.getItem(todoItemId));
        if (localStorageObject !== null) {
          let checked = localStorageObject.isCheck;
          checkedObject[todoItemId] = checked;
        }
      });
    }
    setChecked(checkedObject);

    //初期設定が完了済みか判定
    if (localStorage.getItem("initializeFinished")) {
      setInitializeFinishedFlag(true);
    }
  }, []);

  // 削除
  const deleteTodo = (id) => {
    fetch("/index/delete", {
      method: "DELETE",
      body: JSON.stringify({
        id: id,
      }),
      headers: {
        "Content-Type": "application/json; charset=utf-8",
      },
    });
    Router.push({
      pathname: "/index",
    });
  };

  //ポイント加算減算
  function handleDone(event, pointInstanceId, point, todoItemId) {
    const checked = event.target.checked;
    if (checked) {
      console.log("checked", totalPoint[0].totalPoint, point);
      let dataList = {
        isCheck: "checked",
        timestamp: new Date().getTime(),
      };
      localStorage.setItem(todoItemId, JSON.stringify(dataList));
      //ポイント加算
      fetch("/totalPoint/put", {
        method: "PUT",
        body: JSON.stringify({
          id: pointInstanceId,
          totalPoint: totalPoint[0].totalPoint,
          point: point,
        }),
        headers: {
          "Content-Type": "application/json; charset=utf-8",
        },
      });
      Router.push({
        pathname: "/index",
      });
    } else {
      let minusPoint = -point;
      console.log("not checked", totalPoint[0].totalPoint, minusPoint);
      let dataList = {
        isCheck: "",
        timestamp: new Date().getTime(),
      };
      localStorage.setItem(todoItemId, JSON.stringify(dataList));
      //ポイント減算
      fetch("/totalPoint/put", {
        method: "PUT",
        body: JSON.stringify({
          id: pointInstanceId,
          totalPoint: totalPoint[0].totalPoint,
          point: minusPoint,
        }),
        headers: {
          "Content-Type": "application/json; charset=utf-8",
        },
      });
      Router.push({
        pathname: "/index",
      });
    }
  }

  //初期設定画面の表示非表示
  if (!initializeFinishedFlag) {
    initializeDOM = <Initialize />;
  } else {
    initializeDOM = <></>;
  }

  return (
    <AppContext.Provider value={{ state, dispatch }}>
      <Layout>
        {initializeDOM}
        <NewTodo />
        <div className="tabBg">TODO</div>
        <h1 className="title">やることリスト</h1>
        <ul className="listWrapper">
          {todos.map((todoItem, index) => {
            let thisId = todoItem._id;
            return (
              <li key={index} className="list">
                <div className="list__content">
                  <label className="label">
                    <input
                      className="input"
                      type="checkbox"
                      checked={checked[thisId]}
                      onChange={(event) =>
                        handleDone(
                          event,
                          pointInstanceId[0],
                          todoItem.point,
                          todoItem._id
                        )
                      }
                    />
                    {todoItem.todo}
                    <img className="checkImg" src="/check.png" />
                  </label>
                  <div className="point">{todoItem.point}pt</div>
                </div>
                <div className="list__btn">
                  <button onClick={() => deleteTodo(todoItem._id)}>削除</button>
                </div>
              </li>
            );
          })}
        </ul>
        <style jsx>{`
          .tabBg {
            position: absolute;
            top: 36px;
            left: 24px;
            height: 32px;
            background: #f6f6f6;
            border-radius: 12px 12px 0 0;
            font-size: 12px;
            padding: 8px;
            box-sizing: border-box;
            letter-spacing: 0.4px;
          }
          .label {
            position: relative;
            word-break: break-all;
            padding-left: 33px;
          }
          .label::before {
            content: "";
            display: inline-block;
            position: absolute;
            top: 50%;
            left: 0;
            width: 16px;
            height: 16px;
            border: solid 2px #dedcd7;
            border-radius: 3px;
            transform: translateY(-50%);
          }
          .checkImg {
            display: none;
          }
          input[type="checkbox"]:checked + .checkImg {
            display: block;
            position: absolute;
            top: 50%;
            left: 3px;
            width: 16px;
            transform: translateY(-50%);
          }
          input[type="checkbox"]:checked.label {
            text-decoration: line-through;
          }
          .input {
            display: none;
          }
        `}</style>
      </Layout>
    </AppContext.Provider>
  );
};

Index.getInitialProps = async () => {
  const todoResponse = await fetch("http://localhost:3000/index/get");
  const totalPointResponse = await fetch(
    "http://localhost:3000/totalPoint/get"
  );
  const todos = await todoResponse.json();
  const totalPoint = await totalPointResponse.json();

  return { todos, totalPoint };
};

export default Index;
