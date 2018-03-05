import React, {Component} from 'react';
import {connect} from 'react-redux';
import Plotly from "plotly.js";

/*
 * We need "if(!this.props.user)" because we set state to null by default
 * */

class UserDetail extends Component {
    buildSangerSequence(sequenceLength=100) {
        let sequence = {};
        const C = 'c';
        const T = 't';
        const A = 'a';
        const G = 'g';
        const NUCLEOTIDES = [C, T, A, G];

        NUCLEOTIDES.forEach( nucleotide => {
            sequence[nucleotide] = {
                x: [],
                y: []
            };
        });

        for (let basePair = 1; basePair < sequenceLength; basePair++) {
            let singleRead = this.buildSingleRead(NUCLEOTIDES, basePair);

            for (let key in singleRead) {
                if (sequence[key]) {
                    sequence[key].x.push(...singleRead[key].x);
                    sequence[key].y.push(...singleRead[key].y);
                }
            }
        }
        return sequence;
    }

    buildSingleRead(nucleotides, basePair) {
        var singleRead = {};
        let randomNucleotideIndex = Math.floor(Math.random() * nucleotides.length);
        let readNucleotide = nucleotides[randomNucleotideIndex];
        nucleotides.forEach(nulceotide => {
            if (nulceotide === readNucleotide) {
                let randomPeakHeight = (100 - Math.ceil(Math.random() * 30)) / 100;
                // TODO: the lastY value should be better than just the default value
                singleRead[nulceotide] = this.buildPeak(basePair, randomPeakHeight);
            } else {
                singleRead[nulceotide] = this.buildPeak(basePair, 0);
            }
        });
        return singleRead;
    }

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
        let sequence = this.buildSangerSequence();
        let cytosine = {
            x: sequence.c.x,
            y: sequence.c.y,
            mode: 'lines',
            line: {
                color: 'rgb(0, 0, 300)',
            },
            name: 'Cytosine'
        };
        let thymine = {
            x: sequence.t.x,
            y: sequence.t.y,
            mode: 'lines',
            line: {
                color: 'rgb(300, 0, 0)',
            },
            name: 'Thymine'
        };
        let adenine = {
            x: sequence.a.x,
            y: sequence.a.y,
            line: {
                color: 'rgb(0, 300, 0)',
            },
            mode: 'lines',
            name: 'Adenine'
        };
        let guanine = {
            x: sequence.g.x,
            y: sequence.g.y,
            line: {
                color: 'rgb(0, 0, 0)',
            },
            mode: 'lines',
            name: 'Guanine'
        };

        let data = [cytosine, thymine, adenine, guanine];

        let layout = {
          title: 'Sanger Sequence',
          xaxis: {
            title: 'Base Pair',
            // showgrid: false,
            // zeroline: false
          },
          yaxis: {
            title: 'Peak Height',
            // showline: false
          }
        };

        Plotly.newPlot('electroPherogram', data, layout);
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
