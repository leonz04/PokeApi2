
import './App.css'
import { Routes,Route } from 'react-router-dom';
import HomePage from './pages/HomePage';
import PokedexPage from './pages/PokedexPage';
import PokemonPage from './pages/PokemonPage';
import ProtectedRoutes from './pages/ProtectedRoutes';
import RegionsPage from './pages/RegionsPage';
import LocationsPage from './pages/LocationsPage';

function App() {



  return (
    <div className='poke__app'>
      <Routes>
        <Route path='/' element={<HomePage/>}/>
        <Route element={<ProtectedRoutes/>}>
          <Route path='/pokedex' element={<PokedexPage/>}/>
          <Route path='/pokedex/:id' element={<PokemonPage/>}/>
          <Route path='/pokedex/Regions' element={<RegionsPage/>}/>
          <Route path='/pokedex/Locations' element={<LocationsPage/>}/>


        </Route>
      
      </Routes>
    </div>
  )
}

export default App
