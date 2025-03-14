import { appStore } from './app/store';
import { Provider } from 'react-redux';
import PostList from './components/PostList';

function App() {
  return (
    <Provider store={appStore}>
      <PostList />
    </Provider>
  )
}

export default App
