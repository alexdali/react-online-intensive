// Core
import React, { Component } from 'react';
import moment from 'moment';

//Instruments
import StatusBar from 'components/StatusBar';
import Composer from 'components/Composer';
import Post from 'components/Post';
import Spinner from 'components/Spinner';

// Instruments
import Styles from './styles.m.css';
import { getUniqueID, delay } from 'instruments';

export default class Feed extends Component {
    state = {
        // posts: [
        //     { id: '123', comment: 'Hi there', created: 1526825071433, likes: [] },
        //     { id: '456', comment: 'Hi there again', created: 1526825079433, likes: [] },
        // ],
        posts: [
            { id: '123', comment: 'Hi there', created: {}, likes: [] },
            { id: '456', comment: 'Hi there again', created: {}, likes: [] },
        ],
        isSpinning: false,
    };

    _setPostsFetchingState = (state) => {
        this.setState({
            isSpinning: state,
        });
    }

    _createPost = async (comment) => {
        this._setPostsFetchingState(true);

        const post = {
            id:      getUniqueID(),
            created: moment.utc(),
            comment,
            likes:   [],
        };

        await delay(1200);

        this.setState(({ posts }) => ({
            posts:           [ post, ...posts ],
            isSpinning: false,
        }));
    }

    _likePost = async (id) => {
        const { currentUserFirstName, currentUserLastName } = this.props;
        const { posts } = this.state;

        this._setPostsFetchingState(true);

        await delay(1200);

        const newPosts = posts.map((post) => {
            if (post.id === id) {
                return {
                    ...post,
                    likes: [
                        {
                            id:        getUniqueID(),
                            firstName: currentUserFirstName,
                            lastName:  currentUserLastName,
                        },
                    ],
                };
            }

            return post;
        });

        this.setState({
            posts:           newPosts,
            isSpinning: false,
        });
    }

    _removePost = async (id) => {
        const { posts } = this.state;

        this._setPostsFetchingState(true);

        await delay(1200);

        //const updatePosts = posts.filter((post) => post.id !== id);

        this.setState({
            posts:           posts.filter((post) => post.id !== id),
            isSpinning: false,
        });
    }

    render() {
        const { posts, isSpinning } = this.state;

        const postsJSX = posts.map((post) => {
            return (
                <Post
                    key = { post.id }
                    { ...post }
                    _likePost = { this._likePost }
                    _removePost = { this._removePost }
                />
            );
        });

        return (
            <>
                <section className = { Styles.feed }>
                    <Spinner isSpinning = { isSpinning } />
                    <StatusBar />
                    <Composer _createPost = { this._createPost } />
                    {postsJSX}
                </section>
            </>
        );
    }
}
