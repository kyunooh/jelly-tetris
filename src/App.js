import React from 'react';
import './App.css';
import initializeStore from "./initializeStore";
import {Provider} from "react-redux";
import PlayViewContainer from "./playview/PlayViewContainer";

const store = initializeStore();

function App() {
  return (
    <Provider store={store}>
      <div className="App">
        <PlayViewContainer />
      </div>
    </Provider>
  );
}

export default App;
