import React, { useState, useEffect } from 'react';
import './DropdownWithCheckbox.css';
import iconImage from "../assets/images/filter.png";

// глобальная переменная список, содержащий в себе массив отфильтрованных данных
let filterData = [];

// Инициализируемый объект кнопки фильтра данных
const DropdownWithCheckbox = ({ changeFunction }) => {
    // константные переменные состояния
    // переменная отвечает за отображения выпадающего меню
    const [isDropdownOpen, setDropdownOpen] = useState(false);
    // переменная отвечает за храние отсортированных данных в хеш виде
    const [selectedValues, setSelectedValues] = useState([1, 2, 3]);

    // отображаемый контент для каждого блока фильтрации
    // первый эллемент - это отображаемое название
    // второй эллемент - это id значение
    const data = [
        { label: 'Легкий', value: 1 },
        { label: 'Средний', value: 2 },
        { label: 'Сложный', value: 3 },
    ];

    // обработчик изначального отображения
    // показывать и не показывать выпадающее меню
    const toggleDropdown = () => {
        setDropdownOpen(!isDropdownOpen);
    };

    // обновление данных после выбора checkbox массива в выпадающем меню
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

    // изменение данных в константной переменной состояния
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
