import Login from './components/Login'
import Navbar from './components/Navbar'
import ProfilePage from './components/ProfilePage'
import Signup from './components/Signup'
import {BrowserRouter as Router, Routes,Route} from 'react-router-dom'

const App = () => {
  return (
    <>
    <Navbar/>
    <Router>
    <Routes>
      <Route path='/' element={<Signup/>} />
      <Route path='/login' element={<Login/>} />
      <Route path='/profile' element={<ProfilePage/>} />
  
    </Routes>
    </Router>
    </>
  )
}

export default App
