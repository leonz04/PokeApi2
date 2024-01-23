import React, { useEffect } from 'react'
import NavigationMenu from '../components/PokedexPage/NavigationMenu'
import useFetch from '../hooks/useFetch'
import RegionCard from '../components/RegionsPage/RegionCard'
import './styles/RegionsPage.css'
import GeneralHeader from '../components/HomePAge/GeneralHeader'


const RegionsPage = () => {


  const url='https://pokeapi.co/api/v2/region/'
  const [regions, getRegions]=useFetch(url)

  useEffect(() => {
    getRegions()
  }, [])

  console.log(regions)
  


  return (
    <div className='regions__page'>
      <GeneralHeader/>
      <NavigationMenu/>
      <h2 className="greating__welcome">Welcome, these is are all regions</h2>
      <ul className='container__regions'>
      {
        regions?.results.map(regionInfo=>
          <RegionCard
          key={regionInfo.url}
          name={regionInfo.name}
          url={regionInfo.url}
          />
        )
      }
      </ul>

      </div>
  )
}

export default RegionsPage