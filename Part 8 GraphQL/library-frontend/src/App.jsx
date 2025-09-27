import { useState } from "react";
import Authors from "./components/Authors";
import Books from "./components/Books";
import NewBook from "./components/NewBook";
import { Link, Route, Routes, useNavigate } from "react-router";
import Home from "./components/Home";
import LoginForm, { BOOKS_LOGIN_TOKEN_KEY } from "./components/LoginForm";

const App = () => {
  const [token, setToken] = useState(null)
  const navigate = useNavigate()

  const handleLogout = () => {
    setToken(null)
    localStorage.removeItem(BOOKS_LOGIN_TOKEN_KEY)
    navigate('/')
  }

  return (
    <div>
      <div style={{ display: 'flex', justifyContent: 'flex-start', gap: '5px' }}>
        <Link to={'/'}>Home</Link>
        {
          token && <Link to={'/authors'}>Authors</Link>
        }
        <Link to={'/books'}>Books</Link>
        {
          token && <Link to={'/add'}>Add book</Link>
        }
        {
          !token &&
          <Link to={'/login'}>Login</Link>
        }
        {
          token &&
          <button onClick={handleLogout}>Logout</button>
        }
      </div>

      <Routes>
        <Route path={'/authors'} element={<Authors show={true} />}/>
        <Route path={'/books'} element={<Books show={true} />}/>
        <Route path={'/add'} element={<NewBook show={true} />}/>
        <Route path={'/login'} element={<LoginForm setToken={setToken}/>}/>
        <Route path={'/'} element={<Home/>}/>
      </Routes>
      
    </div>
  );
};

export default App;
