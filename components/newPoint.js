import { useState, useRef } from "react";
// import Router from "next/router";

const NewPoint = ({props}) => {
  const modal = useRef(null);
  const bg = useRef(null);

  const startPoint = () => {
    fetch("/totalPoint/post", {
      method: "POST",
      body: JSON.stringify({
        totalPoint: 0,
      }),
      headers: {
        "Content-Type": "application/json; charset=utf-8",
      },
    });
    bg.current.style.display = 'block';
    modal.current.style.opacity = '1';
    setTimeout(function(){
      modal.current.style.opacity = '0';
    },1500);
    // Router.push({
    //   pathname: '/index',
    // });
    props();
  };

  return (
    <>
      <button className="pointBtn" onClick={startPoint}>
        ポイントを始める
      </button>
      <div className="modal" ref={modal}>
        ポイントを貯める準備が<br/>整いました！
      </div>
      <div className="bg" ref={bg}></div>
      <style jsx>{`
        .pointBtn {
          display: block;
          margin: 64px auto 0;
          width: 40%;
          background: rgba(255,255,255,0.8);
          line-height: 44px;
          border-radius: 32px;
          border-bottom: 4px solid rgba(0,0,0,.3);
        }
        .modal {
          display: flex;
          position: absolute;
          top: 50%;
          left: 50%;
          z-index: 101;
          transform: translate(-50%, -50%);
          margin: auto;
          padding: 12px;
          width: 200px;
          height: 100px;
          background: rgba(255,255,255,0.9);
          border-radius: 16px;
          text-align: center;
          justify-content: center;
          align-items: center;
          box-shadow: 0 2px 6px rgba(36, 37, 38, 0.08);
          opacity: 0;
          pointer-events: none;
          transition: .3s;
        }
      `}</style>
    </>
  );
};

export default NewPoint;
