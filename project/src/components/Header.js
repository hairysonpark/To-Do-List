import React from 'react';

class Header extends React.Component {
    render() {
        return (
            <div className="ui secondary pointing menu">
                <a href="/" className="item">
                    <div>
                        <i class="list icon"></i>
                        To Do List
                    </div>
                </a>
            </div>
        )
    }
}

export default Header;