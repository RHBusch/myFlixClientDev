import React from 'react';
import ReactDOM from 'react-dom';
import { createStore } from 'redux';
import todos from './reducers'
import './index.css';
import App from './App';
import * as serviceWorker from './serviceWorker';
import { addTodo, toggleTodo } from './actions';
const store = createStore(todos);

console.log('Initial State', store.getState())

store.dispatch(addTodo('Dispatch my first action')
);
console.log('state after adding first todo', store.getState())

store.dispatch(toggleTodo(0));
console.log('State after toggling first todo', store.getState());

ReactDOM.render(<App />, document.getElementById('root'));

serviceWorker.unregister();