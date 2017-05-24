import * as React from 'react';
import * as PropTypes from 'prop-types';
import { Route, RouterChildContext } from 'react-router-dom';
import {LoadingBar} from 'react-redux-loading-bar';

import Footer from './Footer';
import {default as Main, MainArguments} from './Main';
import {default as Results, ResultsArguments, ResultsProbability} from './Results';
import {default as Train, TrainArguments, TrainResult} from './Train';
import Done from './Done';

import '../App.css';

interface AppState extends ResultsArguments, TrainArguments, MainArguments {
  loading: number;
}

export default class App extends React.Component<{}, AppState> {
  static contextTypes = {
    router: PropTypes.object.isRequired
  };

  /* tslint:disable-next-line */
  constructor(props: {}, context: RouterChildContext<any>) {
    super(props, context);

    this.state = {
      loading: 0,
      imageData: undefined,
      probabilities: undefined,
      onImageSelected: this.onImageSelected.bind(this),
      onProbabilitiesRetrieved: this.onProbabilitiesRetrieved.bind(this),
      onTagProvided: this.onTagProvided.bind(this),
      onImageTrained: this.onImageTrained.bind(this)
    };
  }

  componentDidMount() {
    // this logic prevents navigating to other parts of the app (other than /)
    // without following the proper app flow (namely if no pic is uploaded)
    const pathname: String = this.context.router.route.location.pathname;
    if (!this.state.imageData && pathname !== '/') {
      this.context.router.history.push('/');
    }
  }

  render() {
    return (
        <div className="App">
          <header>
            <LoadingBar style={{ backgroundColor: '#009CF3', height: '5px' }} loading={this.state.loading} />
          </header>
          <section>
            <Route exact={true} path="/" render={props => (
              <Main onImageSelected={this.state.onImageSelected}
                onProbabilitiesRetrieved={this.state.onProbabilitiesRetrieved} />
            )}/>
            <Route exact={true} path="/upload" render={props => (
              <Results probabilities={this.state.probabilities} />
              )}/>
            <Route exact={true} path="/failed" render={props => (
              <Train imageData={this.state.imageData}
                onImageTrained={this.state.onImageTrained}
                onTagProvided={this.state.onTagProvided} />
            )}/>
            <Route exact={true} path="/done" component={Done} />
          </section>
          <Footer />
        </div>
    );
  }

  showLoading() {
    this.setState({
      loading: 1
    });
  }

  hideLoading() {
    this.setState({
      loading: 0
    });
  }

  /* tslint:disable-next-line */
  onImageSelected(err: any, imageData: Blob) {
    if (err) {
      throw err;
    } else {
      this.showLoading();

      this.setState({
        imageData: imageData
      });
    }
  }

  /* tslint:disable-next-line */
  onProbabilitiesRetrieved(err: any, probabilities: ResultsProbability[]) {
    if (err) {
      throw err;
    } else {
      this.hideLoading();

      this.context.router.history.push('/upload');
      this.setState({
        probabilities: probabilities
      });
    }
  }

  /* tslint:disable-next-line */  
  onTagProvided(err: any, tagData: String) {
    if (err) {
      throw err;
    } else {
      this.showLoading();
    }
  }

  /* tslint:disable-next-line */
  onImageTrained(err: any, result: TrainResult) {
    if (err) {
      throw err;
    } else {
      this.hideLoading();

      this.context.router.history.push('/done');
    }
  }
}