import React, {Component} from 'react';
import {connect} from 'react-redux';
import Plotly from "plotly.js";

/*
 * We need "if(!this.props.user)" because we set state to null by default
 * */

class UserDetail extends Component {
    componentDidMount() {
        const X_VALUES = [1, 2, 3, 4];
        let cytosine = {
            x: X_VALUES,
            y: [0, 1, 0, 0],
            mode: 'lines',
            line: {
                color: 'rgb(0, 0, 300)',
            },
            name: 'Cytosine'
        };
        let thymine = {
            x: X_VALUES,
            y: [1, 0, 0, 0],
            mode: 'lines',
            line: {
                color: 'rgb(300, 0, 0)',
            },
            name: 'Thymine'
        };
        let adenine = {
            x: X_VALUES,
            y: [0, 0, 0, 1],
            line: {
                color: 'rgb(0, 300, 0)',
            },
            mode: 'lines',
            name: 'Adenine'
        };
        let guanine = {
            x: X_VALUES,
            y: [0, 0, 1, 0],
            line: {
                color: 'rgb(0, 0, 0)',
            },
            mode: 'lines',
            name: 'Guanine'
        };

        var data = [cytosine, thymine, adenine, guanine];
        Plotly.newPlot('electroPherogram', data);
    }

    render() {
        return (
            <div id="electroPherogram">
            </div>
        );
    }
}

// "state.activeUser" is set in reducers/index.js
function mapStateToProps(state) {
    return {
        user: state.activeUser
    };
}

export default connect(mapStateToProps)(UserDetail);
