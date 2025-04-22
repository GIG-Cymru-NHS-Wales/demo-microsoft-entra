import './App.css'
import { useIsAuthenticated } from '@azure/msal-react'
import Header from './components/Header';
import TodoList from './components/TodoList';

const App = () => {
  const isAuthenticated = useIsAuthenticated();

  return (
    <>
        <Header />
        <div className="main">
          <section>
            {!isAuthenticated ? (
              <div  className="container">
                <h3>Please Login to continue</h3>
              </div>
            ) : (
              <>
                <TodoList />
              </>
            )}
          </section>
      </div>
    </>
  )
}

export default App;
