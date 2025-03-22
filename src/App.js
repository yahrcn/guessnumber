import { useEffect, useState, useRef } from 'react';

import './App.css';

export default function App() {
    const [desiredNumber, setDesiredNumber] = useState(0);
    const [number, setNumber] = useState(undefined);
    const [answers, setAnswers] = useState([]);
    const inputRef = useRef(null);

    const generateRandomNumber = () => {
        const digits = [1, 2, 3, 4, 5, 6, 7, 8];
        let result = '';

        for (let i = 0; i < 4; i++) {
            const randomIndex = Math.floor(Math.random() * digits.length);
            result += digits.splice(randomIndex, 1)[0];
        }

        setDesiredNumber(parseInt(result, 10));
        setAnswers([]);
    };

    const createAnswer = (number, correct) => {
        return {
            number,
            correct,
        };
    };

    const submitNumber = (e) => {
        e.preventDefault();
        if (
            number === undefined ||
            String(number).length !== 4 ||
            answers.find((answer) => answer.number === number)
        ) {
            return;
        }
        setAnswers([...answers, createAnswer(number, checkNumber(number))]);
        setNumber(undefined);
        inputRef.current.value = '';
    };

    const checkNumber = (number) => {
        let string = '';
        for (let i = 0; i < String(desiredNumber).length; i++) {
            if (String(desiredNumber)[i] === String(number)[i]) {
                string += 'V';
            } else if (String(desiredNumber).includes(String(number)[i])) {
                string += '!';
            }
        }

        let arr = string.split('');

        for (let i = arr.length - 1; i > 0; i--) {
            const j = Math.floor(Math.random() * (i + 1));
            [arr[i], arr[j]] = [arr[j], arr[i]];
        }

        return arr.join('');
    };

    const handleChange = (e) => {
        let value = e.target.value;
        value = value.replace(/\D/g, '');
        value = value.replace(/[09]/g, '');

        if (value.length > 4) {
            value = value.slice(0, 4);
        }

        const uniqueDigits = new Set(value);
        if (uniqueDigits.size !== value.length) {
            value = Array.from(uniqueDigits).join('');
        }

        setNumber(value);
    };

    useEffect(() => {
        generateRandomNumber();
    }, []);

    return (
        <div className='App'>
            <h1>Угадай число</h1>
            <form
                onSubmit={submitNumber}
                className='form'>
                <input
                    value={number}
                    onChange={handleChange}
                    className='input'
                    ref={inputRef}
                />
                <button
                    type='submit'
                    className='button'>
                    Submit
                </button>
            </form>
            <button
                onClick={generateRandomNumber}
                className='button'>
                Reset
            </button>
            <ol className='list'>
                {answers.map((answer, index) => (
                    <li
                        className='item'
                        key={index}>
                        {answer.number} - {answer.correct}
                    </li>
                ))}
            </ol>
        </div>
    );
}
