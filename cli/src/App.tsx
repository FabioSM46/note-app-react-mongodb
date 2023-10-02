import { Routes, Route } from 'react-router-dom'
import { Home } from './pages/Home'
import { Register } from './pages/Register'
import { Login } from './pages/Login'
import { NavBar } from './components/NavBar'
import { Notes } from './pages/Notes'

function App() {
  return (
    <div className='App'>
      <NavBar />
      <main className='mx-5'>
        <Routes>
          <Route path='/' element={<Home />} />
          <Route path='/notes' element={<Notes />} />
          <Route path='/register' element={<Register />} />
          <Route path='/login' element={<Login />} />
        </Routes>
      </main>
    </div>
  )
}

export default App
