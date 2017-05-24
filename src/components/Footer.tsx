import * as React from 'react';

import Heart from './Heart';

export default class Footer extends React.Component<{}, null> {
    render() {
        const styles = {
            typoAccent: {
                fontFamily: '\'Roboto\', sans-serif'
            }
        };

        return (
            <footer style={styles}>
                <p>
                    Inspired by <a target="_blank" href="https://www.youtube.com/watch?v=ACmydtFDTGs">Silcon Valley</a>.
                    Powered by the <a target="_blank" href="https://www.customvision.ai">Custom Vision API</a>.
                    Free and <a target="_blank" href="https://github.com/bengreenier/what-food">open source</a>.
                    Made with <Heart/> by the <a target="_blank" href="https://github.com/CatalystCode">PCT</a> team.
                </p>
            </footer>
        );
    }
}