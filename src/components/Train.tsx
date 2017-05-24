import * as React from 'react';
import * as request from 'superagent';

/* tslint:disable-next-line */
const myPredictionServiceUrl = 'https://what-food.azurewebsites.net/train';

export interface TrainResult {
    sourceUrl: String;
    id: String;
    status: String;
}

/* tslint:disable */
export interface TrainArguments {
    imageData?: Blob;
    onImageTrained: { (err: any, results?: TrainResult): void };
    onTagProvided: { (err: any, tagData?: String): void };
}
/* tslint:enable */

export default class Train extends React.Component<TrainArguments, undefined> {
    constructor(props: TrainArguments) {
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
            input: {
                backgroundColor: 'transparent',
                borderStyle: 'solid', 
                borderWidth: '0px 0px 1px 0px', 
                borderColor: '#009CF3',
                fontSize: 'inherit',
                width: '50%'
            },
            hidden: {
                display: 'none'
            }
        };

        const boundTrainKeyUp = this.trainKeyUp.bind(this);
        const boundTrainSubmitted = this.trainSubmited.bind(this);

        return (
            <h1 style={styles.typoMain}>
                Darn. Why not help us <span className="accent">learn</span>?! <br />
                <small style={styles.typoAccent}>
                    What is it?
                    <input type="text" id="train" style={styles.input} placeholder="pie" onKeyUp={boundTrainKeyUp}/>
                    <button id="train-button" onClick={boundTrainSubmitted} style={styles.hidden}>
                        Submit
                    </button>
                </small>
            </h1>
        );
    }

    /* tslint:disable-next-line */
    trainKeyUp(evt: any) {
        const elem = document.getElementById('train') as HTMLInputElement;
        if (elem != null) {
            if (elem.value.length > 0) {
                this.showSubmit();
            } else {
                this.hideSubmit();
            }
        }
        if (evt.which === 13) {
            this.trainSubmited();
        }
    }

    showSubmit() {
        const elem = document.getElementById('train-button');
        if (elem != null) {
            elem.style.display = 'inherit';
        }
    }

    hideSubmit() {
        const elem = document.getElementById('train-button');
        if (elem != null) {
            elem.style.display = 'none';
        }
    }

    trainSubmited() {
        const elem = document.getElementById('train') as HTMLInputElement;
        if (elem != null && elem.value.length > 0 && this.props.imageData) {

            this.props.onTagProvided(null, elem.value);

            request
                .post(`${myPredictionServiceUrl}?tag=${elem.value}`)
                .set('Content-Type', 'application/octet-stream')
                .send(this.props.imageData)
                .then(
                    (res) => {
                        this.props.onImageTrained(null, {
                            sourceUrl: res.body.SourceUrl,
                            id: res.body.Image.Id,
                            status: res.body.Status
                        });
                    },
                    (err) => {
                        this.props.onImageTrained(err);
                    });
        }
    }
}