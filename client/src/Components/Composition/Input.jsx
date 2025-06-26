import React from 'react'

// CSS
import stylesCard from './card.module.scss';

const Input = ({id, name, type, change, value, placeholder, isRequired, rows, cols}) => {
  
  return (
    <div id={stylesCard["input-" + id]} className={stylesCard.formInput}>
        <label htmlFor={id && id} className='p-2'>{name && name}: </label>
        <input
            type={type && type}
            id={id && id}
            name={id && id}
            value={value && value}
            placeholder={placeholder && placeholder}
            onChange={change && change}
            required={isRequired ? true : false}
        />
    </div>
  )
}

export default Input