import { useEffect, useState } from "react";
import Authors from "./components/Authors";
import Books from "./components/Books";
import NewBook from "./components/NewBook";
import { Link, Route, Routes, useNavigate } from "react-router";
import Home from "./components/Home";
import LoginForm, { BOOKS_LOGIN_TOKEN_KEY } from "./components/LoginForm";
import { useLazyQuery, useSubscription } from "@apollo/client";
import Recommended from "./components/Recommended";
import { ALL_BOOKS, BOOK_ADDED, GET_LOGGED_IN_USER } from "./queries";


// 8.25 works already after these changes: https://github.com/create-new-entity/fso-open/commit/9982dec2e906b44546e9157502bd231f6232df5f

export const updateCache = (cache, query, addedBook) => {
  const uniqByName = (a) => {
    let seen = new Set()
    return a.filter((item) => {
      let k = item.title
      return seen.has(k) ? false : seen.add(k)
    })
  }

  cache.updateQuery(query, ({ allBooks }) => {
    return {
      allBooks: uniqByName(allBooks.concat(addedBook)),
    }
  })
}

const App = () => {
  const [token, setToken] = useState(null)
  const [getLoggedInuser, loggedInUserResult] = useLazyQuery(GET_LOGGED_IN_USER)
  const navigate = useNavigate()

  useEffect(() => {
    const existingToken = localStorage.getItem(BOOKS_LOGIN_TOKEN_KEY)
    setToken(existingToken)
  }, [])

  useSubscription(BOOK_ADDED, {
    onData: ({ data, client }) => {
      const addedBook = data.data.bookAdded

      window.alert(`New book ${addedBook.title} added.`)

      updateCache(client.cache, { query: ALL_BOOKS, variables: { genre: '' } }, addedBook)
    }
  })

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
