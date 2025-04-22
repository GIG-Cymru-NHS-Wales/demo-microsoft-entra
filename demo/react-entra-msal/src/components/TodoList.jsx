import React, { useCallback, useState, useEffect } from 'react';
import { useMsal } from '@azure/msal-react';
import TodoItem from './TodoItem';
import AddTodoForm from './AddTodoForm';
import { apiCall } from '../services/todoService'; // adjust path as needed

const TodoList = () => {
  const [todos, setTodos] = useState([]);
  const { instance, accounts } = useMsal();
  const account = accounts[0];

  const usingApi = import.meta.env.VITE_APP_USING_API === "true";
  const apiUrl = import.meta.env.VITE_APP_TODO_API_URI;
  const apiScope = `${import.meta.env.VITE_APP_API_IDENTIFIER}/.default`;

  // Fetch todos on page load - this will persist todos after a page refresh
  useEffect(() => {
    const fetchTodos = async () => {
      if (usingApi && account) {
        try {
          const data = await apiCall({
            method: 'GET',
            url: `${apiUrl}/todos`,
            instance,
            account,
            scope: apiScope
          });
          if (data) setTodos(data);
        } catch (err) {
          console.error('Failed to fetch todos:', err);
        }
      }
    };
    fetchTodos();
  }, [usingApi, instance, account, apiUrl, apiScope]);

  const addTodo = async (text) => {
    const newTodo = { id: Date.now(), text, completed: false };

    if (usingApi) {
      const apiTodo = await apiCall({
        method: 'POST',
        url: `${apiUrl}/todos`,
        body: { text },
        instance,
        account,
        scope: apiScope
      });

      if (apiTodo) {
        newTodo.id = apiTodo.id;
        setTodos((prev) => [...prev, newTodo]);
      }
    } else {
      setTodos((prev) => [...prev, newTodo]);
    }
  };

  const toggleTodo = async (id) => {
    if (usingApi) {
      await apiCall({
        method: 'PUT',
        url: `${apiUrl}/todos/${id}/complete`,
        instance,
        account,
        scope: apiScope
      });
    }
    setTodos(todos.map(todo =>
      todo.id === id ? { ...todo, completed: !todo.completed } : todo
    ));
  };

  const deleteTodo = async (id) => {
    setTodos((prev) => prev.filter((todo) => todo.id !== id));

    if (usingApi) {
      await apiCall({
        method: 'DELETE',
        url: `${apiUrl}/todos/${id}`,
        instance,
        account,
        scope: apiScope
      });
    }
  };

  return (
    <div>
      <AddTodoForm onAdd={addTodo} />
      <ul style={{ margin: "0", padding: "0" }}>
        {todos.map((todo, index) => (
          <TodoItem
            key={todo.id}
            todo={todo}
            index={index}
            onToggle={() => toggleTodo(todo.id)}
            onDelete={() => deleteTodo(todo.id)}
          />
        ))}
      </ul>
    </div>
  );
};

export default TodoList;