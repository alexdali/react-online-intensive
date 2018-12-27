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

    render() {
        const { isAthenticated, _login } = this.props;

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