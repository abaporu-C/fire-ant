
import {Link, Outlet} from 'react-router-dom';
import './App.css';

function App() {
  return (
    <div className="App">
      <nav>
        <Link to="/">Login</Link>
      </nav>
      <h1>Hello!</h1>
      <Outlet />
    </div>
  );
}

export default App;
