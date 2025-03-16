import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import Show from './components/Show';
import Input from './components/Input';
import { AppContextProvider } from './AppContext';

const routes = createBrowserRouter([
  { path: '', element: <Show /> },
  { path: '/input', element: <Input /> }
])

function App() {
  return (
    <AppContextProvider>
      <RouterProvider router={routes} />
    </AppContextProvider>
  )
}

export default App
