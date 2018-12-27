// Core
import React, { Component } from 'react';
import cx from 'classnames';
import { Transition } from 'react-transition-group';
import { fromTo } from 'gsap';
import { Link } from 'react-router-dom';

// Components
import { withProfile } from 'components/HOC/withProfile';

//Instruments
import Styles from './styles.m.css';
import { socket } from 'socket/init';

@withProfile
class StatusBar extends Component {
    state = {
        online: false,
    };

    componentDidMount () {
        socket.on('connect', () => {
            this.setState({
                online: true,
            });
        });

        socket.on('disconnect', () => {
            this.setState({
                online: false,
            });
        });
    }

    componentWillUnmount () {
        socket.removeListener('connect');
        socket.removeListener('disconnect');
    }

    _animateStatusBarEnter = (statusBar) => {
        fromTo(
            statusBar,
            1,
            { opacity: 0, y: -50 },
            { opacity: 1, y: 0 },
        );
    };

    _logout = () => {
        // const { _logout } = 

        this.props._logout();
    }

    // _getlogout= () => {
    //     const { isAthenticated } = this.props;

    //     return isAthenticated
    //         ? (
    //             //<button onClick = { this._logout } >Sign out</button>
    //             <div
    //                 className = { Styles.logout }
    //                 onClick = { this._logout }>
    //                 Sign out
    //             </div>
    //         ) : null;
    // };

    render() {
        const {
            avatar,
            currentUserFirstName,
            _logout,
        } = this.props;
        const { online } = this.state;
        const { isAthenticated } = this.props;

        console.log('StatusBar this.props.isAthenticated: ', isAthenticated);

        const statusStyle = cx(Styles.status, {
            [ Styles.online ]:  online,
            [ Styles.offline ]: !online,
        });

        const statusMessage = online ? 'Online' : 'Offline';
        //console.log(this.props);
        //const logout = this._getlogout();

        return (
            <Transition
                appear
                in
                timeout = { 1000 }
                onEnter = { this._animateStatusBarEnter }>
                <section className = { Styles.statusBar }>
                    <div className = { statusStyle }>
                        <div>{statusMessage}</div>
                        <span />
                    </div>
                    { isAthenticated &&
                            <>
                                <Link to = '/profile'>
                                    <img src = { avatar }/>
                                    <span>{ currentUserFirstName }</span>
                                </Link>
                                <Link to = '/feed'>Feed</Link>
                                <div
                                    className = { Styles.logout }
                                    onClick = { this._logout }>
                                    Sign out
                                </div>
                            </>
                    }
                </section>
            </Transition>
        );
    }
}

export default StatusBar;
