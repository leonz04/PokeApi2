import React, { useEffect } from 'react'
import useFetch from '../../hooks/useFetch'
import AreasCard from './AreasCard'
import './styles/CardLocation.css'

const CardLocation = ({url}) => {

    const [infoLocat,getInfoLocat]=useFetch(url)

    useEffect(() => {
      getInfoLocat()
    }, [])
    console.log(infoLocat)

    
    

    

  return (
    
    <div className='card__locations'>

      <table className='table__locations'>
        <tr className='row__titles'>
          <th className='location__column'>Locacion</th>
          <th  className='areas__column'>Areas</th>
          

        </tr>
        <td><h3>{infoLocat?.name}</h3></td>
        <td>{
            
            infoLocat?.areas.map(area=>(
                <AreasCard
                url={area.url}/>
                ))

        }</td>

        
      </table>
        
        
        <ul>
        
        </ul>
    </div>
    
    

  )
}

export default CardLocation