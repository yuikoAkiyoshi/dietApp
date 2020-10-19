import { useEffect, useState } from "react";
import Router from "next/router";

import Layout from "../components/myLayout.js";
import NewGift from "../components/newGift.js";

const UsePoint = ({ gifts, totalPoint }) => {
  const [pointInstanceId, setPointInstanceId] = useState({});
  let pointInstanceIdArray = [];
  // console.log(gifts);

  useEffect(() => {
    //ポイントインスタンスのIDを配列に格納
    {
      totalPoint.map((item, index) => {
        pointInstanceIdArray.push(item._id);
      });
    }
    setPointInstanceId(pointInstanceIdArray);
  }, []);

  // 削除
  const deleteGift = (id) => {
    fetch("/gift/delete", {
      method: "DELETE",
      body: JSON.stringify({
        id: id,
      }),
      headers: {
        "Content-Type": "application/json; charset=utf-8",
      },
    });
    Router.push({
      pathname: "/usePoint",
    });
  };

  //ポイント減算
  function usePoint(point) {
    if (totalPoint[0].totalPoint < point) {
      window.alert("ポイントが足りません");
    } else {
      fetch("/totalPoint/put", {
        method: "PUT",
        body: JSON.stringify({
          id: pointInstanceId,
          totalPoint: totalPoint[0].totalPoint,
          point: -point,
        }),
        headers: {
          "Content-Type": "application/json; charset=utf-8",
        },
      });
      window.alert("ポイントを交換しました");
      Router.push({
        pathname: "/usePoint",
      });
    }
  }
  return (
    <Layout>
      <div className="totalPoint">
        <div className="tabBg">POINT</div>
        <h1 className="title title--totalPoint">現在保有ポイント</h1>
        <div className="pointCircle">
          <div className="pointCircle__inner">{totalPoint[0].totalPoint}</div>
        </div>
      </div>
      <NewGift />
      <div>
        <h1 className="title">ポイントを交換する</h1>
        <ul className="listWrapper">
          {gifts.map((gift, index) => {
            return (
              <li key={index} className="list">
                <div className="list__content">
                  <div className="text">{gift.name}</div>
                  <div className="point">{gift.point}pt</div>
                </div>
                <div className="list__btn">
                  <button
                    className="change"
                    onClick={() => usePoint(gift.point)}
                  >
                    交換する
                  </button>
                  <button onClick={() => deleteGift(gift._id)}>削除</button>
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
          left: 85px;
          height: 32px;
          background: #fff;
          border-radius: 12px 12px 0 0;
          font-size: 12px;
          padding: 8px;
          box-sizing: border-box;
          letter-spacing: .4px;
        }
        .title--totalPoint {
          margin: 0 28px 24px;
        }
        .totalPoint {
          padding: 32px 0;
          background: #fff;
        }
        .pointCircle {
          margin: auto;
          padding: 3px;
          width: 160px;
          height: 160px;
          line-height: 160px;
          text-align: center;
          background-image: linear-gradient(to right, #74ebd5 0%, #9face6 100%);
          border-radius: 50%;
        }
        .pointCircle__inner {
          background: #fff;
          border-radius: 50%;
          font-size: 32px;
        }
        .text {
          word-break: break-all;
        }
      `}</style>
    </Layout>
  );
};

UsePoint.getInitialProps = async () => {
  const giftsResponse = await fetch("http://localhost:3000/gifts/get");
  const totalPointResponse = await fetch(
    "http://localhost:3000/totalPoint/get"
  );
  const gifts = await giftsResponse.json();
  const totalPoint = await totalPointResponse.json();

  return { gifts, totalPoint };
};

export default UsePoint;
