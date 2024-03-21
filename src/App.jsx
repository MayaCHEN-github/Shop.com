import { useState,useEffect } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
 

function App() {
  const [count, setCount] = useState(0)

  /* Note: This is test code for MongoDB database.  */
  const [admins, setAdmins] = useState([]);
  const [products, setProducts] = useState([]);
  const [users, setUsers] = useState([]);

  useEffect(() => {
    fetch('/admins')
      .then(response => response.json())
      .then(data => setAdmins(data));
    fetch('/products')
      .then(response => response.json())
      .then(data => setProducts(data));
    fetch('/users')
      .then(response => response.json())
      .then(data => setUsers(data));
  }, []);

  /* ****************************** */

  return (
    <>
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
      
      <h2>Admins</h2>
        <ul>
          {admins.map((admin, index) => (
            <li key={index}>{admin.name}: {admin.description}</li>
          ))}
        </ul>
        <h2>Products</h2>
        <ul>
          {products.map((product, index) => (
            <li key={index}>{product.name}: {product.description}</li>
          ))}
        </ul>
        <h2>Users</h2>
        <ul>
          {users.map((user, index) => (
            <li key={index}>{user.name}: {user.description}</li>
          ))}
        </ul>
        
    </>
  )
}

export default App
