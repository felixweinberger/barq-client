import React, { Component } from 'react';

import Menu from './Menus';
import Staff from './AddStaff';


class Bar extends Component {

    constructor (props) {
        super(props);
        this.state = {
            bar: {}
        }
    }

    componentDidMount() {
        this.setBarToState();
    }

    setBarToState = () => {
        const id = this.props.match.params.barid;
        const bar = this.props.bars.find(bar => bar._id == id)
        this.setState({ bar })
    }


    render() {

        return (
            <div>
                <Menu menus={this.props.bars[0]} />
                <Staff staff={this.props.bars[0].staff} />
            </div>
        )

    }

}

export default Bar;