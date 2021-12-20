import './App.css';
import { Routes, Route } from 'react-router-dom'

function App() {
  return (
    <div className='App'>
      <Routes>
          <Route exact path='/' element={<h1>Feed</h1>}/>
          <Route exact path='/profile' element={<h1>profile</h1>}/>
          <Route exact path='/login' element={<h1>login</h1>}/>
          <Route exact path='/register' element={<h1>register</h1>}/>
      </Routes>
    </div>
    
  );
}

export default App;
