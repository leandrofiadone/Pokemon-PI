import './App.css';
import {BrowserRouter, Routes, Route} from 'react-router-dom'
import LandingPage from './components/LandingPage'
import Home from './components/Home'

function App() {
  return (

    <BrowserRouter>
    <div className="App">  

    <Routes>

    <Route exact path='/' element = {<LandingPage/>}/>
    <Route path = '/home' element = {<Home/>}/>

    </Routes>

    <h1>Pokemons</h1>
    </div>
  </BrowserRouter>
  );
}

export default App;
