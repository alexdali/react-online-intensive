// Core
import React, { Component } from 'react';
import { hot } from 'react-hot-loader';
import { Route, Switch, Redirect } from 'react-router-dom';

//Components
import Catcher from 'components/Catcher';
import Feed from 'components/Feed';
import Profile from 'components/Profile';
import StatusBar from 'components/StatusBar';
import { LoginPage } from 'components/LoginPage/LoginPage';
import { Provider } from 'components/HOC/withProfile';

// Instruments
import avatar from 'theme/assets/Lisa';

const  options = {
    avatar,
    currentUserFirstName: 'Алексей',
    currentUserLastName:  'Тасбауов',
};

const Login = () => (
    //<Route component = { LoginPage } path = '/login' />
    <LoginPage />
);

export default Login;
@hot(module)
class App extends Component {
    state = {
        avatar,
        currentUserFirstName: 'Алексей',
        currentUserLastName:  'Тасбауов',
        isAthenticated:       false,
    }

    // _renderLoginPage() {
    //     return <Route component = { LoginPage } path = '/' />;
    // }
    // _renderLogged() {
    //     return (
    //         <>
    //             <StatusBar />
    //             <Switch>
    //                 <Route component = { Feed } path = '/feed' />
    //                 <Route component = { Profile } path = '/profile' />
    //                 <Redirect to = '/feed' />
    //             </Switch>
    //         </>
    //     );
    // }

    // _renderContent() {
    //     const { isAthenticated } = this.state;

    //     return isAthenticated ? this._renderLogged() : this._renderLoginPage();
    // }

    _login = async (credentials) => {
        //await delay(1000);

        console.log('->', JSON.stringify(credentials, null, 4));

        await this.setState({
            isAthenticated: true,
        });

        // await actions.setSubmitting(false);

        // //await delay(5000);

        // await this.setState({
        //     isAthenticated: false,
        // });
    };

    _logout = async () => {
        //await delay(1000);
        //console.log('->', JSON.stringify(credentials, null, 4));

        await this.setState({
            isAthenticated: false,
        });
    };

    render() {
        const { isAthenticated } = this.state;

        return (
            <Catcher>
                <Provider value = { this.state }>
                    { isAthenticated
                        ?   <>
                            <StatusBar  _logout = { this._logout } />
                            <Switch>
                                <Route component = { Feed } path = '/feed' />
                                <Route component = { Profile } path = '/profile' />
                                <Route component = { LoginPage } path = '/login' />
                                <Redirect to = '/feed' />
                            </Switch>
                            </>
                        :   <Redirect  to = '/login' />
                    }
                </Provider>
            </Catcher>
        );
    }
}


