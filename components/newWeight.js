import { useState, useRef } from "react";
import Router from "next/router";

const NewWeight = () => {
  const [date, setDate] = useState();
  const [weight, setWeight] = useState(0);
  const form = useRef(null);
  const bg = useRef(null);

  const addWeight = () => {
    fetch("/weight/post", {
      method: "POST",
      body: JSON.stringify({
        date: date,
        weight: weight,
      }),
      headers: {
        "Content-Type": "application/json; charset=utf-8",
      },
    });

    form.current.style.transform = "translateY(1000px)";
    bg.current.style.display = "none";

    Router.push({
      pathname: "/weight",
    });
  };

  const handleShow = () => {
    form.current.style.transform = "translateY(0)";
    bg.current.style.display = "block";
  };

  const handleHidden = () => {
    form.current.style.transform = "translateY(1000px)";
    bg.current.style.display = "none";
  };

  return (
    <>
      <div className="add" onClick={handleShow}></div>
      <div className="form" ref={form}>
        <div className="form__controllers">
          <div onClick={handleHidden}>キャンセル</div>
          <div onClick={addWeight}>完了</div>
        </div>
        <form>
          <input
            className="form__input"
            type="date"
            name="date"
            onChange={(e) => setDate(e.target.value)}
            value={date}
          />
          <input
            className="form__input"
            type="number"
            name="weight"
            onChange={(e) => setWeight(e.target.value)}
            value={weight}
          />
        </form>
      </div>
      <div className="bg" ref={bg}></div>
    </>
  );
};

export default NewWeight;
