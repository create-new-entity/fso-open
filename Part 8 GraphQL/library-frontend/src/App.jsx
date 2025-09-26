import { useState } from "react";
import Authors from "./components/Authors";
import Books from "./components/Books";
import NewBook from "./components/NewBook";
import { Link, Route, Routes } from "react-router";
import Home from "./components/Home";

const App = () => {
  return (
    <div>
      <div style={{ display: 'flex', justifyContent: 'flex-start', gap: '5px' }}>
        <Link to={'/'}>Home</Link>
        <Link to={'/authors'}>Authors</Link>
        <Link to={'/books'}>Books</Link>
        <Link to={'/add'}>Add book</Link>
      </div>

      <Routes>
        <Route path={'/authors'} element={<Authors show={true} />}/>
        <Route path={'/books'} element={<Books show={true} />}/>
        <Route path={'/add'} element={<NewBook show={true} />}/>
        <Route path={'/'} element={<Home/>}/>
      </Routes>
      
    </div>
  );
};

export default App;
