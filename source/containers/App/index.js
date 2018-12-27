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

// const  options = {
//     avatar,
//     currentUserFirstName: 'Алексей',
//     currentUserLastName:  'Тасбауов',
// };

@hot(module)
class App extends Component {
    constructor(props) {
        super(props);

        this.state = {
            avatar,
            currentUserFirstName: 'Алексей',
            currentUserLastName:  'Тасбауов',
            isAthenticated:       false,
            //pathRoute:            '',
            _logout:              this._logout,
            isUserStored:         false,
        };
    }

    componentDidMount () {
        console.log('componentDidMount');
        this._checkStore();
        // const { isAthenticated } = this.state;

        // if (!isAthenticated) {

        //     const userStored = JSON.parse(localStorage.getItem('user'));

        //     this._login(userStored);
        // }

    }

    _login = (credentials) => {
        console.log('_login->', JSON.stringify(credentials, null, 4));

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

    // _pathState = (path) => {
    //     console.log('path: ', path);

    //     this.setState({
    //         pathRoute: path,
    //     });
    // };

    _checkStore = () => {
        const { isAthenticated } = this.state;

        if (!isAthenticated) {

            const userStored = JSON.parse(localStorage.getItem('user'));
            console.log('userStored: ', userStored);
            userStored && this._login(userStored);
        }
    };

    render() {
        const { isAthenticated, isUserStored } = this.state;
        //const { pathRoute } = this.state;

        console.log('this.props.location.pathname: ', this.props);
        //console.log('this.state.pathRoute: ', pathRoute);
        console.log('this.state.isAthenticated: ', isAthenticated);
        console.log('this.state.isUserStored: ', isUserStored);
       
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

