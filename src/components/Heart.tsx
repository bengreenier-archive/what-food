import * as React from 'react';

interface HeartArguments {
    color?: string;
}

export default class Heart extends React.Component<HeartArguments, HeartArguments> {
    constructor(props: HeartArguments) {
        super(props);

        this.state = {
            color: props.color || '#C12127'
        };
    }

    render() {
        const styles = {
            color: this.state.color
        };

        return (
            <span style={styles}>&#9829;</span>
        );
    }
}