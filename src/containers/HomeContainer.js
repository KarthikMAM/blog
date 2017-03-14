import React from "react";

import { AboutContainer } from "./AboutContainer";
import {
  Home
} from "../components";

export class HomeContainer extends AboutContainer {
  render() {
    return this.state.about === undefined ? null : <Home {...this.state.about} />;
  }
}