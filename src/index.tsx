/* @refresh reload */
import {render} from 'solid-js/web'
import './index.css'
import App from './App.tsx'
import {Route, Router} from "@solidjs/router";
import {UserProvider} from "./context/UserContext.tsx";
import {AuthProvider} from "./context/AuthContext.tsx";
import Home from "./presentation/pages/Home.tsx";

const root = document.getElementById('root')

render(() => (
    <AuthProvider>
        <UserProvider>
            <Router root={App}>
                <Route path="/" component={Home}/>
            </Router>
        </UserProvider>
    </AuthProvider>
), root!)
