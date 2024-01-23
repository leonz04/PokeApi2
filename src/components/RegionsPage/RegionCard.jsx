import React, { useEffect } from 'react'

import useFetch from '../../hooks/useFetch'


import './styles/RegionCard.css'

import PokemonImg from '../PokemonPage/PokemonImg'

const RegionCard = ({name,url}) => {

    const [region, getRegion]=useFetch(url)

    useEffect(() => {
      getRegion()
    }, [])
    
    console.log(region);

    const [pokedex, getPokedex]=useFetch(region?.pokedexes[0].url)

    useEffect(() => {
        getPokedex()
      }, [])

      console.log('pokedexes')
      console.log(pokedex)




  return (


    <div className='container__info__region'>
    <div>{name}</div>
    <ul>
    {
        region?.locations.map(location=>
            <li>{location.name}</li>)
    }
    {
        pokedex?.pokemon_entries.map(poke=>
            <li>
                <PokemonImg url={poke.pokemon_species.url}/>
                
            </li>)

    }
    </ul>
    </div>
  )
}

export default RegionCard