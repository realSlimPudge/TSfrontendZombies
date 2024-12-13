import React, { useState } from "react";
import styled from "styled-components";

interface Option {
    id: string;
    title: string;
    label: string;
    defaultChecked?: boolean;
}

interface RadioProps {
    options: Option[];
    defaultOptionId: string;
}

const Radio: React.FC<RadioProps> = ({ options, defaultOptionId }) => {
    const [selectedOption, setSelectedOption] =
        useState<string>(defaultOptionId);
    const [isOpen, setIsOpen] = useState<boolean>(false);

    const handleChange = (id: string) => {
        setSelectedOption(id);
        setIsOpen(false);
    };

    const toggleOptions = () => {
        setIsOpen((prev) => !prev);
    };

    return (
        <StyledWrapper>
            <div className="select" onClick={toggleOptions}>
                <div className="selected">
                    {
                        options.find((option) => option.id === selectedOption)
                            ?.label
                    }
                    <svg
                        xmlns="http://www.w3.org/2000/svg"
                        height="1em"
                        viewBox="0 0 512 512"
                        className={`arrow ${isOpen ? "open" : ""}`}
                    >
                        <path d="M233.4 406.6c12.5 12.5 32.8 12.5 45.3 0l192-192c12.5-12.5 12.5-32.8 0-45.3s-32.8-12.5-45.3 0L256 338.7 86.6 169.4c-12.5-12.5-32.8-12.5-45.3 0s-12.5 32.8 0 45.3l192 192z" />
                    </svg>
                </div>

                <div className={`options ${isOpen ? "active" : ""}`}>
                    {options.map((option) => (
                        <div title={option.title} key={option.id}>
                            <input
                                id={option.id}
                                name="option"
                                type="radio"
                                checked={selectedOption === option.id}
                                onChange={() => handleChange(option.id)}
                            />
                            <label
                                className="option"
                                htmlFor={option.id}
                                data-txt={option.label}
                            />
                        </div>
                    ))}
                </div>
            </div>
        </StyledWrapper>
    );
};

const StyledWrapper = styled.div`
    .select {
        width: fit-content;
        cursor: pointer;
        position: relative;
        transition: 300ms;
        color: white;
        overflow: hidden;
    }

    .selected {
        background-color: var(--primary-color);
        padding: 5px;
        margin-bottom: 3px;
        border-radius: 5px;
        position: relative;
        z-index: 100000;
        font-size: 15px;
        display: flex;
        align-items: center;
        justify-content: space-between;
    }

    .arrow {
        position: relative;
        right: 0px;
        height: 10px;
        transform: rotate(-90deg);
        width: 25px;
        fill: white;
        z-index: 100000;
        transition: 300ms;
    }

    .options {
        display: flex;
        flex-direction: column;
        border-radius: 5px;
        padding: 5px;
        background-color: #2a2f3b;
        position: relative;
        top: -100px;
        opacity: 0;
        transition: 300ms;
    }

    .active {
        opacity: 1;
        top: 0;
    }

    .select:hover > .selected .arrow {
        transform: rotate(0deg);
    }

    .option {
        border-radius: 5px;
        padding: 5px;
        transition: 300ms;
        background-color: #2a2f3b;
        width: 150px;
        font-size: 15px;
    }
    .option:hover {
        background-color: #323741;
    }

    .options input[type="radio"] {
        display: none;
    }

    .options label {
        display: inline-block;
    }
    .options label::before {
        content: attr(data-txt);
    }
`;

export default Radio;
