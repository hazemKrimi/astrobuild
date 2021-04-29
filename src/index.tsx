import React from 'react';
import ReactDOM from 'react-dom';
import { ApolloClient, InMemoryCache, ApolloProvider } from '@apollo/client';
import { ThemeProvider } from 'styled-components';
import { BrowserRouter } from 'react-router-dom';
import { theme } from './themes';
import App from './App';
import GlobalStyles from './GlobalStyles';
import reportWebVitals from './reportWebVitals';

const client = new ApolloClient({
  uri: process.env.REACT_APP_GRAPHQL_API,
  cache: new InMemoryCache(),
  headers: {
    authorization: localStorage.getItem('token') || '',
  },
});

ReactDOM.render(
  <React.StrictMode>
    <ApolloProvider client={client}>
      <ThemeProvider theme={theme}>
        <BrowserRouter>
          <App />
          <GlobalStyles />
        </BrowserRouter>
      </ThemeProvider>
    </ApolloProvider>
  </React.StrictMode>,
  document.getElementById('root')
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
