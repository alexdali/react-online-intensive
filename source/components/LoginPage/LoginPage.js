// Core
import React, { Component } from 'react';
//import { hot } from 'react-hot-loader';
import { Formik } from 'formik';
import { func } from 'prop-types';
import { Route, Switch, Redirect } from 'react-router-dom';

// Instruments
import Styles from './styles.m.css';
import { delay, schema } from 'instruments';

// Components
import { LoginForm } from './LoginForm';
import { withProfile } from 'components/HOC/withProfile';

//@hot(module)
@withProfile
export class LoginPage extends Component {
    static propTypes = {
        _login: func.isRequired,
    };

    // componentDidMount () {
    //     // const { _pathState } = this.props;

    //     this._pathState();

    // }

    // _pathState = () => {
    //     const { _pathState } = this.props;

    //     _pathState(this.props.location.pathname);
    // }

    // state = {
    //     isAthenticated: false,
    // };

    // _login = async (credentials, actions) => {
    //     //await delay(1000);

    //     console.log('->', JSON.stringify(credentials, null, 4));

    //     await this.setState({
    //         isAthenticated: true,
    //     });

    //     // await actions.setSubmitting(false);

    //     // //await delay(5000);

    //     // await this.setState({
    //     //     isAthenticated: false,
    //     // });
    // };

    //<div className = { Styles.loginMessage }>Welcome!</div>

    render() {
        const { isAthenticated, _login } = this.props;

        console.log('LoginPage this.props.isAthenticated: ', isAthenticated);

        return (
            <section className = { Styles.loginPage }>
                {isAthenticated && (
                    <Redirect to = '/feed' />
                )}
                <Formik
                    initialValues = {{
                        email:    '',
                        password: '',
                        remember: false,
                    }}
                    render = { (props) => <LoginForm { ...props } /> }
                    validationSchema = { schema }
                    onSubmit = { _login }
                />
            </section>
        );
    }
}