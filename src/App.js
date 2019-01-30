import React, { Component } from 'react';
import gql from 'graphql-tag';
import { Mutation, ApolloConsumer, Query } from 'react-apollo';

console.log(
  localStorage.getItem('apollo:ac-40-repro-token'),
  !!localStorage.getItem('apollo:ac-40-repro-token'),
);
class App extends Component {

  render() {
    return (
      <ApolloConsumer>
        {client => (
          <div style={{ textAlign: 'center' }}>
            <button onClick={() => client.resetStore()}>Reset Store</button>
            <Query
              query={gql`
                query getUser {
                  user {
                    id
                    name
                  }
                }
              `}
            >
              {({ loading, error, data }) => {
                if (error) {
                  throw new Error(error)
                }
                if (!data.user) {
                  return null;
                }
                if (loading) {}
                return (
                  <div>
                    Hello {data.user.name}!<br />
                    <button
                      onClick={() => {
                        localStorage.removeItem('apollo:ac-40-repro-token');
                        console.log('resetStore started (logout)');
                        client.resetStore().then(() => {
                          console.log('resetStore finished (logout)');
                        });
                      }}
                    >
                      logout
                    </button>
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
                      {({ data }) => (
                        <h1>
                          users count:{data.allUsers && data.allUsers.length}{' '}
                        </h1>
                      )}
                    </Query>
                  </div>
                );
              }}
            </Query>
            <Mutation
              mutation={gql`
                mutation Signin {
                  signinUser(
                    email: {
                      email: "bug@report.apollo"
                      password: "bug@report.apollo"
                    }
                  ) {
                    token
                  }
                }
              `}
              onCompleted={data => {
                localStorage.setItem(
                  'apollo:ac-40-repro-token',
                  data.signinUser.token,
                );

                // Force a reload of all the current queries now that the user is
                // logged in
                console.log('resetStore started (signin)');
                client.resetStore().then(() => {
                  console.log('resetStore finished (signin)');
                });
              }}
              onError={error => {
                console.error(error);
              }}
            >
              {(signIn, { data, error }) => {
                if (error) {
                  throw new Error(error);
                }
                return (
                  <button onClick={signIn}>login</button>
                );
              }}
            </Mutation>
          </div>
        )}
      </ApolloConsumer>
    );
  }
}

export default App;
