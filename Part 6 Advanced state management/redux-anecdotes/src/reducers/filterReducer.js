

const filterReducer = (state = '', action) => {
    switch(action.type) {
        case 'FILTER':
            return action.payload.filter
        default:
            return state
    }
}

export const changeFilter = (filterText) => {
    return {
        type: 'FILTER',
        payload: {
            filter: filterText
        }
    }
}

export default filterReducer