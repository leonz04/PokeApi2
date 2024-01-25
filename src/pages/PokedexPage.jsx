import { useDispatch, useSelector } from "react-redux"
import useFetch from "../hooks/useFetch"
import { useEffect, useRef, useState } from "react"
import PokeCard from "../components/PokedexPage/PokeCard"
import SelectType from "../components/PokedexPage/SelectType"
import './styles/PokedexPage.css'
import Pagination from '@mui/material/Pagination';
import GeneralHeader from '../components/HomePAge/GeneralHeader'
import NavigationMenu from "../components/PokedexPage/NavigationMenu"
import { PaginationItem } from "@mui/material"



const PokedexPage = () => {

    const [page, setPage] = useState(1);
    const [limitPerPage, setLimitPerPage] = useState(10)
    const [error, setError] = useState(false)
    const [msgError, setMsgError] = useState('')

    const [inputValue, setInputValue] = useState('')
    const [typeSelected, setTypeSelected] = useState('allPokemons')

    const trainerName = useSelector(states => states.trainer)
    const modeView = useSelector(states => states.modeView)


    const url = 'https://pokeapi.co/api/v2/pokemon?limit=100000&offset=0'

    const [pokemons, getpokemons, getTypePokemon] = useFetch(url)
    
    const inputPerPage = useRef()



    useEffect(() => {
        if (typeSelected == 'allPokemons') {
            getpokemons()
        } else {
            getTypePokemon(typeSelected)

        }
    }, [typeSelected])

    const inputName = useRef()


    let cbFilter = (pokeInfo) => pokeInfo.name.toLowerCase().includes(inputValue)


    let pokeResults = pokemons?.results




    const handleChange = (event, value) => {
        event.preventDefault()
        setPage(value)

    }
    
    useEffect(() => {
        setTotalPokemons(pokemons?.results.filter(cbFilter).length);
      }, [page, handleChange])
    

    let startIndex = (page - 1) * limitPerPage;
    let endIndex = startIndex + limitPerPage;
    pokeResults = pokemons?.results.filter(cbFilter).slice(startIndex, endIndex) || [];

    let totalResults = pokemons?.results.length

    console.log(totalResults)

    const [totalPokemons, setTotalPokemons] = useState(totalResults)

    const handlePagination = (event) => {
        event.preventDefault();
        let inputValue = inputPerPage.current.value;
        if (!isNaN(inputValue) && inputValue > 0) {
            setLimitPerPage(parseInt(inputValue));
            setPage(1)

        }
    }

    const handleSearch = e => {
        console.log('object');
       
        console.log(pokeResults.length);
        
        cbFilter = (pokeInfo) => pokeInfo.name.toLowerCase().includes(inputName.current.value.trim().toLowerCase())
        pokeResults = (pokemons?.results.filter(cbFilter))

       console.log('pokeResults.length');
       console.log(pokeResults.length);

        e.preventDefault()
        if (inputName.current.value.length < 1) {
            setError(true);
            setMsgError('ingrese al menos una letra')



        } else if (pokeResults.length == 0) {
            setError(true);
            setMsgError('ingrese nombre valido')
            setInputValue('')
        } else {

            setInputValue(inputName.current.value.trim().toLowerCase())
            setError(false)

        }
        setPage(1)
        inputName.current.value = ''
        totalResults = pokeResults.length
        console.log('object');
        console.log(totalPokemons);
    }

    console.log(`total results${totalResults}`)
    console.log(`limitPerPage${limitPerPage}`)
    console.log(`pokeResults${pokeResults.length}`)
    console.log(`total pokemons${totalPokemons}`);





    return (
        <div className={`pokedex__page ${modeView ? 'body__light' : 'body__dark'}`} >
            <GeneralHeader />
            <NavigationMenu />

            <h2 className="greating__welcome">Welcome <span>{trainerName}</span>, here you can find your favorite pokemon</h2>

            {
                error ? (
                    <span className="msgErrorFilter">{msgError}</span>

                ) : <span></span>
            }
            <div className="filters__bar">

                <form className="form__filters" onSubmit={handleSearch}>



                    <input className="input__name__search" ref={inputName} type="text" />
                    <button className="btn__search">Search</button>


                </form>



                <SelectType setTypeSelected={setTypeSelected} setPage={setPage} className='filter__type' />
                <article>
                    <span className="filter__type__bar__label">Paginación: </span>
                    <select defaultValue='10' className="filter__page__select" ref={inputPerPage} onChange={handlePagination}>
                        <option className="pagination__option" value='2'>2</option>
                        <option className="pagination__option" value='4'>4</option>
                        <option className="pagination__option" value='6'>6</option>
                        <option className="pagination__option" value='8'>8</option>
                        <option className="pagination__option" value='10'>10</option>
                        <option className="pagination__option" value='13'>13</option>
                        <option className="pagination__option" value='17'>17</option>
                        <option className="pagination__option" value='20'>20</option>
                    </select>
                </article>

            </div>



            <div className="pokemons__container">

                {

                    pokeResults.filter(cbFilter).map(pokeInfo => (
                        <PokeCard
                            key={pokeInfo.url}
                            url={pokeInfo.url}
                        />
                    ))
                }

            </div>

            <section className="container__pagination">
                <Pagination
                    count={parseInt(totalPokemons / limitPerPage) || 0}
                    page={page}
                    onChange={handleChange}
                    shape="rounded"
                    variant="text"
                    color="primary"
                    size="large"
                    


                />
            </section>

        </div>
    )
}

export default PokedexPage