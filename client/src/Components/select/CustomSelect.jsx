import React, { useState } from 'react'

// CSS
import stylesSelect from './select.module.scss';

const CustomSelect = ({ id, classN, options, selectedValue, onSelect, placeholder }) => {

    const [isOpen, setIsOpen] = useState(false);
    const selectedOption = options.find(opt => opt.value === selectedValue);

    const handleSelect = (value) => {
        onSelect(value);
        setIsOpen(false);
    };

  return (
    <div className={classN ? 
                    (classN + ' ' + stylesSelect["custom-container-select"]) 
                    : 
                    stylesSelect["custom-container-select"]} 
          onClick={() => setIsOpen(!isOpen)} >
        <div id={id && 'select-'+id} className={stylesSelect["custom-select"]}>
            <div className={stylesSelect["custom-select-trigger"]}>
              {typeof selectedOption?.label === 'string'
                      ? selectedOption.label.slice(0, 30)
                      : placeholder}
            </div>
            <ul className={isOpen ? (stylesSelect["custom-options"] + ' select-animation activate') : stylesSelect["custom-options"] + ' select-animation'}>
                {Array.isArray(options) && options.map((option, index) => (
                    <li key={index} 
                        className={stylesSelect["custom-option"]} 
                        onClick={() => handleSelect(option.value)}
                        value={option?.value}>
                          {option?.label}
                    </li>
                ))}
            </ul>
        </div>
    </div>
  )
}

export default CustomSelect