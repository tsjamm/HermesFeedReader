
export const selectSource = (source) => {
    return {
        type: 'source_selection',
        payload: source
    };
};

export const clearSource = () => {
    return {
        type: 'clear_selection'
    };
};