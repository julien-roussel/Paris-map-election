import React from 'react'

// CSS
import stylesCard from './card.module.scss';

const Input = ({id, name, type, change, value, placeholder, isRequired}) => {
  return (
    <div className={stylesCard.formInput}>
        <label htmlFor={id && id} className='p-2'>{name && name}: </label>
        <input
            type={type && type}
            id={id && id}
            name={id && id}
            value={value && value}
            placeholder={placeholder && placeholder}
            onChange={change && change}
            required={isRequired && isRequired}
        />
    </div>
  )
}

export default Input