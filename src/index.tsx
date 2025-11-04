/* @refresh reload */
import {render} from 'solid-js/web'
import './index.css'
import App from './App'
import {Route, Router} from "@solidjs/router";
import {UserProvider} from "./context/UserContext";
import {AuthProvider} from "./context/AuthContext";
import Home from "./presentation/pages/Home";
import About from "./presentation/pages/About";
import Contact from "./presentation/pages/Contact";
import NotFound from "./presentation/pages/NotFound";
import Profile from "./presentation/pages/Profile";
import FinanceManager from "./presentation/pages/FinanceManager";

const root = document.getElementById('root')

render(() => (
    <AuthProvider>
        <UserProvider>
            <Router root={App}>
                <Route path="/" component={Home}/>
                <Route path="/about" component={About}/>
                <Route path="/contact" component={Contact}/>
                <Route path="profile" component={Profile}/>
                <Route path="*" component={NotFound}/>
                <Route path="/finance-manager" component={FinanceManager}></Route>
            </Router>
        </UserProvider>
    </AuthProvider>
), root!)
