import { prepareRandomNumbersSlots, emptyTicket } from './helpers';

test('Every row must return 5 marked elements', () => {
    const ticket = prepareRandomNumbersSlots(emptyTicket);
    const hasRequiredElements = ticket[0].reduce((acc, row) => {
        const rowHasSlots = row.filter((el) => el === true).length === 5;
        acc.push(rowHasSlots);
        return acc;
    }, []);

    expect(hasRequiredElements.every((el) => el === true)).toBe(true);
});

test('Every column has at least 1 marked element', () => {
    const ticket = prepareRandomNumbersSlots(emptyTicket);
    let hasAtLeastOneElementInCol = false;

    for (let i = 0; i < ticket[0][2].length; i++) {
        hasAtLeastOneElementInCol =
            !!ticket[0][2][i] || !!ticket[0][1][i] || !!ticket[0][0][i];
    }

    expect(hasAtLeastOneElementInCol).toBe(true);
});
