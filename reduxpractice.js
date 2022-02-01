//Actions (Folder) index.js (File)

//Action Types

export const ADD_TODO = 'ADD_TODO';

export const TOGGLE_TODO = 'TOGGLE_TODO';

export const EDIT_TODO = 'EDIT_TODO'

export const DELETE_TODO = 'DELETE_TODO'

//Action creators 

export const addTodo = text => ({
    type: ADD_TODO,
    text
})

export const toggleTodo = index => ({
    type: TOGGLE_TODO,
    index
})

export const editTodo = (text, index) => ({
    type: EDIT_TODO,
    text: text,
    index: index
})

export const delTodo = index => ({
    type: DELETE_TODO,
    index
})

//Reducers (Folder) index.js(File)
import {
    ADD_TODO,
    TOGGLE_TODO,
    DELETE_TODO,
    EDIT_TODO
} from '../actions'

const todos = (state = [], action) => {
    switch (action.type) {
        case ADD_TODO:
            return [...state, {
                text: action.text,
                completed: false
            }
            ]
        case TOGGLE_TODO:
            return state.map((todo, index) => (
                index === action.index)
                ? { ...todo, completed: !todo.completed }
                : todo
            )
        case EDIT_TODO:
            return state.map((todo, index) => (
                index === action.index)
                ? { ...todo, text: action.text }
                : todo
            )
        case DELETE_TODO:
            return state.filter((todo, index) => (
                index !== action.index)
            )

        default:
            return state
    }
}
export default todos;

//SRC (Folder) index.js(File)

import React from 'react';
import ReactDOM from 'react-dom';
import { createStore } from 'redux';
import todos from './reducers'
import './index.css';
import App from './App';
import * as serviceWorker from './serviceWorker';
import { addTodo, toggleTodo, editTodo, delTodo } from './actions';
const store = createStore(todos);

//Logging initial state
console.log('Initial State', store.getState())

//Adding first item to list and logging result. 
store.dispatch(addTodo('Dispatch my first action')
);

console.log('state after adding first todo', store.getState())

// Adding second item to list and logging result
store.dispatch(addTodo('Crush this exercise!'))

console.log('state after adding second todo', store.getState())

// Adding third item to list and logging result

store.dispatch(addTodo('Make dinner'))

console.log('state after adding third todo', store.getState())

// Toggling #2 (Make Dinner)

store.dispatch(toggleTodo(2));

//Logging result of toggle

console.log('State after toggling third todo', store.getState());

// Editing first item on list and logging it
store.dispatch(editTodo('Finish this assignment', 2));
console.log('state after editing first todo', store.getState())

//Deleting third item on list and logging it 
store.dispatch(delTodo(2));
console.log('state after deleting third todo', store.getState())

ReactDOM.render(<App />, document.getElementById('root'));

serviceWorker.unregister();
