import * as React from 'react';
import { Link } from 'react-router-dom';

export default class Done extends React.Component<undefined, undefined> {
    render() {
        const styles = {
            typoMain: {
                fontFamily: '\'Knewave\', cursive',
                fontSize: '100pt'
            },
            typoAccent: {
                fontFamily: '\'Roboto\', sans-serif'
            }
        };

        return (
            <h1 style={styles.typoMain}>
                Cool. Want to try <span className="accent">another</span>? <br />
                <small style={styles.typoAccent}>
                    <Link to="/">Yes</Link>.
                </small>
            </h1>
        );
    }
}