import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";

function Todos() {
  const [todos, setTodos] = useState([]);
  const [sortedBy, setSortedBy] = useState("random");
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
  const sortedTodos = [...todosOfUser];

  const sortTodos = (event) => {
    setSortedBy(event.target.value);
  };


    switch (sortedBy) {
      case "random":
        sortedTodos.sort(() => Math.random() - 0.5);
        break;
      case "alphabetical":
        sortedTodos.sort((a, b) => a.title.localeCompare(b.title));
        break;
      case "doneOrNot":
        sortedTodos.sort((a, b) => (a.completed ? 1 : -1));
        break;
      case "by id":
        sortedTodos.sort((a, b) => a.id - b.id);
        break;
      default:
        return sortedTodos;
    }
  

  return (
    
    <section className="section">
    <h4>Todos</h4>
    <div>
        Sort by:
        <select value={sortedBy} onChange={sortTodos}>
          <option value="by id">By id</option>
          <option value="alphabetical">Alphabetical</option>
          <option value="random">Random</option>
          <option value="doneOrNot">Completed</option>
        </select>
      </div>
    {sortedTodos.map((todo) => (
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
