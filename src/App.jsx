// import { useState } from "react";
import { useState } from "react";
import "./App.css";

export function App() {
  const [todos, setTodos] = useState([]);
  const [text, setText] = useState("");
  const [editingTodo, setEditingTodo] = useState();

  function onKeyDownHandler(e) {
    if (e.keyCode === 13) {
      handleSubmit();
      return;
    }
  }

  function handleSubmit() {
    if (editingTodo) {
      editTask();
      return;
    }
    addTask();
  }

  function editTask() {
    if (text.trim()) {
      const task = todos.find((i) => i.id === editingTodo);
      task.content = text;
      setEditingTodo(); // editingTodo = undefined
      setText("");
    }
  }

  function deleteTaskClick(id) {
    setTodos([...todos.filter((i) => i.id !== id)]);
  }

  function deleteAllTasksClick() {
    setTodos([]);
  }

  function addTask() {
    if (text.trim()) {
      const item = { id: new Date().getTime(), content: text, done: false };
      setTodos([...todos, item]);
      setText("");
    }
  }

  function editTaskClick(id) {
    const task = todos.find((i) => i.id === id);
    setText(task.content);
    setEditingTodo(id); // editingTodo = 1 (ID)
  }

  return (
    <>
      <h1 className="app_title">Todo List</h1>
      <div className="list-container">
        <div className="new-item-box">
          <input
            className="new-item-input"
            placeholder="...new item"
            value={text}
            onKeyDown={onKeyDownHandler}
            onChange={(e) => setText(e.target.value || "")}
          ></input>
          <button className="add-new-item" onClick={handleSubmit}>
            {editingTodo ? "Update" : "Add Item"}
          </button>
        </div>
        <div className="items-list-box">
          <div className="items-list">
            {todos.length > 0 &&
              todos.map((item, idx) => {
                return (
                  <div key={item.id} className="item-box">
                    <div className="task">
                      {idx + 1}. {item.content}
                    </div>
                    <div className="setting-task">
                      <div className="is-done-task"></div>
                      <div
                        className="edit-task"
                        onClick={() => editTaskClick(item.id)}
                      ></div>
                      <div
                        className="delete-task"
                        onClick={() => deleteTaskClick(item.id)}
                      ></div>
                    </div>
                  </div>
                );
              })}
          </div>
          <button className="clear-all-items" onClick={deleteAllTasksClick}>
            Clear All
          </button>
        </div>
      </div>
    </>
  );
}

// function Button({}) {
//   return <div key={item.id} className="item-box">
//   <div className="task">
//     {idx + 1}. {item.content}
//   </div>
//   <div className="setting-task">
//     <div className="is-done-task"></div>
//     <div
//       className="edit-task"
//       onClick={() => editTaskClick(item.id)}
//     ></div>
//     <div className="delete-task"></div>
//     <div></div>
//   </div>
// </div>
// }
