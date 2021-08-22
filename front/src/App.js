import React, { useEffect } from "react";
import { Provider, useDispatch } from 'react-redux';
import store from "./app/store";
import AppWraper from "./features/AppWraper/AppWraper";
import './App.css'

// import '@fontsource/roboto';

function App() {

  return (
      <Provider store={store}>
        <div className="App">
          <AppWraper></AppWraper>
        </div>
      </Provider>
  );
}
export default App;

