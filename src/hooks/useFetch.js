import React, { useState } from 'react'
import axios from 'axios'

const useFetch = url => {
  
    const [response, setResponse] = useState()

    const getApi=()=>{
        axios.get(url)
            .then(res=>setResponse(res.data))
            .catch(err=>console.log(err));
    }

    const getTypePokemon=(urlType)=>{
        axios.get(urlType)
        .then(res=>{
            const obj={
                results:res.data.pokemon.map(pokeInfo=>pokeInfo.pokemon)
            }
            setResponse(obj)

        })
        .catch(err=>console.log(err));

    }

    return [response,getApi, getTypePokemon]
}

export default useFetch