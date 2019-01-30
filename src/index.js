import React from 'react';
import ReactDOM from 'react-dom';
import { createHttpLink } from 'apollo-link-http'
import { setContext } from 'apollo-link-context'
import ApolloClient from 'apollo-client';
import { InMemoryCache } from 'apollo-cache-inmemory';
import { ApolloProvider } from 'react-apollo';

import './index.css';
import App from './App';


const httpLink = createHttpLink({
  uri: 'https://api.graph.cool/simple/v1/cj5geu3slxl7t0127y8sity9r',
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