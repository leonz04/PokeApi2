import { useEffect } from "react"
import useFetch from "../../hooks/useFetch"
import PokemonImg from '../PokemonPage/PokemonImg'
import './styles/AreasCard.css'

const AreasCard = (url) => {
    console.log(url)

    const [infoArea,getInfoArea]=useFetch(url.url)

    useEffect(() => {
      getInfoArea()
    }, [])

    console.log(infoArea)
  return (
    <div>
        <tr className="row__titles">
            <th className="area__id__column">Area Id: {infoArea?.id}</th>
            <th className="pokemons__column">Pokemons </th>
        </tr>
        <tr>
            <td>{infoArea?.name}</td>
            <td className="container__imgs"> 
        {
            infoArea?.pokemon_encounters.map(poke =>
            <PokemonImg
            url={poke.pokemon.url}/>
            )
            
        }
        </td>
        </tr>
        

       


    </div>
  )
}

export default AreasCard