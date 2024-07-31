import {
  ApolloClient,
  InMemoryCache,
  ApolloProvider,
  createHttpLink,
} from '@apollo/client';
import { setContext } from '@apollo/client/link/context';
import { Outlet, useLocation } from 'react-router-dom';
import Header from './components/Header/Header';
import Footer from './components/Footer/Footer'; // Import Footer

const httpLink = createHttpLink({
  uri: '/graphql',
});

const authLink = setContext((_, { headers }) => {
  const token = localStorage.getItem('id_token');
  return {
    headers: {
      ...headers,
      authorization: token ? `Bearer ${token}` : '',
    },
  };
});

const client = new ApolloClient({
  link: authLink.concat(httpLink),
  cache: new InMemoryCache(),
});

function App() {
  const location = useLocation();
  const hideHeaderAndFooter = location.pathname === '/login';

  return (
    <ApolloProvider client={client}>
      <div className="flex-column justify-flex-start min-100-vh">
        {!hideHeaderAndFooter && <Header />}
        <div>
          <Outlet /> {/* Outlet will render the child routes */}
        </div>
        {!hideHeaderAndFooter} {/* Conditionally render Footer */}
      </div>
    </ApolloProvider>
  );
}

export default App;
