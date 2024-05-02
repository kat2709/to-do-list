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
      setEditingTodo();
      setText("");
    }
  }

  function deleteTaskClick(id) {
    setTodos([...todos.filter((i) => i.id !== id)]);
  }

  function deleteAllTasksClick() {
    setTodos([]);
  }

  function doneTaskClick(id) {
    const todo = todos.find((i) => i.id === id);
    todo.done = !todo.done;
    setTodos(todos.slice());
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
    setEditingTodo(id);
  }

  return (
    <>
      <h1 className="app_title">Todo List</h1>
      <div className="list-container">
        <div className="new-item-box">
          <input
            className="new-item-input"
            placeholder="...new task"
            value={text}
            onKeyDown={onKeyDownHandler}
            onChange={(e) => setText(e.target.value || "")}
          ></input>
          <button className="btn-style" onClick={handleSubmit}>
            {editingTodo ? "Update" : "Add Task"}
          </button>
        </div>
        <div className="items-list-box">
          <div className="items-list">
            {todos.length > 0 &&
              todos.map((item, idx) => {
                return (
                  <div key={item.id} className="item-box">
                    <div className={`task ${item.done ? "cross-text" : ""}`}>
                      {idx + 1}. {item.content}
                    </div>
                    <div className="setting-task">
                      <div
                        className={`is-done-task ${
                          item.done ? "add-tick" : ""
                        }`}
                        onClick={() => doneTaskClick(item.id)}
                      ></div>
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
          <button
            className="clear-all-items btn-style"
            onClick={deleteAllTasksClick}
          >
            Clear All
          </button>
        </div>
      </div>
    </>
  );
}
