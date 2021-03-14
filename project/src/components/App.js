import React from 'react';

import Navbar from './Navbar';
import CardGroup from './CardGroup';

class App extends React.Component {
    render() {
        return (
            <div>
                <Navbar />
                <CardGroup />
            </div>
        )
    }
}

export default App;