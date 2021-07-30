import React from "react";
import axios from "axios";
import {
  BrowserRouter as Router,
  Switch,
  Route,
} from "react-router-dom";
import { Provider, useSelector, useDispatch } from 'react-redux';
import store from "./app/store";
import AlertMsg from "./features/AlertMsg/AlertMsg";
import Header from "./features/Header/Header";
import News from "./features/News/News";
import PostNews from "./features/CreateAccount/CreateAccount";
import AppWraper from "./features/AppWraper/AppWraper";

// import '@fontsource/roboto';

function App() {


  console.log(store.getState());

  return (
      <Provider store={store}>
        <div className="App">
          <AppWraper></AppWraper>
        </div>
      </Provider>
  );

}
export default App;

