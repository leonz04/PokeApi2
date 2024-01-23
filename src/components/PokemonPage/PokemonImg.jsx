import React, { useEffect } from 'react'
import useFetch from '../../hooks/useFetch'
import './styles/PokemonImg.css'

const PokemonImg = (url) => {
    
    const [pokemonMoves, getPokemonMoves] = useFetch(url.url)
    

    useEffect(() => {
        getPokemonMoves()
      }, [url])


  return (
   
    <img className='pokemon__by__move__img' src={`${pokemonMoves?.sprites.other['official-artwork'].front_shiny}`}/>
   
  )
}

export default PokemonImg