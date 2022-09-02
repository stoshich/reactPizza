import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import PizzaBlock from '../components/PizzaBlock';
import Skeleton from '../components/PizzaBlock/Skeleton';
import Sort, { list } from '../components/Sort';
import Categories from '../components/Categories';
import Pagination from '../components/Pagination';
import { setCategoryId, setFilter } from '../redux/slices/filterSlices';
import qs from 'qs'
import { useNavigate } from 'react-router-dom';
import { useRef } from 'react';
import { fetchPizzas } from '../redux/slices/pizzaSlice';

function Home() {
    const isMounted = useRef(false)
    const isSearch = useRef(false)
    const navigate = useNavigate()
    const dispatch = useDispatch()
    const { categoryId, sort: sortType, currentPage } = useSelector(state => state.filter)
    const { items, status } = useSelector(state => state.pizza)
    const getPizzas = async () => {
        const category = categoryId > 0 ? `category=${categoryId}&` : '';
        const sortBy = sortType.sortProperty.replace('-', '');
        const order = sortType.sortProperty.startsWith('-') ? 'order=asc' : 'order=desc';
        const search = searchValue ? `&title=${searchValue}` : ''

        dispatch(fetchPizzas({
            category,
            sortBy,
            order,
            search,
            currentPage,
        }))
    }

    const onClickCategory = (id) => {
        dispatch(setCategoryId(id))
    }

    const searchValue = useSelector(state => state.filter.searchValue)

    useEffect(() => {
        if (window.location.search) {
            const params = qs.parse(window.location.search.substring(1))
            const sort = list.find(obj => obj.sortProperty === params.sortProperty)
            dispatch(setFilter({
                ...params,
                sort,
            }))
            isSearch.current = true
        }
    }, [])

    useEffect(() => {
        if (!isSearch.current) {
            getPizzas()
            window.scroll(0, 0)
        }
        isSearch.current = false
    }, [categoryId, sortType, searchValue, currentPage])

    useEffect(() => {
        if (isMounted.current) {
            const queryString = qs.stringify({
                categoryId,
                sortProperty: sortType.sortProperty,
                currentPage,
            })
            navigate(`?${queryString}`)
        }
        isMounted.current = true
    }, [categoryId, sortType, currentPage])

    return (
        <>
            <div className="content__top">
                <Categories value={categoryId} onClickCategory={onClickCategory} />
                <Sort />
            </div>
            <h2 className="content__title">Все пиццы</h2>
            <div className="content__items">
                {status === 'loading' ?
                    [...new Array(6)].map((_, index) =>
                        <Skeleton key={index} />) :
                    items
                        .map((obj) =>
                            <PizzaBlock key={obj.id} {...obj} />)}
            </div>
            <Pagination />
        </>
    )
}

export default Home