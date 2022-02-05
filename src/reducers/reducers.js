//This combines reducers into a common function for easy export and use. 
import { combineReducers } from 'redux';

//Importing actions. 

import { SET_FILTER, SET_MOVIES, SET_USER, UPDATE_USER } from '../actions/actions';

function visibilityFilter(state = '', action) {
    switch (action.type) {
        case SET_FILTER:
            return action.value;
        default:
            return state;
    }
}

function movies(state = [], action) {
    switch (action.type) {
        case SET_MOVIES:
            console.log('SET_MOVIES reducer reached')
            return action.value;
        default:
            return state;
    }
}

function user(state = [], action) {
    switch (action.type) {
        case SET_USER:
            return action.value;
        case UPDATE_USER:
            return action.value;
        default: return state
    }
}

//This is where the combineReducers function comes into play (imported above), combining visibilityFilter and movies.

const moviesApp = combineReducers({
    visibilityFilter,
    movies,
    user
})

export default moviesApp
