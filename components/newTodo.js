import { useState, useRef } from "react";
import Router from "next/router";

const NewTodo = () => {
  const [todo, setTodo] = useState("");
  const [point, setPoint] = useState();
  const form = useRef(null);
  const bg = useRef(null);

  const addTodo = (event) => {
    if (todo === "") {
      alert("文字を入力してください");
      return;
    }
    fetch("/newTodo/post", {
      method: "POST",
      body: JSON.stringify({
        todo: todo,
        point: point,
      }),
      headers: {
        "Content-Type": "application/json; charset=utf-8",
      },
    });

    form.current.style.transform = "translateY(1000px)";
    bg.current.style.display = "none";
    
    Router.push({
      pathname: "/index",
    });
    event.preventDefault();
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
          <div onClick={addTodo}>完了</div>
        </div>
        <form>
          <input
            className="form__input"
            type="text"
            name="todo"
            onChange={(e) => setTodo(e.target.value)}
            value={todo}
            placeholder="todo"
          />
          <input
            className="form__input"
            type="number"
            name="point"
            onChange={(e) => setPoint(e.target.value)}
            value={point}
            placeholder="---pt"
          />
        </form>
      </div>
      <div className="bg" ref={bg}></div>
    </>
  );
};

export default NewTodo;
