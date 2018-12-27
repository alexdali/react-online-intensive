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
//import avatar from 'theme/assets/Lisa';

const avatar = 'https://image.freepik.com/free-vector/moustache-man-cartoon-vector_17-1018103121.jpg'

@hot(module)
class App extends Component {
    constructor(props) {
        super(props);

        this.state = {
            avatar,
            currentUserFirstName: 'Алексей',
            currentUserLastName:  'Тасбауов',
            isAthenticated:       false,
            _logout:              this._logout,
            isUserStored:         false,
        };
    }

    componentDidMount () {
        this._checkStore();
    }

    _login = (credentials) => {
        //console.log('_login->', JSON.stringify(credentials, null, 4));

        if (credentials.remember) {
            localStorage.setItem('user', JSON.stringify(credentials));
            this.setState({
                isUserStored: true,
            });  
        }

        this.setState({
            isAthenticated: true,
        });
    };

    _logout = () => {
        localStorage.removeItem('user');  

        this.setState({
            isAthenticated: false,
            isUserStored:   false,
        });
    };

    _checkStore = () => {
        const { isAthenticated } = this.state;

        if (!isAthenticated) {
            const userStored = JSON.parse(localStorage.getItem('user'));

            userStored && this._login(userStored);
        }
    };

    render() {
        const { isAthenticated, isUserStored } = this.state;

        return (
            <Catcher>
                <Provider value = { this.state }>
                    <StatusBar />
                    <Switch>
                        <Route
                            path = '/login'
                            render = { (props) => (
                                <LoginPage
                                    _login = { this._login }
                                    { ...props }
                                />
                            )
                            }
                        />
                        { !isAthenticated && <Redirect to = '/login' /> }
                        <Route component = { Feed } path = '/feed' />
                        <Route component = { Profile } path = '/profile' />
                        <Redirect to = '/feed' />
                    </Switch>
                </Provider>
            </Catcher>
        );
    }
}

export default App;

