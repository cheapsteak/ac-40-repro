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
        {this.state.shouldShowQuery && (
          <Query
            query={gql`
              query NetworkQuery {
                allUsers {
                  id
                  name
                }
              }
            `}
          >
            {() => (
              <button
                onClick={() => {
                  console.log('resetStore 1: start');
                  this.props.client
                    .resetStore()
                    .then(() => console.log('resetStore 1: done'))
                    .catch(e => {
                      console.error('resetStore 1: failed', e);
                    });
                  console.log('calling setState');
                  // this removes the Query from render and triggers its fetch to be cancelled
                  this.setState({ shouldShowQuery: false }, () => {
                    console.log('setState callback');
                  });
                }}
              >
                RESET
              </button>
            )}
          </Query>
        )}
      </div>
    );
  }
}

export default withApollo(App);
