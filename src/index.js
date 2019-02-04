import React from 'react';
import ReactDOM from 'react-dom';
import { createHttpLink } from 'apollo-link-http'
import { DedupLink as Deduplicator } from 'apollo-link-dedup';
import ApolloClient from 'apollo-client';
import { InMemoryCache } from 'apollo-cache-inmemory';
import { ApolloProvider } from 'react-apollo';

import './index.css';
import App from './App';

const httpLink = createHttpLink({
  uri: 'https://qxz96qoj14.sse.codesandbox.io/',
  credentials: 'same-origin'
})

const client = new ApolloClient({
  link: (new Deduplicator()).concat(httpLink),
  // link: slowNetworkLink.concat(httpLink),
  cache: new InMemoryCache(),
});

ReactDOM.render(
  <ApolloProvider client={client}>
    <App />
  </ApolloProvider>,
  document.getElementById('root'),
);
