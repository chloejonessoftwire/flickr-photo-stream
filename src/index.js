import React, {lazy, Suspense} from 'react';
import ReactDOM from 'react-dom';
import './index.css';
// import App from './App';
const App = lazy(() => import('./App')); // Lazy-loaded


ReactDOM.render(
  <React.StrictMode>
    {/* <App /> */}
    <Suspense fallback={<h1>Loading posts...</h1>}>
      <App />
    </Suspense>
  </React.StrictMode>,
  document.getElementById('root')
);

