import * as UserAction from './user.action';

const initialState = {
    isFetching: false,
    accessToken: null,
    currentUser: null,
    userMessages:[]
};

export const usersReducer = (state = initialState, action) => {
    switch (action.type) {
        case UserAction.SHOW_USER_MESSAGE:
            return {
                ...state,
                userMessages: action.userMessages,
            };
        case UserAction.CLEAR_USER_MESSAGE:
            return {
                ...state,
                userMessages: [],
            };
        case UserAction.CHECK_LOGIN_USER_REQUEST:
            return {
                ...state,
                isFetching: true,
            };
        case UserAction.CHECK_LOGIN_USER_SUCCESS:
            return {
                ...state,
                isFetching: false,
            };
        case UserAction.CHECK_LOGIN_USER_FAIL:
            return {
                ...state,
                isFetching: false,
            };
        case UserAction.REGISTRATION_USER_REQUEST:
            return {
                ...state,
                isFetching: true,
            };
        case UserAction.REGISTRATION_USER_SUCCESS:
            return {
                ...state,
                isFetching: false,
            };
        case UserAction.REGISTRATION_USER_FAIL:
            return {
                ...state,
                isFetching: false,
            };
        case UserAction.SAVE_ACCESS_TOKEN:
            return {
                ...state,
                accessToken: action.accessToken,
            };
        case UserAction.SAVE_CURRENT_USER:
            return {
                ...state,
                currentUser: action.currentUser,
            };
        default:
            return state
    }
};



