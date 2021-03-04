import React from 'react';
import ReactDOM from 'react-dom';

import Header from './Header';
import CardGroup from './CardGroup';

class App extends React.Component {
    render() {
        return (
            <div>
                <Header />
                <CardGroup />
            </div>
        )
    }
}

export default App;