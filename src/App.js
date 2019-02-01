import React, { Component } from 'react';
import gql from 'graphql-tag';
import { Query, withApollo } from 'react-apollo';

class App extends Component {
  state = {
    shouldShowQuery: true,
  };
  componentDidMount() {
    console.log('%c resetStore 1: start', 'background: #ffa;');
    this.props.client.resetStore()
      .then(() => console.log('resetStore 1: done'))
      .catch(e => {
        console.error('%c resetStore 1: failed', 'background: #ffa;', e);
      });

    setTimeout(() => {
      console.log('calling setState');
      // this removes the Query from render and triggers its fetch to be cancelled
      this.setState({ shouldShowQuery: false }, () => {
        console.log('setState callback');
        console.log('%c resetStore 2: start', 'background: #faf;');
        setTimeout(() => this.props.client
          .resetStore()
          .then(() => console.log('%c resetStore 2: done', 'background: #faf;'))
          .catch(e => console.error('%c resetStore 2: failed', 'background: #faf;', e))
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
              query Query {
                countries {
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
