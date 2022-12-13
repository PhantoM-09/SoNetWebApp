import React, { createContext } from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import StrangeUserStore from './utils/store/StrangeUserStore';
import UserStore from './utils/store/UserStore';

export const Context = createContext(null)


const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
    <Context.Provider value={{
        user: new UserStore(),
        strangeUser: new StrangeUserStore()
    }}>
        <App />
    </Context.Provider>

);
