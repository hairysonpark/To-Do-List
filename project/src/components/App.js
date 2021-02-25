import React from 'react';
import ReactDOM from 'react-dom';

import Header from './Header';
import Card from './Card';

class App extends React.Component {
    render() {
        return (
            <div>
                <Header />
                <div className="ui four column doubling stackable grid container">
                    <Card />
                    <Card />
                </div>
            </div>
        )
    }
}

export default App;