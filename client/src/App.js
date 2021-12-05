import './App.css';
import {BrowserRouter, Routes, Route} from 'react-router-dom'
import LandingPage from './components/LandingPage'
import Home from './components/Home'
import CreatePokemon from './components/CreatePokemon'
import Detail from './components/Detail'
import Pokemonlogo from './Pokemon logo.png'

function App() {
  return (

    <BrowserRouter>
    <div className="App">  

    <Routes>

    <Route exact path='/' element = {<LandingPage/>}/>
    <Route path = '/pokemon' element = {<CreatePokemon/>}/>
    <Route path = '/home' element = {<Home/>}/>
    <Route path = '/pokemons/:id' element = {<Detail/>}/>

    </Routes>

    <div className="PokemonLogo">

    <img src={Pokemonlogo} alt="Pokemon Logo"  height="100"/>
    
   

    </div>

    </div>
  </BrowserRouter>
  );
}

export default App;
