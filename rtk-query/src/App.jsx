import { PostGrid, PostInput } from './features/post/post'
import Container from 'react-bootstrap/Container'
import appStore from './app/store'
import { Provider } from 'react-redux'
import Button from 'react-bootstrap/Button'
import { useState } from 'react'
import { UserChooser } from './features/user/user'

function App() {

  const [showingModal, setShowingModal] = useState(false);
  const [selection, setSelection] = useState();

  function handleSelectionChange(user) {
    setSelection(user);
  }

  return (
    <Provider store={appStore}>
      <Container fluid className='vh-100'>
        <div className='d-flex align-items-center fixed-top px-4 bg-success-subtle '
          style={{ height: '56px', }}>
            <UserChooser onChangeUser={handleSelectionChange} />
        </div>

        <div className='d-flex fixed-bottom pe-4 bg-success-subtle align-items-center justify-content-end'
         style={{ height: '72px', }}>
          <Button onClick={() => setShowingModal(true)} variant='primary' className='rounded-circle'>
            <i className="bi bi-plus fs-2"></i>
          </Button>
        </div>
        
        <PostInput backdrop="static" show={showingModal} keyboard={false} onHide={()=>setShowingModal(false)} />
        <PostGrid user={ selection ? selection.id : null } />
      </Container>
    </Provider>
  )
}

export default App
