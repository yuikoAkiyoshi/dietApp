import { useEffect, useState } from "react";
import Router from "next/router";

import Layout from "../components/myLayout.js";
import NewWeight from "../components/newWeight.js";

const Weight = ({ weights, targetWeight }) => {
  const [recentlyInputDate, setRecentlyInputDate] = useState();
  const [filteredWeight, setFilteredWeight] = useState([{}]);
  const [updateFlag, setUpdateFlag] = useState(false);
  const [newTargetWeight, setNewTargetWeight] = useState(0);
  // console.log("直近の入力ずみ日", recentlyInputDate);
  // console.log("現在体重", filteredWeight);
  // console.log(targetWeight);
  // console.log(newTargetWeight);

  let now = new Date();
  let dateArray = [];
  let differenceArray = [];
  let result;

  useEffect(() => {
    //各日付を計算しやすい形式に変換
    weights.map((weight, index) => {
      let thisDate = new Date(weight.date);
      dateArray.push(thisDate.getTime());
    });
    // 現在時刻との差分を求める
    dateArray.map((item, index) => {
      let difference = now.getTime() - item;
      differenceArray.push(difference);
    });
    // 最も現在時刻に近い物を抽出
    const aryMin = function (a, b) {
      return Math.min(a, b);
    };
    let min = differenceArray.reduce(aryMin);
    // 日付に復元
    let _recentlyInputDate = now.getTime() - min;
    result = new Date(_recentlyInputDate);
    setRecentlyInputDate(result);

    let _filteredWeight = weights.filter((item) => {
      let a = new Date(item.date).getTime();
      return a === result.getTime();
    });
    setFilteredWeight(_filteredWeight);
  }, []);

  // 体重削除
  const deleteWeight = (id) => {
    fetch("/weight/delete", {
      method: "DELETE",
      body: JSON.stringify({
        id: id,
      }),
      headers: {
        "Content-Type": "application/json; charset=utf-8",
      },
    });
    Router.push({
      pathname: "/weight",
    });
  };

  // フラグ反転
  const handleUpdateTargetWeight = () => {
    setUpdateFlag(true);
  };

  // 目標体重更新
  const updateTargetWeight = (id) => {
    setUpdateFlag(false);
    fetch("/targetWeight/put", {
      method: "PUT",
      body: JSON.stringify({
        id: id,
        targetWeight: newTargetWeight,
      }),
      headers: {
        "Content-Type": "application/json; charset=utf-8",
      },
    });
    Router.push({
      pathname: "/weight",
    });
  };

  let updateTargetWeightDom = <></>;
  if (updateFlag) {
    updateTargetWeightDom = (
      <div>
        {targetWeight.map((item, index) => {
          return (
            <div key={index}>
              <input
                className="form__input"
                type="number"
                name="newTargetWeight"
                onChange={(e) => setNewTargetWeight(e.target.value)}
                value={newTargetWeight}
              />
              <button
                className="updateBtn"
                onClick={() => {
                  updateTargetWeight(item._id);
                }}
              >
                更新
              </button>
            </div>
          );
        })}
      </div>
    );
  } else {
    updateTargetWeightDom = (
      <div>
        {targetWeight.map((item, index) => {
          return (
            <div key={index}>
              <div>
                目標体重：<em>{item.targetWeight}</em>Kg
              </div>
              <button
                className="updateBtn"
                onClick={() => {
                  handleUpdateTargetWeight();
                }}
              >
                編集する
              </button>
            </div>
          );
        })}
      </div>
    );
  }

  return (
    <Layout>
      <NewWeight />
      <div className="weightMv">
        <div className="tabBg">WEIGHT</div>
        <h1 className="title title--weightMv">体重</h1>
        <div className="weightMv__content">
          現在体重：<em>{filteredWeight[0].weight}</em>kg
        </div>
        <div className="weightMv__content weightMv__content--target">
          {updateTargetWeightDom}
        </div>
      </div>
      <div>
        <h1 className="title title--weightList">履歴</h1>
        <ul className="weightList">
          {weights.map((weight, index) => {
            let year = new Date(weight.date).getFullYear();
            let month = new Date(weight.date).getMonth();
            let date = new Date(weight.date).getDate();
            return (
              <li className="weightItem" key={index}>
                <div className="weightItem__date">
                  {year}/{month}/{date}
                </div>
                <div className="weightItem__weight">
                  <span>{weight.weight}</span>kg
                </div>
                <div className="list__btn">
                  <button onClick={() => deleteWeight(weight._id)}>削除</button>
                </div>
              </li>
            );
          })}
        </ul>
      </div>
      <style jsx>{`
        .tabBg {
          position: absolute;
          top: 36px;
          left: 148px;
          height: 32px;
          background: #fff;
          border-radius: 12px 12px 0 0;
          font-size: 12px;
          padding: 8px;
          box-sizing: border-box;
          letter-spacing: .4px;
        }
        .title--weightMv {
          margin: 0 0 24px;
        }
        .title--weightList {
          margin-bottom: 0;
        }
        .weightMv {
          padding: 32px;
          background: #fff;
        }
        .weightMv__content {
          display: flex;
          justify-content: center;
          align-items: center;
          padding: 0 24px;
          height: 88px;
          background-image: linear-gradient(to right, #69eacb, #eaccf8);
          border-radius: 12px;
          text-align: center;
        }
        .weightMv__content--target {
          background-image: linear-gradient(to right, #EACCF8, #6654F1);
        }
        .weightMv__content + .weightMv__content {
          margin-top: 16px;
        }
        .form__input {
          height: 12px;
        }
        .weightList {
          display: flex;
          flex-wrap: wrap;
          margin-left: -8px;
          padding: 16px 33.5px;
          list-style: none;
        }
        .weightItem {
          margin-top: 12px;
          margin-left: 8px;
          padding: 8px;
          width: 150px;
          border-radius: 12px;
          background: #fff;
          box-sizing: border-box;
          box-shadow: 0 2px 6px rgba(36, 37, 38, 0.08);
        }
        .weightItem__date {
          font-size: 10px;
        }
        .weightItem__weight {
          margin-top: 16px;
          text-align: center;
        }
        .weightItem__weight span {
          font-size: 24px;
        }
        .list__btn {
          margin-top: 8px;
        }
      `}</style>
    </Layout>
  );
};

Weight.getInitialProps = async () => {
  const weightsResponse = await fetch("http://localhost:3000/weights/get");
  const targetWeightResponse = await fetch(
    "http://localhost:3000/targetWeight/get"
  );

  const weights = await weightsResponse.json();
  const targetWeight = await targetWeightResponse.json();

  return { weights, targetWeight };
};

export default Weight;
