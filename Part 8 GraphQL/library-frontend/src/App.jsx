import { useEffect, useState } from "react";
import Authors from "./components/Authors";
import Books from "./components/Books";
import NewBook from "./components/NewBook";
import { Link, Route, Routes, useNavigate } from "react-router";
import Home from "./components/Home";
import LoginForm, { BOOKS_LOGIN_TOKEN_KEY } from "./components/LoginForm";
import { useLazyQuery } from "@apollo/client";
import Recommended from "./components/Recommended";
import { GET_LOGGED_IN_USER } from "./queries";

const App = () => {
  const [token, setToken] = useState(null)
  const [getLoggedInuser, loggedInUserResult] = useLazyQuery(GET_LOGGED_IN_USER)
  const navigate = useNavigate()

  useEffect(() => {
    if(token) {
      getLoggedInuser()
    }
  }, [token, getLoggedInuser])

  const handleLogout = () => {
    setToken(null)
    localStorage.removeItem(BOOKS_LOGIN_TOKEN_KEY)
    navigate('/')
  }

  return (
    <div>
      <div style={{ display: 'flex', justifyContent: 'flex-start', gap: '5px' }}>
        <Link to={'/'}>Home</Link>
        <Link to={'/books'}>Books</Link>
        {
          token &&
          <>
            <Link to={'/authors'}>Authors</Link>
            <Link to={'/add'}>Add book</Link>
            <Link to={'/recommended'}>Recommended</Link>
          </>
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
        <Route path={'/authors'} element={<Authors/>}/>
        <Route path={'/books'} element={<Books/>}/>
        <Route path={'/add'} element={<NewBook/>}/>
        {
          !loggedInUserResult.loading &&
          loggedInUserResult.data?.me.favoriteGenre &&
          <Route path={'/recommended'} element={<Recommended genre={loggedInUserResult.data?.me.favoriteGenre}/>} />
        }
        <Route path={'/login'} element={<LoginForm setToken={setToken}/>}/>
        <Route path={'/'} element={<Home/>}/>
      </Routes>
      
    </div>
  );
};

export default App;
