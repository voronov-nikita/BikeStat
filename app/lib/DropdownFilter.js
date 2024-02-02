import React, { useState, useEffect } from 'react';
import './DropdownWithCheckbox.css';
import iconImage from "../assets/images/filter.png";

let filterData = [];

const DropdownWithCheckbox = ({ changeFunction }) => {
    const [isDropdownOpen, setDropdownOpen] = useState(false);
    const [selectedValues, setSelectedValues] = useState([1, 2, 3]);

    const data = [
        { label: 'Легкий', value: 1 },
        { label: 'Средний', value: 2 },
        { label: 'Сложный', value: 3 },
    ];


    const toggleDropdown = () => {
        setDropdownOpen(!isDropdownOpen);
    };

    const handleCheckboxChange = (itemValue) => {
        const index = selectedValues.indexOf(itemValue);
        if (index === -1) {
            setSelectedValues([...selectedValues, itemValue]);
        } else {
            const newValues = [...selectedValues];
            newValues.splice(index, 1);
            setSelectedValues(newValues);
        }
    };

    const handleApplyButtonClick = () => {
        changeFunction(selectedValues);
    };

    return (
        <div className={`dropdown-container ${isDropdownOpen ? 'open' : ''}`}>
            <button
                className="dropdown-button"
                onClick={toggleDropdown}
            >
                <img src={iconImage} alt="Icon" className="icon" />
                Фильтр
            </button>

            {isDropdownOpen && (
                <div className="dropdown-content">
                    {data.map((item) => (
                        <div key={item.value} className="checkbox-item">
                            <input
                                type="checkbox"
                                id={item.value}
                                checked={selectedValues.includes(item.value)}
                                onChange={() => handleCheckboxChange(item.value)}
                            />
                            <label htmlFor={item.value}>{item.label}</label>
                        </div>
                    ))}
                    <button className="apply-button" onClick={handleApplyButtonClick}>
                        Применить
                    </button>
                </div>
            )}
        </div>
    );
};

export const getFilterData = () => {
    return filterData;
};

export default DropdownWithCheckbox;
