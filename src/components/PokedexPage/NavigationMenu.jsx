import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import { setModeViewG } from '../../store/states/modeView.state'
import './styles/NavigationMenu.css'
import HomeIcon from '@mui/icons-material/Home';

const NavigationMenu = () => {

    const navigate = useNavigate()


    const handleLocations=()=>{
        navigate('/pokedex/Locations')


    }
    const handleRegions=()=>{
        navigate('/pokedex/Regions')


    }
    const handlePokedex=()=>{
        navigate('/pokedex')


    }
    const modeView = useSelector(states => states.modeView)

    const dispatch=useDispatch()

    const handleMode=(e)=>{
        dispatch(setModeViewG(!modeView));
    }

    


  return (
    <nav className='nav__bar'>
        <a className='go-to-list-pokemon' href=''><HomeIcon fontSize='large' /></a>
        <ul className='nav__menu'>
            <li className='nav__menu__item' onClick={handlePokedex}>
                Pokemons
            </li>
            {/*<li className='nav__menu__item' onClick={handleRegions}>
                Regions
            </li>*/}
            <li className='nav__menu__item' onClick={handleLocations}>
                Locations
            </li>
        </ul>
        <button className='mode__view__btn' onClick={handleMode}>Mode View</button>
    </nav>
  )
}

export default NavigationMenu