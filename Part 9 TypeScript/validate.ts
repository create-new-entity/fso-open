

export function validateData(data: string[]) {
    const invalidDataExists = data.some((d) => isNaN(parseFloat(d)));
    if(invalidDataExists) {
        throw new Error('Invalid data given.');
    }
}