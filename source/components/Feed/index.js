// Core
import React, { Component } from 'react';

//Instruments
import StatusBar from 'components/StatusBar';
import Composer from 'components/Composer';
import Post from 'components/Post';
import Spinner from 'components/Spinner';

// Instruments
import Styles from './styles.m.css';

export default class Feed extends Component {
    state = {
        posts: [
            { id: '123', comment: 'Hi there', created: 1526825071433 },
            { id: '456', comment: 'Hi there again', created: 1526825079433 },
        ],
        isPostsFetching: false,
    };

    render() {
        const { posts, isPostsFetching } = this.state;

        const postsJSX = posts.map((post) => {
            return <Post key = { post.id } { ...post }/>;
        });

        return (
            <>
                <section className = { Styles.feed }>
                    <Spinner isSpinning = { isPostsFetching } />
                    <StatusBar />
                    <Composer />
                    {postsJSX}
                </section>
            </>
        );
    }
}
