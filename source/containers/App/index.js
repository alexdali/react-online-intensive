// Core
import React, { Component } from 'react';
import { hot } from 'react-hot-loader';

import { Transition } from 'react-transition-group';
import { TweenMax } from 'gsap';

//Components
import Catcher from 'components/Catcher';
import Feed from 'components/Feed';
import { Provider } from 'components/HOC/withProfile';

// Instruments
import avatar from 'theme/assets/Lisa';

const  options = {
    avatar,
    currentUserFirstName: 'Алексей',
    currentUserLastName:  'Тасбауов',
};



@hot(module)
export default class Room extends Component {
    state = {
       isFetching: true,
    };

_throwBall = () => {
    this.setState(({ isFetching }) => ({
        isFetching: !isFetching,
    }));
};

_handleEnter = elelemnt => {
    TweenMax.fromTo(elelemnt, 3, { y: 200, opacity: 0 }, { y: 0,
   opacity: 1 });
};

_handleExit = elelemnt => {
    TweenMax.fromTo(elelemnt, 3, { y: 0, opacity: 1 }, { y: -300,
   opacity: 0 });
};

render() {
    return (
        <>
            <Transition
                in = { this.state.isFetching }
                timeout = { 5000 }
                onEnter = { this._handleEnter }
                onExit = { this._handleExit }
            >
            <div
                style = { {
                    width: 100,
                   height: 100,
                   backgroundColor: 'red',
                   position: 'absolute',
                   top: '50%',
                   right: '50%',
                   borderRadius: '50%',
                } }
            />
            </Transition>
            <button onClick = { this._throwBall }>Fetch!</button>
        </>
    );
}
}

// export default class App extends Component {
//     render() {
//         return (
//             <Catcher>
//                 <Provider value = { options }>
//                     <Feed />;
//                 </Provider>
//             </Catcher>
//         );
//     }
// }
