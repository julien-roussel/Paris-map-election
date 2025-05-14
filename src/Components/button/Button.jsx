import React from 'react'

const Button = (props) => {
  return (
    <a  id={props.name && 'button-'+props.name} className="container-button"
        href={props.link && props.link} alt={props.description && props.description}>
            <div className='button'>
                <span>{props.name && props.name}</span>
            </div>
    </a>
  )
}

export default Button