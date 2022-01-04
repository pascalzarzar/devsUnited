import './App.css';
import { Routes, Route } from 'react-router-dom'
import Home from './Pages/Home/Home';

function App() {
  return (
    <div className='App'>
      <Routes>
          <Route exact path='/' element={<Home/>}/>
          <Route exact path='/profile' element={<h1>profile</h1>}/>
          <Route exact path='/login' element={<h1>login</h1>}/>
          <Route exact path='/register' element={<h1>register</h1>}/>
      </Routes>
    </div>
    
  );
}

export default App;
