import './App.css';
import { Routes, Route } from 'react-router-dom'
import Home from './Pages/Home/Home';
import AuthProvider from './Context/AuthContext';
import Login from './Pages/Login/Login';
import Welcome from './Pages/Welcome/Welcome';
import Profile from './Pages/Profile/Profile';


function App() {
  return(
    <div className='App'>
      <AuthProvider>
        <Routes>
          <Route exact path='/profile' element={<Profile/>}/>
          <Route exact path='/' element={<Login/>}/>
          <Route exact path='/welcome' element={<Welcome/>}/>
          <Route exact path='/Home' element={<Home/>}/>
        </Routes>
      </AuthProvider>
    </div>
    
  );
}

export default App;
