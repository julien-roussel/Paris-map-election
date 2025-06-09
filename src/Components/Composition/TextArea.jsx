import React from 'react'

// CSS
import stylesCard from './card.module.scss';

const TextArea = ({id, name, change, placeholder, isRequired, rows, cols}) => {
  return (
    <div id={stylesCard["textArea-" + id]} className={stylesCard.formTextArea}>
        <label htmlFor={id && id} className='p-2'>{name && name}: </label>
        <textarea
            id={id && id}
            name={id && id}
            placeholder={placeholder && placeholder}
            onChange={change && change}
            required={isRequired ? true : false}
            cols={cols && cols}
            rows={rows && rows}
        />
    </div>
  )
}

export default TextArea