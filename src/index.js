import React from 'react';
import ReactDOM from 'react-dom';
import './style/index.css';
import './utils/util';
import App from './component/App';
import Vistied from './component/vistied';
import Money from './component/money';
import MyTabBar from './layout/tabBar';
import { Route,Redirect, HashRouter, Switch } from 'react-router-dom';
import registerServiceWorker from './registerServiceWorker';
registerServiceWorker();

class Index extends React.Component {
    constructor(props) {
        super(props);
        this.state = {

        };
    }

    render() {
        return (
            <HashRouter>
                <div>
                    <Switch>
                        <Route  exact path="/index" component={App}/>
                        <Route  exact path="/vistied" component={Vistied}/>
                        <Route  exact path="/Money" component={Money}/>
                        <Route path="/" render={() => {
                            return <Redirect to="/index" />
                        }} />
                    </Switch>
                    <MyTabBar></MyTabBar>
                </div>
            </HashRouter>
        );
    }
}



ReactDOM.render(<Index />, document.getElementById('root'));
