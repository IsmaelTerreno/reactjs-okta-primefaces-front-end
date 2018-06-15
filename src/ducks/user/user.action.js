import backendApi from '../../.backend.api.config';
export const CHECK_LOGIN_USER_REQUEST = 'CHECK_LOGIN_USER_REQUEST';
export const CHECK_LOGIN_USER_SUCCESS = 'CHECK_LOGIN_USER_SUCCESS';
export const CHECK_LOGIN_USER_FAIL = 'CHECK_LOGIN_USER_FAIL';
export const REGISTRATION_USER_REQUEST = 'REGISTRATION_USER_REQUEST';
export const REGISTRATION_USER_SUCCESS = 'REGISTRATION_USER_SUCCESS';
export const REGISTRATION_USER_FAIL = 'REGISTRATION_USER_FAIL';
export const CHANGE_USER_PASSWORD_REQUEST = 'CHANGE_USER_PASSWORD_REQUEST';
export const CHANGE_USER_PASSWORD_SUCCESS = 'CHANGE_USER_PASSWORD_SUCCESS';
export const CHANGE_USER_PASSWORD_FAIL = 'CHANGE_USER_PASSWORD_FAIL';
export const SAVE_ACCESS_TOKEN = 'SAVE_ACCESS_TOKEN';
export const SAVE_CURRENT_USER = 'SAVE_CURRENT_USER';
export const SHOW_USER_MESSAGE = 'SHOW_USER_MESSAGE';
export const CLEAR_USER_MESSAGE = 'CLEAR_USER_MESSAGE';

export const showUserMessages = userMessages => ({
    type: SHOW_USER_MESSAGE,
    userMessages
});
export const clearUserMessages = () => ({
    type: CLEAR_USER_MESSAGE
});
export const checkLoginUserRequest = () => ({
    type: CHECK_LOGIN_USER_REQUEST
});
export const checkLoginUserSuccess = () => ({
    type: CHECK_LOGIN_USER_SUCCESS
});
export const checkLoginUserFail = () => ({
    type: CHECK_LOGIN_USER_FAIL
});
export const saveAccessToken = accessToken => ({
    type: SAVE_ACCESS_TOKEN,
    accessToken
});
export const saveCurrentUser = currentUser => ({
    type: SAVE_CURRENT_USER,
    currentUser
});
export const registerUserRequest = user => ({
    type: REGISTRATION_USER_REQUEST,
    user
});
export const registerUserSuccess = userResponse  => dispatch =>{
    if(userResponse.length > 0 ){
        let errorMessages = [];
        userResponse.forEach((errorItem)=>{
            errorMessages.push({ severity: 'error', summary: 'Registration error', detail: errorItem.errorSummary });
        });
        dispatch(showUserMessages(
            errorMessages
        ));
    } else {
        dispatch(showUserMessages([
            { severity: 'success', summary: 'Registration success', detail: 'New registration done.' }
        ]));
    }
    return{
        type: REGISTRATION_USER_SUCCESS,
        userResponse
    }
};

export const registerUserFail = error => ({
    type: REGISTRATION_USER_FAIL,
    error
});
export const registerUser = user => dispatch => {
    dispatch(registerUserRequest(user));
    return fetch(`${backendApi.urlBackend}/api/users`,
        {
            method: 'post',
            headers: {
                'Accept': 'application/json, text/plain, */*',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify( user )
        })
        .then(response => response.json())
        .then(userResponse => dispatch(registerUserSuccess(userResponse)))
        .catch(function(error) {
            dispatch(registerUserFail(error))
        });
};
export const changeUserPasswordRequest = user => ({
    type: CHANGE_USER_PASSWORD_REQUEST,
    user
});
export const changeUserPasswordSuccess = userResponse  => dispatch =>{
    if(userResponse.status === 403 ){
        dispatch(showUserMessages([
            { severity: 'error', summary: 'Change password error', detail: userResponse.message }
        ]));
    } else {
        dispatch(showUserMessages([
            { severity: 'success', summary: 'Change password success', detail: 'New password updated.' }
        ]));
    }
    return {
        type: CHANGE_USER_PASSWORD_SUCCESS,
        userResponse
    };
};
export const changeUserPasswordFail = error  => dispatch =>{
    dispatch(showUserMessages([
        { severity: 'error', summary: 'Change password error', detail: 'New password not updated.' }
    ]));
    return {
        type: CHANGE_USER_PASSWORD_FAIL,
        error
    }
};
export const changeUserPassword = (changePassword, accessToken) => dispatch => {
    dispatch(changeUserPasswordRequest(changePassword));
    return fetch(`${backendApi.urlBackend}/api/users/change_password`,
        {
            method: 'post',
            headers: {
                'Accept': 'application/json, text/plain, */*',
                'Content-Type': 'application/json',
                'Authorization': 'Bearer '+ accessToken
            },
            body: JSON.stringify( changePassword )
        })
        .then(response => response.json())
        .then(userResponse => dispatch(changeUserPasswordSuccess(userResponse)))
        .catch(function(error) {
            dispatch(changeUserPasswordFail(error))
        });
};