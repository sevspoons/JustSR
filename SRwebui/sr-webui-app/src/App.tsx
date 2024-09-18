import { Route,Routes } from 'react-router-dom';
import HomePage from './pages/HomePage';
import ToolPage from './pages/ToolPage';
import Navigator from './component/Navigator';
import BackgroundGalaxy from './component/BackgroundGalaxy';
import navList from './component/NavList';
import './App.scss';
import getTheme from './stores/theme';

function App() {
  return (
    <div>
      <Navigator guidList={navList}/>
      <BackgroundGalaxy />
      <Routes>
        <Route path='/' Component={HomePage} />
        <Route path='/tool' Component={ToolPage}/>
      </Routes>
    </div>
  );
}



export default App;
