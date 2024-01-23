import { useEffect, useState } from 'react'
import useFetch from '../../hooks/useFetch'
import './styles/InfoMoves.css'
import PokemonImg from './PokemonImg'


const InfoMoves = ({selectedMove,setSelectedMove,isFormClose,setIsFormClose}) => {


   const url=(`https://pokeapi.co/api/v2/move/${selectedMove}`)

    

    const [move,getMove]=useFetch(url)


    useEffect(() => {
      getMove()
    }, [selectedMove])



    const closeModal=()=>{
      setIsFormClose(true)

    }
    

  return (
    <div className={`window__info__move ${isFormClose && 'form__close'}`}>
        <span onClick={closeModal}>X</span>
        <h1>{move?.name}</h1>
        <p>#{move?.id}</p>
        <p>{move?.type.name||[]}</p>        
         
        <ul>
            <li><span>Accuracy: </span><span>{move?.accuracy}</span></li>
            <li><span>Power: </span>{move?.power}<span></span></li>
            <li><span>Pp: </span><span>{move?.pp}</span></li>
        </ul>
        <ul className='pokemons__img__container'>
            {
              move?.learned_by_pokemon.map(poke=>
                
                
                <li key={poke.url}>
                <PokemonImg url={poke.url.slice(0,poke.url.length-1)}/>
                </li>)
            }
        </ul>

        
    </div>
  )
}

export default InfoMoves