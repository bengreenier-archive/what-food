import * as React from 'react';
import { Link } from 'react-router-dom';

export interface ResultsProbability {
    probability: Number;
    tag: String;
}

export interface ResultsArguments {
    probabilities?: ResultsProbability[]; 
}

export default class Results extends React.Component<ResultsArguments, undefined> {
    constructor(props: ResultsArguments) {
        super(props);
    }

    render() {
        const styles = {
            typoMain: {
                fontFamily: '\'Knewave\', cursive',
                fontSize: '100pt'
            },
            typoAccent: {
                fontFamily: '\'Roboto\', sans-serif'
            },
            linkBar: {
                width: '50%',
                margin: 'auto'
            },
            doneLink: {
                float: 'left'
            },
            failLink: {
                float: 'right'
            }
        };

        return (
            <h1 style={styles.typoMain}>
                We're
                <span className="probability accent">
                    {this.formatProb(this.props.probabilities ? this.props.probabilities[0].probability : 0)}%
                </span>
                sure that's a
                <span className="tag accent">
                    {this.props.probabilities ? this.props.probabilities[0].tag : 'food'}
                </span>
                .
                <br />
                <small style={styles.typoAccent}>
                    <div style={styles.linkBar}>
                        <span style={styles.doneLink}>
                            <Link to="/done">Yep</Link>.
                        </span>
                        <span style={styles.failLink}>
                            <Link to="/failed">Nope</Link>.
                        </span>
                    </div>
                    <br />
                </small>
            </h1>
        );
    }

    formatProb(prob: Number): String {
        let tmp = prob.valueOf() * 100;
        let fixed = tmp.toFixed(1);
        if (tmp === Number(fixed)) {
            return tmp.toString();
        } else if (fixed[fixed.length - 1] === '0') {
            return fixed.substr(0, fixed.indexOf('.'));
        } else {
            return fixed;
        }
    }
}