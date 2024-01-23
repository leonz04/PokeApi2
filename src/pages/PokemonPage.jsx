import React, { useEffect, useState } from 'react'
import useFetch from '../hooks/useFetch'
import { useNavigate, useParams } from 'react-router-dom'
import './styles/PokemonPage.css'
import '../components/PokedexPage/styles/PokeCard.css'
import NavigateNextIcon from '@mui/icons-material/NavigateNext';
import NavigateBeforeIcon from '@mui/icons-material/NavigateBefore';
import InfoMoves from '../components/PokemonPage/InfoMoves'
import { useSelector } from 'react-redux'
import NavigationMenu from '../components/PokedexPage/NavigationMenu'
import GeneralHeader from '../components/HomePAge/GeneralHeader'
import '../components/HomePAge/styles/GeneralHeader.css'
import '../components/PokedexPage/styles/NavigationMenu.css'
const PokemonPage = () => {

    let { id } = useParams()

    const [url, setUrl] = useState(`https://pokeapi.co/api/v2/pokemon/${id}`)

    const navigate = useNavigate()



    const [pokemon, getPokemon] = useFetch(url)
    const [selectedMove,setSelectedMove]=useState('bind')
    const [isFormClose , setIsFormClose] = useState(true)


    useEffect(() => {
        getPokemon()
    }, [url])

    const handlePrev = (e) => {
        e.preventDefault()
        if (id <= 1) {
            id = 10229
        } else {
            id--
        }
        setUrl(`https://pokeapi.co/api/v2/pokemon/${id}`)
        navigate(`/pokedex/${id}`)

    }
    const handleNext = (e) => {
        e.preventDefault()
        if (id >= 10229) {
            id = 1
        } else {
            id++
        }
        setUrl(`https://pokeapi.co/api/v2/pokemon/${id}`)
        navigate(`/pokedex/${id}`)

    }

 

    const handleMove=(e)=>{
        e.preventDefault()
        setSelectedMove(e.target.innerText.toLowerCase());
        setIsFormClose(false)
     

    }
    const modeView = useSelector(states => states.modeView)

    console.log(pokemon);
    return (
        <div className={`pokemon__info__container ${modeView ? 'body__light' : 'body__dark'}`}>
            
           
            <GeneralHeader/>
            <NavigationMenu />

            <article className='card__info'>
                <header class={`header__card__info ${pokemon?.types[0].type.name}`}>
                    <button onClick={handlePrev} className="preview__next__pokemonpage__info"><NavigateBeforeIcon fontSize='large' /></button>
                    <img className='pokemon__img' src={pokemon?.sprites.other['official-artwork'].front_default} />
                    
                    <button onClick={handleNext} className="preview__next__pokemonpage__info"><NavigateNextIcon fontSize='large'/></button>
                </header>
                <div className={`body__card__info  ${modeView ? 'body__light' : 'body__dark'}`}>
                    <section class="general__card__info">
                        <h2 className='pokemon__order'>#{pokemon?.id}</h2>
                        <hr className='pokemon__info__hr' />
                        <h3 className='pokemon__card__name'>{pokemon?.name}</h3>
                        <ul className='pokemon_card_hw'>
                            <li className='pokemon__hw__item'>
                                <span className='pokemon__hw__label'>Weight</span>
                                {pokemon?.weight}
                            </li>
                            <li className='pokemon__hw__item'>
                                <span className='pokemon__hw__label'>Height</span>
                                {pokemon?.height}</li>
                        </ul>

                        <ul className='container__types__abilities'>
                            <li className='types__abilities__item'>
                                <span className='pokemon__type__label'>Type</span>
                                <ul className='values__types__abilities'>
                                    {

                                        pokemon?.types.map(typeInfo =>
                                            <li  className={`types__list__item ${typeInfo.type.name}`} key={typeInfo.type.url}>
                                                {typeInfo.type.name}</li>)
                                    }
                                </ul>
                            </li>
                            <li className='types__abilities__item'>

                                <span className='pokemon__abilities__label'>Type</span>
                                <ul className='values__types__abilities'>
                                    {
                                        pokemon?.abilities.map(abilityInfo =>
                                            <li className="types__list__item" key={abilityInfo.ability.url}>
                                                {abilityInfo.ability.name}</li>)
                                    }
                                </ul>
                            </li>
                        </ul>
                    </section>
                    <section className='stats__container'>
                        <hr className='poke__hr' />
                        <h3 className={`{stats__title  ${modeView ? 'body__light' : 'body__dark'}`}>Stats</h3>
                        <ul className='container__stats__info'>
                            {
                                pokemon?.stats.map(statInfo =>
                                    <li className='stats__info' key={statInfo.stat.url}>
                                        <div className='header__stat__info'>
                                        <span className='stat__info__label'>{statInfo.stat.name}</span> <span>{statInfo.base_stat}/255</span> </div>
                                        <progress className={`progress__bar__stats  ${pokemon?.types[0].type.name} `} max='255' value={`${statInfo.base_stat}`}></progress>
                                    </li>)
                            }
                        </ul>
                    </section>
                </div>
                <article className={`container__movements  ${modeView ? 'body__light' : 'body__dark'}`}>
                    <hr className='movements__hr' />
                    <h3 className='movements__title'>Movements</h3>
                    <ul className='movements__names__container'>
                        {
                            pokemon?.moves.map(movesInfo =>
                                <li  onClick={handleMove} className='movement__name' key={movesInfo.move.url}>
                                    {movesInfo.move.name}</li>)
                        }
                    </ul>

                </article>
            </article>
            <InfoMoves 
            isFormClose={isFormClose}
             setIsFormClose={setIsFormClose}
              selectedMove={selectedMove}
               setSelectedMove={setSelectedMove}/>
        </div>
    )
}

export default PokemonPage