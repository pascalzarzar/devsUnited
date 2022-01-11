import './App.css';
import { Routes, Route } from 'react-router-dom'
import Home from './Pages/Home/Home';
import Register from './Pages/Register/Register';
import AuthProvider from './Context/AuthContext';
import Login from './Pages/Login/Login';


function App() {
  return(
    <div className='App'>
      <AuthProvider>
        <Routes>
          <Route exact path='/' element={<Home/>}/>
          <Route exact path='/profile' element={<h1>profile</h1>}/>
          <Route exact path='/login' element={<Login/>}/>
          <Route exact path='/register' element={<Register/>}/>
        </Routes>
      </AuthProvider>
    </div>
    
  );
}

export default App;
