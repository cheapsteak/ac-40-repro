import React from 'react';
import ReactDOM from 'react-dom';
import { createHttpLink } from 'apollo-link-http'
import ApolloClient from 'apollo-client';
import { InMemoryCache } from 'apollo-cache-inmemory';
import { ApolloProvider } from 'react-apollo';

import './index.css';
import App from './App';


const httpLink = createHttpLink({
  uri: 'https://countries.trevorblades.com/',
  credentials: 'same-origin'
})

const client = new ApolloClient({
  link: httpLink,
  cache: new InMemoryCache()
})

ReactDOM.render(
  <ApolloProvider client={client}><App /></ApolloProvider>,
  document.getElementById('root')
);