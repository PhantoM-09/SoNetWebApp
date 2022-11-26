import React from "react";
import Main from "./component/Main"
import {BrowserRouter} from "react-router-dom"
import AppRouter from "./component/AppRouter";

const App = () => {
  return (
    <div>
    <Main/>
    <BrowserRouter>
      <AppRouter/>
    </BrowserRouter>
    </div>
  );
}

export default App;



