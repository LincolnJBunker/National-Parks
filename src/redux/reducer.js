const initialState = {
    userId: 1,
    otherValue: 'test'
};

const reducer = (state = initialState, action) => {
    switch (action.type) {
        case 'USER_AUTH':
            return {
                ...state,
                userId: action.payload
            };

        case "LOGIN":
            return {
                ...state,
                userId: null
            };
        default:
            return state;
    }
}

export default reducer