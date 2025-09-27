import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter as Router } from 'react-router'
import {
  ApolloClient,
  ApolloProvider,
  InMemoryCache,
  createHttpLink
} from '@apollo/client'

import { setContext } from '@apollo/client/link/context'

import App from "./App.jsx"
import { BOOKS_LOGIN_TOKEN_KEY } from "./components/LoginForm.jsx";

const authLink = setContext((_, { headers }) => {
  const token = localStorage.getItem(BOOKS_LOGIN_TOKEN_KEY)
  return {
    headers: {
      ...headers,
      authorization: token ? `Bearer ${token}` : null,
    }
  }
})

const httpLink = createHttpLink({
  uri: 'http://localhost:4000',
})

const client = new ApolloClient({
  cache: new InMemoryCache(),
  link: authLink.concat(httpLink)
})

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <ApolloProvider client={client}>
      <Router>
        <App />
      </Router>
    </ApolloProvider>
  </React.StrictMode>
);
