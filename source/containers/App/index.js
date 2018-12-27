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
            pathRoute:            '',
            _logout:              this._logout,
        };
    }

    _login = (credentials) => {
        console.log('->', JSON.stringify(credentials, null, 4));

        this.setState({
            isAthenticated: true,
        });
    };

    _logout = () => {
        this.setState({
            isAthenticated: false,
        });
    };

    _pathState = (path) => {
        console.log('path: ', path);

        this.setState({
            pathRoute: path,
        });
    };

    render() {
        const { isAthenticated } = this.state;
        const { pathRoute } = this.state;

        console.log('this.props.location.pathname: ', this.props);
        console.log('this.state.pathRoute: ', pathRoute);
        console.log('this.state.isAthenticated: ', isAthenticated);
       
        // const PrivateRoute = ({ component: Component, ...rest }) => (
        //     <Route {...rest} render={props => (
        //       isAthenticated ? (
        //         <Component {...props}/>
        //       ) : (
        //         <Redirect to={{
        //           pathname: '/login',
        //           state: { from: props.location }
        //         }}/>
        //       )
        //     )}/>
        //   );
            
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

