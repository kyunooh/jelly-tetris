import React from 'react';
import './App.css';
import PlayView from "./playview/PlayView";
import initializeStore from "./initializeStore";
import {Provider} from "react-redux";

const store = initializeStore();

function App() {
  return (
    <Provider store={store}>
      <div className="App">
        <PlayView />
      </div>
    </Provider>
  );
}

export default App;
