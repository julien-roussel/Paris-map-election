import React from 'react'
import { Link } from 'react-router-dom';

// CSS
import stylesCard from './card.module.scss';

// Component
import Input from './Input';
import TextArea from './TextArea';

const Card = ({ title, subtitle, 
                linkName, link, 
                msg, msgFinal, 
                buttonForm, button, 
                input, textArea, select, 
                submit}) => {

  return (
    <div className='card'>
        <hr></hr>
        <h1>{title && title}</h1>
        <h3>{subtitle && subtitle}</h3>
        <form className={stylesCard.form} onSubmit={submit}>
            {Array.isArray(input) && input.map((input, index) => (
                <Input 
                    key={index}
                    name={input.name}
                    id={input.id}
                    placeholder={input.placeholder && input.placeholder}
                    value={input.value && input.value}
                    type={input.type && input.type}
                    change={input.change}
                    isRequired={input.isRequired}
                />
            ))}
            {Array.isArray(select) && select.map((select, index) => {
                const data = select?.data;
                
                return (
                    <div key={index} id={stylesCard["select-" + select.id]} className={stylesCard.formInput}>
                        <label htmlFor={select.id} >Adresse</label>
                        <select 
                            className={stylesCard["select-form"]}
                            id={select.id}
                            onChange={select.change}
                            required={select.isRequired ? true : false}
                        >
                            <option value="">{select.placeholder && select.placeholder}</option>
                            {Array.isArray(data) && data.map((data, index) => ( 
                                <option key={index} value={data.nom && data.nom}>{data.nom && data.nom}</option>
                            ))}
                        </select>
                    </div>
                )})
            }
            {Array.isArray(textArea) && textArea.map((textArea, index) => (
                <TextArea 
                    key={index}
                    name={textArea.name}
                    id={textArea.id}
                    placeholder={textArea.placeholder && textArea.placeholder}
                    rows={textArea.rows && textArea.rows}
                    cols={textArea.cols && textArea.cols}
                    change={textArea.change}
                    isRequired={textArea.isRequired}
                />
            ))}
            <h5>{msgFinal && msgFinal}</h5>
            <p className={msg ? "activate" : "offscren"}>{msg && msg}</p>
            <div className='container-buttons'>
                {buttonForm && (
                    <button className={msg ? "button" : "button dark-button"}>{buttonForm && buttonForm}</button>
                )}
                {Array.isArray(button) && button.map((button, index) => (
                    <button key={index} className="button dark-button" onClick={button.click}>{button.name}</button>
                ))}
            </div>
        </form>
        {link && linkName && (
            <Link to={link}>{linkName}</Link>
        )}
    </div>
  )
}

export default Card