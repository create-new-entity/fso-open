

export function validateData(data: any[]){

    const allDataIsValidStringNumbers = data.every(d => {
        return typeof d === 'string' && !isNaN(parseFloat(d))
    })
    const allDataIsValidNumbers = data.every(d => {
        return typeof d === 'number'
    })

    const invalidDataExists = !allDataIsValidNumbers && !allDataIsValidStringNumbers
    if(invalidDataExists) {
        throw new Error('malformatted parameters');
    }
}