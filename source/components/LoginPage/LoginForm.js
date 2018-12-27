// Core
import React, { Component } from 'react';
import { Form, Field } from 'formik';
import cx from 'classnames';

// Instruments
import Styles from './styles.m.css';

export class LoginForm extends Component {
    render() {
        const { touched, isSubmitting, errors, values } = this.props;

        const invalidEmailStyle = cx({
            [ Styles.invalidInput ]: touched.email && errors.email,
        });

        const invalidPasswordStyle = cx({
            [ Styles.invalidInput ]: touched.password && errors.password,
        });

        const disabledButtonStyle = cx({
            [ Styles.disabledButton ]: isSubmitting,
        });

        const submittingMessage = isSubmitting ? 'Entering...' : 'Log in';

        return (
            <Form>
                <Field
                    className = { invalidEmailStyle }
                    name = 'email'
                    placeholder = 'Your e-mail'
                    type = 'email'
                />
                <Field
                    className = { invalidPasswordStyle }
                    name = 'password'
                    placeholder = 'Your password'
                    type = 'password'
                />
                <label>
                    <Field
                        checked = { values.remember }
                        name = 'remember'
                        type = 'checkbox'
                    />
                    <span>Remember me</span>
                </label>
                <button
                    className = { disabledButtonStyle }
                    disabled = { isSubmitting }
                    type = 'submit'>
                    { submittingMessage }
                </button>
            </Form>
        );
    }
}