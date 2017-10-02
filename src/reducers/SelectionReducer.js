
export default (state = null, action) => {
    switch (action.type) {
        case 'source_selection':
            return action.payload;
        case 'clear_selection':
            return null;
        default:
            return state;
    }
};