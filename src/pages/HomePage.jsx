import React, { useRef, useState } from 'react'
import { setTrainerG } from '../store/states/trainer.state'
import { useDispatch } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import GeneralHeader from '../components/HomePAge/GeneralHeader'
import './styles/HomePage.css'

const HomePage = () => {

  const [msgError,setMsgError]=useState('')
   const [error, setError] = useState(false)
    const inputTrainer =useRef()
    
    const dispatch = useDispatch()

    const navigate =useNavigate()

    const handleSubmit=e=>{
      e.preventDefault()
      if(inputTrainer.current.value.trim().length<3){
        setError(true)
        setMsgError('You have to enter a name with more than three Characters')
      }else{
        dispatch(setTrainerG(inputTrainer.current.value.trim()))
        navigate('/pokedex')
      }
        
    }

  return (
    <div className='login__page'>
      <GeneralHeader/>
        <article className='window__login'>
        <h2 className='greating__trainer'>Hi Trainer</h2>
        <p className='welcome__msg'>To start this app, give me your name. The name must be more three characters</p>
        <form className='login__form' onSubmit={handleSubmit}>
          {
            error?(
              <span className='error__login'>{msgError}</span>

            ):
            (
              ''
            )
          }
            <input className='input__login' ref={inputTrainer}type='text'/>
            <button className='login__btn'>Catch them all</button>
        </form>
        </article>
    </div>
  )
}

export default HomePage