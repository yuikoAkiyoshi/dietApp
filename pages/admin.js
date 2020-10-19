//totalポイントインスタンスと目標体重の管理;
import Router from "next/router";

import Layout from "../components/myLayout.js";

const Admin = ({ totalPoint, targetWeight, todos }) => {
  // ポイントインスタンス削除
  const deleteTotalPoint = (id) => {
    fetch("/totalPoint/delete", {
      method: "DELETE",
      body: JSON.stringify({
        id: id,
      }),
      headers: {
        "Content-Type": "application/json; charset=utf-8",
      },
    });
    Router.push({
      pathname: "/admin",
    });
  };
  // 目標体重削除
  const deleteTargetWeight = (id) => {
    fetch("/targetWeight/delete", {
      method: "DELETE",
      body: JSON.stringify({
        id: id,
      }),
      headers: {
        "Content-Type": "application/json; charset=utf-8",
      },
    });
    Router.push({
      pathname: "/admin",
    });
  };

  return (
    <Layout>
      <ul>
        ポイントインスタンスID
        {totalPoint.map((item, index) => {
          return (
            <>
              <li key={index}>
                {item._id}
                <button
                  onClick={() => {
                    deleteTotalPoint(item._id);
                  }}
                >
                  削除
                </button>
              </li>
            </>
          );
        })}
      </ul>
      <ul>
        目標体重ID
        {targetWeight.map((item, index) => {
          return (
            <>
              <li key={index}>
                <div>id:{item._id}</div>
                <div>体重：{item.targetWeight}</div>
                <button
                  onClick={() => {
                    deleteTargetWeight(item._id);
                  }}
                >
                  削除
                </button>
              </li>
            </>
          );
        })}
      </ul>
      <ul>
        TODOアイテムID
        {todos.map((todoItem, index) => {
          let thisId = todoItem._id;
          return (
            <li key={index} className="list">
              {thisId}
            </li>
          );
        })}
      </ul>
    </Layout>
  );
};

Admin.getInitialProps = async () => {
  const totalPointResponse = await fetch(
    "http://localhost:3000/totalPoint/get"
  );
  const targetWeightResponse = await fetch(
    "http://localhost:3000/targetWeight/get"
  );
  const todoResponse = await fetch("http://localhost:3000/index/get");
  const totalPoint = await totalPointResponse.json();
  const targetWeight = await targetWeightResponse.json();
  const todos = await todoResponse.json();

  return { totalPoint, targetWeight, todos };
};

export default Admin;
