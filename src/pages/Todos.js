import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";

function Todos() {
  const [todos, setTodos] = useState([]);
  const navigate = useNavigate();
 
  useEffect(() => {
    fetch("https://jsonplaceholder.typicode.com/todos")
      .then((response) => response.json())
      .then((data) => setTodos(data))
      .catch((error) => {
        console.error("Error fetching todos:", error);
        navigate("/error");
      });
  }, []);
  
  const todosOfUser = todos.filter((todo) => todo.userId === JSON.parse(localStorage.getItem("currentUser")).id);

  const handleChangeTodo = (todoId) => {
    const updatedTodos = todosOfUser.map((todo) => {
      if (todo.id === todoId) {
        return { ...todo, completed: !todo.completed };
      } else {
        return todo;
      }
    });
    setTodos(updatedTodos);
    localStorage.setItem("todos", JSON.stringify(updatedTodos));
  };

  return (
    
    <section className="section">
    <h4>Todos</h4>
    {todosOfUser.map((todo) => (
      <div key={todo.id}>
        <input
          type="checkbox"
          checked={todo.completed}
          onChange={() => handleChangeTodo(todo.id)}
        />
        <label>{todo.title}</label>
      </div>
    ))}
  </section>
  );
}

export default Todos;
