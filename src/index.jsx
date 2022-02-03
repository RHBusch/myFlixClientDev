import React from 'react';
import ReactDOM from 'react-dom';
import Container from 'react-bootstrap/Container';
import { createStore } from 'redux';
import { Provider } from 'react-redux';
import { devToolsEnhancer } from 'redux-devtools-extension';
import moviesApp from './reducers/reducers'//importing reducer
import MainView from './components/MainView/main-view'; //Importing MainView --- this is where index.html will pull code from as well.

// Import statement to indicate that my app will bundle `./index.scss`
import './index.scss';

//Establishing store with inputes from the combined reducers 'moviesApp.'
const myFlixStore = createStore(moviesApp, devToolsEnhancer());

// Main component of the initial test --- change the text to confirm responsiveness
class MyFlixApplication extends React.Component {
    render() {
        return (
            //provider makes the store accessible to the entire app
            <Provider store={myFlixStore}>
                <Container>
                    <MainView />
                </Container>
            </Provider>
        );
    }
}

// Finds the root of my app
const container = document.getElementsByClassName('app-container')[0];

// Tells React to render my app in the root DOM element
ReactDOM.render(React.createElement(MyFlixApplication), container);