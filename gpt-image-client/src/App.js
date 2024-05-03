import React from 'react';
import './App.css';
import ImageComponent from './ImageComponent';

function App() {
    return (
        <div className="App">
            <header className="App-header">
                <h1>GPT Image Generator</h1>
                <ImageComponent />
            </header>
        </div>
    );
}

export default App;
