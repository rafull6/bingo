export const emptyTicket = [
    [
        [false, false, false, false, false, false, false, false, false],
        [false, false, false, false, false, false, false, false, false],
        [false, false, false, false, false, false, false, false, false],
    ],
    [
        [false, false, false, false, false, false, false, false, false],
        [false, false, false, false, false, false, false, false, false],
        [false, false, false, false, false, false, false, false, false],
    ],
    [
        [false, false, false, false, false, false, false, false, false],
        [false, false, false, false, false, false, false, false, false],
        [false, false, false, false, false, false, false, false, false],
    ],
    [
        [false, false, false, false, false, false, false, false, false],
        [false, false, false, false, false, false, false, false, false],
        [false, false, false, false, false, false, false, false, false],
    ],
    [
        [false, false, false, false, false, false, false, false, false],
        [false, false, false, false, false, false, false, false, false],
        [false, false, false, false, false, false, false, false, false],
    ],
    [
        [false, false, false, false, false, false, false, false, false],
        [false, false, false, false, false, false, false, false, false],
        [false, false, false, false, false, false, false, false, false],
    ],
];

export const shuffle = (array: number[]): number[] => {
    for (let i = array.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [array[i], array[j]] = [array[j], array[i]];
    }
    return array;
};

const fillTicket = (emptyTicket: any[]) => {
    const ticket = [...emptyTicket];
    const shuffledArrays = getShuffledSourceNumbers();

    for (let strip = 0; strip < ticket.length; strip++) {
        for (let row = 0; row < ticket[strip].length; row++) {
            for (let el = 0; el < ticket[strip][row].length; el++) {
                if (ticket[strip][row][el]) {
                    ticket[strip][row][el] = shuffledArrays[el][0];
                    shuffledArrays[el].splice(0, 1);
                }
            }
        }
    }

    return ticket;
};

export const getFlaggedIndexes = () => {
    const arr = [];
    while (arr.length < 5) {
        const r = Math.floor(Math.random() * 8) + 1;
        if (arr.indexOf(r) === -1) arr.push(r);
    }

    return arr;
};

export const prepareRandomNumbersSlots = (strips: boolean[][][]) => {
    const newArr = [...strips];

    for (let i = 0; i < strips.length; i++) {
        for (let j = 0; j < strips[i].length; j++) {
            const isLastRow = j === strips[i].length - 1;
            const flagged = getFlaggedIndexes();
            for (let k = 0; k < strips[i][j].length; k++) {
                if (!isLastRow) {
                    if (flagged.includes(k)) {
                        newArr[i][j][k] = true;
                    } else {
                        newArr[i][j][k] = false;
                    }
                } else {
                    if (
                        strips[i][j - 1][k] === false &&
                        strips[i][j - 2][k] === false
                    ) {
                        newArr[i][j][k] = true;
                    } else {
                        newArr[i][j][k] = false;
                    }
                }
            }
            if (isLastRow) {
                const reserved = strips[i][j].reduce(
                    (acc: number[], el: boolean, i: number) => {
                        if (el) {
                            acc.push(i);
                        }
                        return acc;
                    },
                    []
                );

                const unique = flagged.filter((el) => !reserved.includes(el));
                const updated = Array.from(new Set([...unique, ...reserved]));
                updated.splice(0, updated.length - 5);

                for (let k = 0; k < strips[i][j].length; k++) {
                    if (updated.includes(k)) {
                        newArr[i][j][k] = true;
                    } else {
                        newArr[i][j][k] = false;
                    }
                }
            }
        }
    }

    return newArr;
};

const getShuffledSourceNumbers = () => {
    const columnSourceNumbers = [
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

    return columnSourceNumbers.map((row: number[]) => {
        return shuffle(row);
    });
};

export const startBingo = () => {
    const strips = prepareRandomNumbersSlots(emptyTicket);
    const filledTicket = fillTicket(strips);
    return filledTicket;
};
