const { ApolloClient, InMemoryCache, HttpLink } = require('@apollo/client/core');
const fetch = require('node-fetch');

const client = new ApolloClient({
  link: new HttpLink({
    uri: process.env.GRAPHQL_URI || 'http://localhost:3001/graphql', // Adjust the URI as needed
    fetch,
  }),
  cache: new InMemoryCache(),
});

module.exports = client;
