import React from 'react';
import './App.scss';
import initializeStore from "./initializeStore";
import {Provider} from "react-redux";
import PlayViewContainer from "./playview/PlayViewContainer";
import InformationWindowContainer from "./information/InformationWindowContainer";


const store = initializeStore();

function App() {
  return (
    <Provider store={store}>
      <div className="App">
        <PlayViewContainer />
        <InformationWindowContainer />
      </div>
    </Provider>
  );
}

export default App;
