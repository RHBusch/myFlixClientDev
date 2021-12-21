//Importing react! 
import React from 'react';
import ReactDOM from 'react-dom';

// Import statement to indicate that my app will bundle `./index.scss`
import './index.scss';

// Main component of the initial test --- change the text to confirm responsiveness
class MyFlixApplication extends React.Component {
    render() {
        return (
            <div className="my-flix">
                <div>Good morning TEST this app edition now real time edits</div>
            </div>
        );
    }
}

// Finds the root of my app
const container = document.getElementsByClassName('app-container')[0];

// Tells React to render my app in the root DOM element
ReactDOM.render(React.createElement(MyFlixApplication), container);