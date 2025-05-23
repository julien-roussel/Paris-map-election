import React from 'react'
import { Link } from 'react-router';

// CSS
import stylesCard from './card.module.scss';

// Component
import Input from './Input';

const Card = ({ title, subtitle, 
                linkName, link, 
                msg, msgFinal, 
                buttonForm, button, 
                input, submit}) => {
  return (
    <div className='card'>
        <hr></hr>
        <h1>{title && title}</h1>
        <h3>{subtitle && subtitle}</h3>
        <form className={stylesCard.form} onSubmit={submit}>
            {input && input.map((input, index) => (
                <Input 
                    key={index}
                    name={input.name}
                    id={input.id}
                    placeholder={input.placeholder && input.placeholder}
                    value={input.value && input.value}
                    type={input.id}
                    change={input.change}
                    isRequired={input.isRequired}
                />
            ))}
            <h5>{msgFinal && msgFinal}</h5>
            <p className={msg ? "activate" : "offscren"}>{msg && msg}</p>
            <div className='container-buttons'>
                {buttonForm && (
                    <button className={msg ? "button" : "button dark-button"}>{buttonForm && buttonForm}</button>
                )}
                {button && button.map((button, index) => (
                    <button key={index} className="button dark-button" onClick={button.click}>{button.name}</button>
                ))}
            </div>
        </form>
        <Link to={link && link}>{linkName && linkName}</Link>
    </div>
  )
}

export default Card