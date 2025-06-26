import React from 'react'

import './button.scss'

const Button = (props) => {
  return (
    <a  id={props.name && 'button-'+props.name} className="container-button" target={props.target && '_blank'}
        href={props.link && props.link} alt={props.description && props.description}>
            <div className='button'>
                <span>{props.name && props.name}</span>
            </div>
    </a>
  )
}

export default Button