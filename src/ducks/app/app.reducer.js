import { combineReducers } from 'redux';
import { usersReducer }from '../user/user.reducer';

const rootReducer = combineReducers({
    users: usersReducer,
});


export default rootReducer;