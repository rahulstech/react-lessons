import TodoInput from "./components/TodoInput"
import TodoList from "./components/TodoList"
import { TodoContextProvider } from "./contexts/TodoContext";


function App() {

  // create state and share amount components
  // TodoInput and TodoList
  // but using Context instead of state sharing as property is more preferable
  // const todosState = useState([
  //   { id: 1, title: "goto shopping", status: false},
  //   { id: 2, title: "finish basis of kafka", status: false },
  //   { id: 3, title: "android camera photo capture", status: false }
  // ]);

  return (
    <TodoContextProvider>
      <TodoInput />
      <TodoList />
    </TodoContextProvider>
  )
}

export default App
