import NavigationMenu from "../components/PokedexPage/NavigationMenu"
import CardLocation from "../components/LocationsPage/CardLocation"
import { useEffect } from "react"
import useFetch from "../hooks/useFetch"
import './styles/LocationsPage.css'
import GeneralHeader from "../components/HomePAge/GeneralHeader"
import { useSelector } from "react-redux"

const LocationsPage = () => {

    const url='https://pokeapi.co/api/v2/location/?offset=0&limit=50'
    const [locations,getLocations]=useFetch(url)

    useEffect(() => {
        getLocations()
      
    }, [])
    
    let locationResults= locations?.results
    console.log(locations)
    console.log(locationResults)

    const modeView = useSelector(states => states.modeView)


  return (
    <div className={`locations__page ${modeView ? 'body__light' : 'body__dark'}`}>
      <GeneralHeader/>
        <NavigationMenu/>
      <section className="container__all__locations">
        {

            locationResults?.map(locat=>(
             <CardLocation
             key={locat.url}
             name={locat.name}
             url={locat.url}/>   ))
            

        }
    </section>
        
        
        
    </div>
  )
}

export default LocationsPage