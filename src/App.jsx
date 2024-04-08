import { useState,useEffect } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import { BrowserRouter as Router, Route } from 'react-router-dom';
import AdminUserPage from './components/AdminPages/AdminUserPage';
import AdminProductPage from './components/AdminPages/AdminProductPage';


function App() {
  const [count, setCount] = useState(0)

  return (
    <>
      <Router>
        <Route path="/AdminUserPage" component={AdminUserPage} />
        <Route path="/AdminProductPage" component={AdminProductPage} />
      </Router>
      <div>
        <a href="https://vitejs.dev" target="_blank">
          <img src={viteLogo} className="logo" alt="Vite logo" />
        </a>
        <a href="https://react.dev" target="_blank">
          <img src={reactLogo} className="logo react" alt="React logo" />
        </a>
      </div>
      <button className="btn btn-danger">Yeah</button>
      <div className = 'row'>
        <div className = 'col-md-3 bg-primary'>Column 1</div>
        <div className = 'col-md-7 bg-danger'>Column 2</div>
        <div className = 'col-md-2 bg-info'>Column 3</div>
      </div>
      <h1>Vite + React</h1>
      <div className="card">
        <button onClick={() => setCount((count) => count + 1)}>
          count is {count}
        </button>
        <p>
          Edit <code>src/App.jsx</code> and save to test HMR
        </p>
      </div>
      <p className="read-the-docs">
        Click on the Vite and React logos to learn more
      </p>
      
        
    </>
  )
}

export default App
