import Container from 'react-bootstrap/Container'
import TodoInput from './components/TodoInput'
import TodoList from './components/TodoList'
import { Provider } from 'react-redux'
import appStore from './app/store'

function App() {

  return (
    <Provider store={appStore}>
      <Container className='p-4'>
        <TodoInput />
        <TodoList />
      </Container>
    </Provider>
  )
}

export default App
