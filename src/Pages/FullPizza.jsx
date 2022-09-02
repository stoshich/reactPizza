import axios from 'axios'
import React, { useEffect } from 'react'
import { useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'

function FullPizza() {
    const { id } = useParams()
    const navigate = useNavigate()
    const [pizza, setPizza] = useState()
    useEffect(() => {
        const fetchPizza = async () => {
            try {
                const { data } = await axios.get('https://62bb5eda7bdbe01d529caaad.mockapi.io/items/' + id)
                setPizza(data)
            } catch (error) {
                alert('Обновите страницу')
                navigate('/')
            }
        }
        fetchPizza()
    }, [])
    if (!pizza) {
        return <div>Загрузка...</div>
    }
    return (
        <div className='container'>
            <h1>{pizza.title}</h1>
            <img src={pizza.imageUrl} alt='/' />
            <h4>{pizza.price} ₽</h4>
        </div>
    )
}

export default FullPizza