import React, { useEffect, useState } from 'react';

const generateEmptyTicket = () => {
    return Array.from({ length: 9 }, () => {
        const columnsGlobal = Array.from({ length: 6 }, () => {
            const columnsLocal = Array.from({ length: 3 }, () => {
                return 0;
            });
            return columnsLocal;
        });
        return columnsGlobal;
    });
};

const ppp = [
    [1, 2, 3, 4, 5, 6, 7, 8, 9],
    [10, 11, 12, 13, 14, 15, 16, 17, 18, 19],
    [20, 21, 22, 23, 24, 25, 26, 27, 28, 29],
    [30, 31, 32, 33, 34, 35, 36, 37, 38, 39],
    [40, 41, 42, 43, 44, 45, 46, 47, 48, 49],
    [50, 51, 52, 53, 54, 55, 56, 57, 58, 59],
    [60, 61, 62, 63, 64, 65, 66, 67, 68, 69],
    [70, 71, 72, 73, 74, 75, 76, 77, 78, 79],
    [80, 81, 82, 83, 84, 85, 86, 87, 88, 89, 90],
];

const generateSourceNumbersArrays = () => {
    const arr = [];
    let temp = 0;
    const callback = () => {
        temp = temp + 1;
        return temp;
    };
    for (let i = 0; i < 9; i++) {
        let ascNumbersArray;
        if (i === 0) {
            ascNumbersArray = Array.from({ length: 9 }, callback);
        } else if (i === 8) {
            ascNumbersArray = Array.from({ length: 11 }, callback);
        } else {
            ascNumbersArray = Array.from({ length: 10 }, callback);
        }
        arr.push(shuffle(ascNumbersArray));
    }
    return arr;
};

// https://stackoverflow.com/questions/2450954/how-to-randomize-shuffle-a-javascript-array
const shuffle = (array: number[]): number[] => {
    for (let i = array.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [array[i], array[j]] = [array[j], array[i]];
    }
    return array;
};

const randomIndex = (exclude?: number): number => {
    const max = 2;
    const min = 0;

    const random = Math.floor(Math.random() * (max - min + 1)) + min;

    if (random !== exclude) {
        return random;
    } else {
        return randomIndex(exclude);
    }
};

const checkElementExist = (element: number, currentIndex: number) => {
    if (element !== 0) {
        return randomIndex(element);
    }
    return currentIndex;
};

const fillTicket = () => {
    const ticketTemplate = generateEmptyTicket();
    const shuffledArrays = generateSourceNumbersArrays();
    console.log('🚀 ~ ticketTemplate', ticketTemplate);

    for (let k = 0; k < shuffledArrays.length; k++) {
        for (let i = 0; i < shuffledArrays[k].length; i++) {
            let j = randomIndex();
            const columns = ticketTemplate[k];
            const lastIndex = columns.length - 1;
            const shuffledRow = shuffledArrays[k];

            if (lastIndex < i) {
                j = checkElementExist(columns[i - lastIndex][j], j);
                columns[i - lastIndex][j] = shuffledRow[i];
            } else {
                j = checkElementExist(columns[i][j], j);
                columns[i][j] = shuffledRow[i];
            }
        }
    }

    return ticketTemplate;
};

const startBingo = () => {
    const filledTicket = fillTicket();
    const strips = [];

    for (let i = 0; i < 6; i++) {
        const strip = [];
        for (let j = 0; j < 9; j++) {
            strip.push(filledTicket[j][i]);
        }
        strips.push(strip);
    }
    console.log('🚀 ~ strips', strips);

    return strips;
};

function App() {
    const strips = startBingo();
    return (
        <div className="App">
            {strips.map((strip: any, i: number) => (
                <div
                    style={{
                        marginBottom: '30px',
                        display: 'flex',
                    }}
                >
                    {strip.map((col: any, i: number) => (
                        <div>
                            {col.map((el: any, i: number) => (
                                <div
                                    style={{
                                        width: '50px',
                                        height: '50px',
                                        backgroundColor: '#999999',
                                        margin: '5px',
                                        fontSize: '1.8rem',
                                        fontWeight: 'bold',
                                        display: 'flex',
                                        justifyContent: 'center',
                                        alignItems: 'center',
                                        borderRadius: '5px',
                                    }}
                                >
                                    <span>{el}</span>
                                </div>
                            ))}
                        </div>
                    ))}
                </div>
            ))}
        </div>
    );
}

export default App;
