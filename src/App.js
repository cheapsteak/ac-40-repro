import React, { Component } from 'react';
import gql from 'graphql-tag';
import { Query, withApollo } from 'react-apollo';

class App extends Component {
  state = {
    shouldShowQuery: true,
  };
  componentDidMount() {
    console.log('resetStore 1: start');
    this.props.client.resetStore()
      .then(() => console.log('resetStore 1: done'))
      .catch(e => {
        console.error('resetStore 1: failed', e);
      });

    setTimeout(() => {
      console.log('calling setState');
      // this removes the Query from render and triggers its fetch to be cancelled
      this.setState({ shouldShowQuery: false }, () => {
        console.log('setState callback');
        console.log('resetStore 2: start');
        setTimeout(() => this.props.client
          .resetStore()
          .then(() => console.log('resetStore 2: done'))
          .catch(e => console.error('resetStore 2: failed', e))
          , 1000
        );
      });
    });
  }

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
            {({ data, loading, error }) =>
              JSON.stringify({ data, loading, error })
            }
          </Query>
        )}
      </div>
    );
  }
}

export default withApollo(App);
