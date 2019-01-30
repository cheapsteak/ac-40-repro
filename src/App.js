import React, { Component } from 'react';
import gql from 'graphql-tag';
import { Query, withApollo } from 'react-apollo';

class App extends Component {
  state = {
    shouldShowQuery: true,
  };
  componentDidMount() {
    this.props.client.resetStore();
    setTimeout(() => {
      console.log('calling setState');
      // this removes the Query and triggers its fetch to be cancelled
      this.setState({ shouldShowQuery: false }, () => {
        console.log('setState callback');
        this.props.client.resetStore().then('resetStore done'); // this doesn't get called
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
