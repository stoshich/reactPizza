import React from 'react'

export default function Categories({ value, onClickCategory }) {
    const categories = ['Все', 'Мясные', 'Вегетарианская', 'Гриль', 'Острые', 'Закрытые']
    return (
        <div className="categories">
            <ul>
                {categories.map((category, index) =>
                    <li
                        onClick={() => onClickCategory(index)}
                        className={value === index ? "active" : ''}
                        key={index}>
                        {category}
                    </li>)}
            </ul>
        </div>
    )
}
