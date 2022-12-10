import React, { useContext, useEffect } from "react";
import { BrowserRouter } from "react-router-dom"
import AppRouter from "./component/AppRouter";

const App = () => {
  return (
    <div>
      <BrowserRouter>
        <AppRouter/>
      </BrowserRouter>
    </div>
  );
};

export default App;



