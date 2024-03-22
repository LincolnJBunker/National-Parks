const initialState = {
    userId: null,
    otherValue: 'test',
    profileId: null,
    parkId: null,
};

const reducer = (state = initialState, action) => {
    switch (action.type) {
        case 'USER_AUTH':
            return {
                ...state,
                userId: action.payload
            };

        case "LOGOUT":
            return {
                ...state,
                userId: null
            };

        case 'SET_PROFILE':
            return {
                ...state,
                profileId: action.payload
            };

        case 'SET_PARK':
            return {
                ...state,
                parkId: action.payload
            }

        default:
            return state;
    }
}

export default reducer