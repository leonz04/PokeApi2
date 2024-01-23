import { useEffect, useRef, useState } from "react"
import useFetch from "../../hooks/useFetch"
import './styles/SelectType.css'

const SelectType = ({setTypeSelected,setPage}) => {

    const url= 'https://pokeapi.co/api/v2/type'

    
    const [types,getTypes]=useFetch(url)

    const type =useRef()

    useEffect(()=>{
        getTypes()

    },[])

    const handleCjange=()=>{
        
        setTypeSelected(type.current.value.trim())
        setPage(1)
    }
    
  return (
    <div className="filter__type__bar">
    <span className="filter__type__bar__label">Filtro Por tipo: </span>
    <select defaultValue="allPokemons"className='type__select__bar' ref={type} onChange={handleCjange}>
        <option className="type__select__options" value='allPokemons'>All Pokemons</option>
        {
            types?.results.map(type=>(
                <option className="type__select__options"  key={type.url} value={type.url}>{type.name}</option>

            ) )

        }
    </select>
    </div>
  )
}

export default SelectType