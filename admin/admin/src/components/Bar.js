import React, { Component } from 'react';

import Menu from './Menus';
import Staff from './AddStaff';


class Bar extends Component {

    constructor (props) {
        super(props);
        this.state = {
            bar: []
        }
    }


    render() {

        return (
            <div>
                <Menu getUser={this.props.getUser} menus={[...this.props.user.bars.filter(bar => bar._id === this.props.match.params.barid)]} />
                <Staff getUser={this.props.getUser} staff={[...this.props.user.bars.filter(bar => bar._id === this.props.match.params.barid)]} />
            </div>
        )

    }

}

export default Bar;