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
                input, select, submit}) => {
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
                    type={input.type && input.type}
                    min={input.min && input.min}
                    max={input.max && input.max}
                    change={input.change}
                    isRequired={input.isRequired}
                />
            ))}
            {select && select.map((select, index) => {
                const data = select?.data;
                
                return (
                    <div className={stylesCard.formInput}>
                        <label for={select.id} >Adresse</label>
                        <select 
                            className={stylesCard["select-form"]}
                            key={index} 
                            id={select.id}
                            onChange={select.change}
                            isRequired={select.isRequired}
                        >
                            <option value="">{select.placeholder && select.placeholder}</option>
                            {Array.isArray(data) && data.map((data, index) => ( 
                                <option key={index} value={data.nom && data.nom}>{data.nom && data.nom}</option>
                            ))}
                        </select>
                    </div>
                )})}
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