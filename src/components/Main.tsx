import * as React from 'react';
import * as request from 'superagent';

import { ResultsProbability } from './Results';

/* tslint:disable-next-line */
const myPredictionServiceUrl = 'https://what-food.azurewebsites.net/predict';

/* tslint:disable */
export interface MainArguments {
    onImageSelected: { (err: any, imageData?: Blob): void };
    onProbabilitiesRetrieved: { (err: any, probabilities?: ResultsProbability[]): void };
}
/* tslint:enable */

export default class Main extends React.Component<MainArguments, undefined> {
    constructor(props: MainArguments) {
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
            uploadFile: {
                display: 'none'
            }
        };

        const acceptTypes = '.jpg, .png, .jpeg, .gif, .bmp, .tif, .tiff|images/*';

        const boundUploadClicked = this.uploadClicked.bind(this);
        const boundUploadChanged = this.uploadChanged.bind(this);

        return (
            <h1 style={styles.typoMain}>
                What kind of food is <span className="accent">that</span>? <br />
                <small style={styles.typoAccent}>
                    <span className="psuedo-link"
                        id="upload"
                        href=""
                        onClick={boundUploadClicked}>Find out now</span>.
                    <input id="upload-file"
                        type="file"
                        accept={acceptTypes}
                        style={styles.uploadFile}
                        onChange={boundUploadChanged} />
                </small>
            </h1>
        );
    }

    /* tslint:disable-next-line */
    uploadClicked(evt: any) {
        evt.preventDefault();

        let elem = document.getElementById('upload-file') as HTMLInputElement;
        if (elem != null) {
            elem.click();
        }
    }

    uploadChanged() {
        let elem = document.getElementById('upload-file') as HTMLInputElement;
        const changeHandler = () => {
            if (elem != null) {
                elem.removeEventListener('change', changeHandler);

                const files = elem.files;

                if (files != null) {
                    const firstFile = files[0];

                    const fileReader = new FileReader();
                    fileReader.addEventListener('load', () => {
                        const buffer = fileReader.result;

                        this.props.onImageSelected(null, buffer);

                        request
                            .post(myPredictionServiceUrl)
                            .set('Content-Type', 'application/octet-stream')
                            .send(buffer)
                            .then(
                                (res) => {
                                    const predictions: ResultsProbability[] = res.body.Predictions.map(
                                        /* tslint:disable-next-line */
                                        (prediction: any) => {
                                            return {
                                                probability: prediction.Probability,
                                                tag: prediction.Tag
                                            } as ResultsProbability;
                                        });

                                    this.props.onProbabilitiesRetrieved(null, predictions);
                                },
                                (err) => {
                                    this.props.onProbabilitiesRetrieved(err);
                                });
                    });

                    fileReader.readAsArrayBuffer(firstFile);
                }
            }
        };

        changeHandler();
    }
}