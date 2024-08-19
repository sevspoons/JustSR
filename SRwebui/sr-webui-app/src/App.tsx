import { Route,Routes } from 'react-router-dom';
import HomePage from './pages/HomePage';
import ToolPage from './pages/ToolPage';
import './App.scss';

function App() {
  return (
    <Routes>
      <Route path='/' Component={HomePage} />
      <Route path='/tool' Component={ToolPage}/>
    </Routes>
  );
}



export default App;
