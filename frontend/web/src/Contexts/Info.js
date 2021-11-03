import React, { createContext, useEffect, useState } from 'react'
import axios from 'axios'

const BACKEND_URL = 'http://localhost:3001'

const info = createContext()


function Info({ children }) {

    const [fact, setFact] = useState('')
    const [weather, setWeather] = useState({})

    useEffect(() => {
        const getData = async () => {
            const response =  { data: null }
            response.data = await axios(`${BACKEND_URL}/fact`).then(r => r.data)
            setFact(response.data)
            response.data = await axios(`${BACKEND_URL}/weather`).then(r => r.data)
            setWeather(response.data)
            console.log(response.data)
        }

        getData()

        return () => {
            setFact('')
            setWeather({})
        }
    }, [])


    return (
        <info.Provider value={{ BACKEND_URL, fact, weather }}>
            {children}
        </info.Provider>
    )
}

export  { Info, info }
