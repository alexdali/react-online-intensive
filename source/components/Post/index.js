// Core
import React, { Component } from 'react';
import moment from 'moment';
import PropTypes from 'prop-types';

// Components
import { Consumer } from 'components/HOC/withProfile';

//Instruments
import Styles from './styles.m.css';

export default class Post extends Component {
    static propTypes = {
        comment: PropTypes.string.isRequired,
        created: PropTypes.object.isRequired,
    };

    render() {
        const { comment, created } = this.props;
        console.log('momment ', created);
        console.log(moment(created).format('MMMM D h:mm:ss a'));

        return (
            <Consumer>
                {(context) => (
                    <section className = { Styles.post }>
                        <img src = { context.avatar } />
                        <a>{ context.currentUserFirstName } { context.currentUserLastName }</a>
                        <time>{moment(created).format('MMMM D h:mm:ss a')}</time>
                        <p>{ comment }</p>
                    </section>
                )}
            </Consumer>
            
        );
    }
}
