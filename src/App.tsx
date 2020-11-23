import React from 'react';
import Button from './components/Button/button'

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <p>
          Edit <code>src/App.tsx</code> and save to reload.
        </p>
        <Button disabled>BTN1</Button>
        <Button btnType={'danger'}>BTN2</Button>
        <a
          className="App-link"
          href="https://reactjs.org"
          target="_blank"
          rel="noopener noreferrer"
        >
          Learn React, add a line to test first commit with GitKraken
        </a>
      </header>
    </div>
  );
}

export default App;
