import React, {Component} from 'react';
import {connect} from 'react-redux';
import Plotly from "plotly.js";

/*
 * We need "if(!this.props.user)" because we set state to null by default
 * */

class UserDetail extends Component {
    buildPeak(xStart, peakHeight=1, lastY=0, resolution=6) {
        let xValues = [];
        let yValues = [];
        for (var i = 1; i <= resolution; i++) {
            let xValue = xStart + i / resolution;

            let diffFromPeakHeight = peakHeight - lastY;

            let targetY;
            let yValue;
            if (i < resolution / 2) {
                yValue = this.calculateYValue(lastY, peakHeight);
            } else if (i > resolution / 2 && i !== resolution) {
                yValue = this.calculateYValue(lastY, 0);

            } else if (i === resolution / 2) {
                yValue = peakHeight;
            } else {
                yValue = 0;
            }
            lastY = yValue;

            xValues.push(xValue);
            yValues.push(yValue);
        }

        return {
            x: xValues,
            y: yValues
        }
    }

    calculateYValue(lastY, targetY) {
        let diff = targetY - lastY;
        return lastY + diff / 2
    }

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

        var el = this.buildPeak(1);
        console.log(el);
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
