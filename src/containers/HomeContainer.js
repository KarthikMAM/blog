import React from 'react';

import { AboutContainer } from './AboutContainer';
import {
  Home,
  Error
} from '../components';

export class HomeContainer extends AboutContainer {
  render() {
    return this.state.err === null ?
      <Home {...this.state.about} /> :
      <Error content={"Error: " + JSON.stringify(this.state.err)} />;
  }
}