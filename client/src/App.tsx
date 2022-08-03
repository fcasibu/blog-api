import { ErrorBoundary } from 'react-error-boundary';
import { BrowserRouter as Router } from 'react-router-dom';
import Header from './components/Header';
import AuthProvider from './context/AuthProvider';
import AppRoute from './routes';
import './App.css';
import DBProvider from './context/DBProvider';

function ErrorFallback() {
  return <div>Hello World!</div>;
}

export default function App() {
  return (
    <AuthProvider>
      <DBProvider>
        <Router>
          <div className="container">
            <Header />
            <ErrorBoundary FallbackComponent={ErrorFallback}>
              <AppRoute />
            </ErrorBoundary>
          </div>
        </Router>
      </DBProvider>
    </AuthProvider>
  );
}
