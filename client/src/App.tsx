import { HashRouter as Router } from 'react-router-dom';
import Header from './components/Header';
import AuthProvider from './context/AuthProvider';
import AppRoute from './routes';
import './App.css';
import './prism.css';
import DBProvider from './context/DBProvider';
import CMSProvider from './context/CMSProvider';

export default function App() {
  return (
    <AuthProvider>
      <DBProvider>
        <CMSProvider>
          <Router>
            <div className="container">
              <Header />
              <AppRoute />
            </div>
          </Router>
        </CMSProvider>
      </DBProvider>
    </AuthProvider>
  );
}
