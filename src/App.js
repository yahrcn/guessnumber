import { useEffect, useState } from 'react';

import './styles.css';

export default function App() {
    const [desiredNumber, setDesiredNumber] = useState(0);
    const [number, setNumber] = useState(undefined);
    const [answers, setAnswers] = useState([]);

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

    const submitNumber = () => {
        if (number === undefined || String(number).length !== 4) {
            return;
        }
        setAnswers([...answers, createAnswer(number, checkNumber(number))]);
        setNumber(undefined);
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
        console.log(desiredNumber, string);

        return string;
    };

    useEffect(() => {
        generateRandomNumber();
    }, []);

    return (
        <div className='App'>
            <h1>Угадай число</h1>
            <input
                value={number}
                onChange={(e) => setNumber(Number(e.target.value))}
            />
            <button onClick={submitNumber}>Submit</button>
            <button onClick={generateRandomNumber}>Reset</button>
            <ul>
                {answers.map((answer, index) => (
                    <li key={index}>
                        {answer.number} - {answer.correct}
                    </li>
                ))}
            </ul>
        </div>
    );
}
