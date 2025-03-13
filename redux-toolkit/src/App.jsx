import { Provider } from 'react-redux'
import todoStore from './Store'
import TodoInput from './TodoInput'
import TodoList from './TodoList'

function App() {

  return (
    <Provider store={todoStore}>
      <TodoInput/>
      <TodoList/>
    </Provider>
  )
}

export default App;
