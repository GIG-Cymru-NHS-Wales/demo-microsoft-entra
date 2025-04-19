import '../assets/TodoForm.css'
import React, { useState } from 'react';
import { Plus } from 'lucide-react';

const AddTodoForm = ({ onAdd }) => {
  const [text, setText] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    if (text.trim()) {
      onAdd(text.trim());
      setText('');
    }
  };

  return (
    <form onSubmit={handleSubmit} className='todo-form'>
      <input
        type="text"
        value={text}
        onChange={(e) => setText(e.target.value)}
        placeholder="Enter a todo..."
        className='todo-input'
      />
      <button type="submit" className='todo-button'><Plus />Add</button>
    </form>
  );
};

export default AddTodoForm;