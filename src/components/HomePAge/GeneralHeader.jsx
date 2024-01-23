import './styles/GeneralHeader.css'

const GeneralHeader = () => {
    return (
        <header className="rectangle-red list header-pokemon-info">
            <div className="rectangle-black list"></div>
            <div className="circle list"></div>

            <img className='pokedex__img' src='/logop.png' />
        </header>
    )
}

export default GeneralHeader