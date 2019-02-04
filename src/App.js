import React, { Component } from 'react';
import gql from 'graphql-tag';
import { Query, withApollo } from 'react-apollo';

class App extends Component {
  state = {
    shouldShowQuery: true,
  };

  render() {
    return (
      <div>
        {this.state.shouldShowQuery ? (
          <button
            onClick={() => {
              this.props.client
                .clearStore()
                .then(() => console.log('  clearStore 1: done'))
                .catch(e => {
                  console.error('   clearStore 1: failed', e);
                });
              this.setState({ shouldShowQuery: false });
            }}
            style={{ padding: 40 }}
          >
            reset store and stop query
          </button>
        ) : (
          <button
            onClick={() => {
              this.setState({ shouldShowQuery: true });
            }}
            style={{ padding: 40 }}
          >
            start query
          </button>
        )}
        {this.state.shouldShowQuery && (
          <Query
            query={gql`
              query Query {
                hello
              }
            `}
          >
            {({ data, loading, error }) => (
              <pre>{JSON.stringify({ data, loading, error }, null, '  ')}</pre>
            )}
          </Query>
        )}
      </div>
    );
  }
}

export default withApollo(App);
