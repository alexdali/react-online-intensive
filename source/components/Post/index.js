// Core
import React, { Component } from 'react';
import moment from 'moment';
import { func, string, object, number, array } from 'prop-types';

// Components
import { Consumer } from 'components/HOC/withProfile';
import Like from 'components/Like';

//Instruments
import Styles from './styles.m.css';

export default class Post extends Component {
    static propTypes = {
        _likePost: func.isRequired,
        id:        string.isRequired,
        comment:   string.isRequired,
        created:   object.isRequired,
        likes:     array.isRequired,
    };

    render() {
        const { comment, created, id, likes, _likePost } = this.props;
        //console.log('momment ', created);
        //console.log(moment(created).format('MMMM D h:mm:ss a'));

        return (
            <Consumer>
                {(context) => (
                    <section className = { Styles.post }>
                        <img src = { context.avatar } />
                        <a>{ context.currentUserFirstName } { context.currentUserLastName }</a>
                        <time>{moment(created).format('MMMM D h:mm:ss a')}</time>
                        <p>{ comment }</p>
                        <Like
                            _likePost = { _likePost }
                            id = { id }
                            likes = { likes }
                            { ...context }
                        />
                    </section>
                )}
            </Consumer>
            
        );
    }
}
