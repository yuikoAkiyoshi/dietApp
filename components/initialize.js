import { useState, useRef, useEffect } from "react";
import Router from "next/router";

import NewPoint from "../components/newPoint.js";
import NewTargetWeight from "../components/newTargetWeight.js";

const Initialize = () => {
  const [pointExi, setPointExi] = useState(false);
  const [weightExi, setWeightExi] = useState(false);

  const sec1 = useRef(null);
  const sec2 = useRef(null);
  const sec3 = useRef(null);
  const sec4 = useRef(null);
  const sec5 = useRef(null);

  useEffect(() => {
    sec1.current.style.display = "block";
  }, []);

  const changeSlide = (currentSec, nextSec) => {
    currentSec.current.style.display = "none";
    nextSec.current.style.display = "block";
  };

  const finishInitialize = () => {
    sec5.current.style.display = "none";
    localStorage.setItem("initializeFinished", true);
  };

  const totalPointExiStateFunc = () => {
    setPointExi(true);
  };

  const targetWeightExiStateFunc = () => {
    setWeightExi(true);
  };

  // ポイント活性・非活性
  let secPointNextBtn = <></>;
  if (pointExi) {
    secPointNextBtn = (
      <>
        <div
          className="secBtn"
          onClick={() => {
            changeSlide(sec2, sec3);
          }}
        >
          次へ
        </div>
      </>
    );
  } else {
    secPointNextBtn = (
      <>
        <div className="secBtn disable">次へ</div>
      </>
    );
  }

  // 目標体重活性・非活性
  let secWeightNextBtn = <></>;
  if (weightExi) {
    secWeightNextBtn = (
      <>
        <div
          className="secBtn"
          onClick={() => {
            changeSlide(sec4, sec5);
          }}
        >
          次へ
        </div>
      </>
    );
  } else {
    secWeightNextBtn = (
      <>
        <div className="secBtn disable">次へ</div>
      </>
    );
  }

  return (
    <>
      <section className="sec sec1" ref={sec1}>
        <div className="favicon">
          TO
          <br />
          DO
        </div>
        <div className="circle"></div>
        <div className="secText">
          <span>ようこそ！</span>
          <br />
          ダイエットを始めましょう
        </div>
        <img className="secImg" />
        <div
          className="secBtn"
          onClick={() => {
            changeSlide(sec1, sec2);
          }}
        >
          次へ
        </div>
      </section>
      <section className="sec sec2" ref={sec2}>
        <div className="secText">
          毎日のTODOを設定して
          <br />
          ポイントを集めよう
        </div>
        <img className="secImgPoint" src="/getPoint.svg" />
        <NewPoint props={totalPointExiStateFunc} />
        {secPointNextBtn}
      </section>
      <section className="sec sec3" ref={sec3}>
        <div className="secText">
          ポイントは自分で設定した景品と交換することが可能！
        </div>
        <div className="secImgWrapper">
          <img className="secImg" src="/getPoint.svg" />
          <div className="arrow"></div>
          <img className="secImg" src="/gift.svg" />
        </div>
        <div
          className="secBtn"
          onClick={() => {
            changeSlide(sec3, sec4);
          }}
        >
          次へ
        </div>
      </section>
      <section className="sec sec4" ref={sec4}>
        <div className="secText">
          体重入力で
          <br />
          日々の変化をチェック！
        </div>
        <NewTargetWeight props={targetWeightExiStateFunc} />
        <img className="secImg" />
        {secWeightNextBtn}
      </section>
      <section className="sec sec5" ref={sec5}>
        <div className="secText">
          <span>さあ、はじめよう！</span>
        </div>
        <div
          className="secBtn"
          onClick={() => {
            finishInitialize();
          }}
        >
          ダイエットを始める
        </div>
      </section>
      <style jsx>{`
        .sec {
          display: none;
          position: fixed;
          top: 0;
          width: 100vw;
          height: 100%;
          background-image: linear-gradient(
            to top,
            #69eacb 0%,
            #eaccf8 48%,
            #6654f1 100%
          );
          text-algin: center;
          z-index: 100;
        }
        .circle {
          position: absolute;
          top: -400px;
          left: 50%;
          width: 600px;
          height: 600px;
          background: rgba(255, 255, 255, 0.2);
          border-radius: 50%;
          transform: translateX(-50%);
        }
        .favicon {
          position: relative;
          margin: 60px auto;
          width: fit-content;
          font-size: 32px;
          background: linear-gradient(
            -225deg,
            #69eacb 0%,
            #eaccf8 48%,
            #6654f1 100%
          );
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
          letter-spacing: -0.3px;
          text-align: center;
        }
        .favicon::before {
          content: "";
          display: inline-block;
          position: absolute;
          top: 50%;
          left: 50%;
          z-index: -1;
          width: 80px;
          height: 80px;
          background: #fff;
          border-radius: 12px;
          transform: translate(-50%, -50%);
        }
        .secText {
          margin: 150px auto 0;
          width: 80%;
          font-size: 20px;
          line-height: 32px;
          color: #fff;
          text-align: center;
        }
        .secText span {
          font-size: 32px;
          color: #fff;
        }
        .secImgWrapper {
          display: flex;
          justify-content: space-around;
          align-items: center;
          width: 80%;
          margin: 32px auto 0;
        }
        .secImg {
          width: 80px;
          fill: #fff;
        }
        .secImgPoint {
          display: block;
          margin: 32px auto 0;
          width: 100px;
        }
        .arrow {
          width: 0;
          height: 0;
          border-style: solid;
          border-width: 12.5px 0 12.5px 21.7px;
          border-color: transparent transparent transparent #ffffff;
        }
      `}</style>
    </>
  );
};

export default Initialize;
