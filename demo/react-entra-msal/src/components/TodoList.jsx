import React, { useCallback, useState } from 'react';
import { useMsal } from '@azure/msal-react';
import TodoItem from './TodoItem';
import AddTodoForm from './AddTodoForm';
import { InteractionRequiredAuthError } from '@azure/msal-browser';

const TodoList = () => {
  const [todos, setTodos] = useState([]);
  const { instance, accounts } = useMsal();
  const account = accounts[0];

  const usingApi = import.meta.env.VITE_APP_USING_API === "true";

  const getAccessToken = useCallback(async () => {
    try {
      const response = await instance.acquireTokenSilent({
        scopes: [`${import.meta.env.VITE_APP_API_IDENTIFIER}/.default`],
        account,
      });

      return response.accessToken;
    } catch (error) {
      if (error instanceof InteractionRequiredAuthError) {
        const response = await instance.acquireTokenPopup({
          scopes: [`${import.meta.env.VITE_APP_API_IDENTIFIER}/.default`],
        })
        return response.accessToken;
      } else {
        console.error("Token acquisition failed:", error);
        throw error;
      }
    }
  }, [instance, account]);

  const apiCall = useCallback(
    async (UrlString, method, body = null) => {
      const accessToken = await getAccessToken();
      const headers = {
        "Content-Type": "application/json",
        Authorization: `Bearer ${accessToken}`,
      };

      const res = await fetch(UrlString, { method, headers, body: body && JSON.stringify(body) });
      return res.ok ? await res.json() : null;
    },
    [getAccessToken]
  );

  const addTodo = async (text) => {
    const newTodo = { id: Date.now(), text, completed: false };

    if (usingApi) {
      try {
        const apiTodo = await apiCall("http://localhost:4000/api/todos", "POST", { text });
        if (apiTodo) {
          newTodo.id = apiTodo.id;
          setTodos((prevTodos) => [...prevTodos, newTodo]);
        } else {
          console.error("Error adding todo");
        }
      } catch (error) {
        console.error("Error in API call:", error);
      }
    } else {
      setTodos((prevTodos) => [...prevTodos, newTodo]);
    }
  };

  const toggleTodo = async(id) => {
    if (usingApi) {
      await apiCall(`http://localhost:4000/api/todos/${id}/complete`, "PUT");
    }
    setTodos(
      todos.map(todo =>
        todo.id === id ? { ...todo, completed: !todo.completed } : todo
      )
    );
  };

  const deleteTodo = async(id) => {
    setTodos((prevTodos) => prevTodos.filter((todo) => todo.id !== id));

    if (usingApi) {
      await apiCall(`http://localhost:4000/api/todos/${id}`, "DELETE");
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