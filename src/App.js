import './App.css';
import { Routes, Route, Router } from 'react-router-dom'
import Home from './Pages/Home/Home';
import Register from './Pages/Register/Register';
import AuthProvider from './Context/AuthContext';
import Login from './Pages/Login/Login';
import Welcome from './Pages/Welcome/Welcome';


function App() {
  return(
    <div className='App'>
      <AuthProvider>
        <Routes>
          <Route exact path='/' element={<Home/>}/>
          <Route exact path='/profile' element={<h1>profile</h1>}/>
          <Route exact path='/login' element={<Login/>}/>
          <Route exact path='/register' element={<Register/>}/>
          <Route exact path='/register/welcome' element={<Welcome/>}/>
        </Routes>
      </AuthProvider>
    </div>
    
  );
}

export default App;
