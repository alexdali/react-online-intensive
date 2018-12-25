// Core
import React, { Component } from 'react';
import { hot } from 'react-hot-loader';
import { Formik } from 'formik';

// Instruments
import Styles from './styles.m.css';
import { delay, schema } from '../helpers';

// Components
import { LoginForm } from './LoginForm';

@hot(module)
export class LoginPage extends Component {
    render() {
        return (
            <section className={Styles.loginPage}>
                <LoginForm />
            </section>
        );
    }
}