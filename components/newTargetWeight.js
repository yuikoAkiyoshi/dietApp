import { useState, useRef } from "react";

const NewTargetWeight = ({ props }) => {
  const [targetWeight, setTargetWeight] = useState();
  const bg = useRef(null);

  const addTargetWeight = (event) => {
    fetch("/targetWeight/post", {
      method: "POST",
      body: JSON.stringify({
        targetWeight: targetWeight,
      }),
      headers: {
        "Content-Type": "application/json; charset=utf-8",
      },
    });
    event.preventDefault();
    props();
    bg.current.style.display = 'block';
  };

  return (
    <>
      <form>
        <input
          className="form__input"
          type="number"
          name="targetWeight"
          onChange={(e) => setTargetWeight(e.target.value)}
          value={targetWeight}
          placeholder="--.--kg"
        />
        <button className="targetWeightBtn" onClick={addTargetWeight}>
          決定
        </button>
      </form>
      <div className="bg" ref={bg}></div>
      <style jsx>{`
        .form__input {
          margin-top: 48px;
          width: 80%;
          background: transparent;
          border-bottom: 2px solid #fff;
          color: #fff;
          border-radius: 2px;
        }
        .targetWeightBtn {
          display: block;
          margin: 32px auto 0;
          width: 40%;
          background: rgba(255, 255, 255, 0.8);
          line-height: 44px;
          border-radius: 32px;
          border-bottom: 4px solid rgba(0, 0, 0, 0.3);
        }
      `}</style>
    </>
  );
};

export default NewTargetWeight;
