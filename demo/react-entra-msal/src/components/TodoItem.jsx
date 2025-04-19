import '../assets/TodoItem.css'
import React from 'react';

const TodoItem = ({ todo, index, onToggle, onDelete }) => {
  const bgColor = index % 2 === 0 ? null : '#3c3c3c';

  return (
    <li className='todo-list' style={{ backgroundColor: bgColor }}>
      <input
        type="checkbox"
        checked={todo.completed}
        onChange={() => onToggle(todo.id)}
        className='todo-checkbox'
      />
      <span className='todo-text'
        style={{ textDecoration: todo.completed ? 'line-through' : 'none', }}
      >
        {todo.text}
      </span>
      <button onClick={() => onDelete(todo.id)} className="todo-delete-btn">❌</button>
    </li>
  );
};

export default TodoItem;