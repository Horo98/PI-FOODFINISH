import { BrowserRouter, Route } from 'react-router-dom';
import './App.css';
import Start from './components/start';
import Home from './components/home'
import Details from './components/details';
import CreateRecipe from './components/createRecipe';

function App() {
  return (
    <div className="App">
      <BrowserRouter>
      <Route exact path={'/'} component={Start}></Route>
      <Route exact path={'/home'} component={Home}></Route>
      <Route path={"/home/:id"} component={Details}></Route>
      <Route path={"/recipe"} component={CreateRecipe}></Route>
      </BrowserRouter>
    </div>
  );
}

export default App;
