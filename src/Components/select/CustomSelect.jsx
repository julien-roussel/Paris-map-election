import React, { useState } from 'react'

// CSS
import stylesSelect from './select.module.scss';

const CustomSelect = ({ options, selectedValue, onSelect, placeholder }) => {

    const [isOpen, setIsOpen] = useState(false);
    const selectedOption = options.find(opt => opt.value === selectedValue);

    const handleSelect = (value) => {
        onSelect(value);
        setIsOpen(false);
    };

  return (
    <div  className={stylesSelect["custom-container-select"]} 
          onClick={() => setIsOpen(!isOpen)} >
        <div className={stylesSelect["custom-select"]}>
            <div className={stylesSelect["custom-select-trigger"]}>
              {selectedOption?.label || placeholder}
            </div>
            <ul className={isOpen ? (stylesSelect["custom-options"] + ' select-animation activate') : stylesSelect["custom-options"] + ' select-animation'}>
                {options && options.map((option, index) => (
                    <li key={index} 
                        className={stylesSelect["custom-option"]} 
                        onClick={() => handleSelect(option.value)}>
                          {option.label}
                    </li>
                ))}
            </ul>
        </div>
    </div>
  )
}

export default CustomSelect