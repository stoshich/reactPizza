import debounce from 'lodash.debounce'
import React, { useRef } from 'react'
import { useCallback } from 'react'
import { useState } from 'react'
import { useDispatch } from 'react-redux'
import { setSearchValue } from '../../redux/slices/filterSlices'
import styles from './Search.module.scss'

function Search() {
    const [input, setSearchInput] = useState('')
    const dispatch = useDispatch()
    const inputRef = useRef()

    const onClickClear = () => {
        dispatch(setSearchValue(''))
        inputRef.current.focus()
    }

    const searchUpdate = useCallback(
        debounce((str) => {
            dispatch(setSearchValue(str));
        }, 300), [])

    const onChangeValue = (event) => {
        setSearchInput(event.target.value)
        searchUpdate(event.target.value)
    }
    return (
        <div className={styles.root}>
            <input
                ref={inputRef}
                value={input}
                onChange={onChangeValue}
                className={styles.input}
                placeholder='Поиск пиццы' />
            {input && <svg
                className={styles.iconClose}
                onClick={onClickClear}

                fill="#000000" xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 50 50"
                width="50px"
                height="50px"><path
                    d="M 7.71875 6.28125 L 6.28125 7.71875 L 23.5625 25 L 6.28125 42.28125 L 7.71875 43.71875 L 25 26.4375 L 42.28125 43.71875 L 43.71875 42.28125 L 26.4375 25 L 43.71875 7.71875 L 42.28125 6.28125 L 25 23.5625 Z" />
            </svg>}
        </div>
    )
}

export default Search