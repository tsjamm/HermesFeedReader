
export default (state = false, action) => {
    switch (action.type) {
        case 'menu_open':
            return true;
        case 'menu_toggle':
            return !state;
        default:
            return false;
    }
};