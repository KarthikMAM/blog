import React from 'react';
import ReactDOM from 'react-dom';

import {Home, About, Payload} from './containers';
import './styles';

ReactDOM.render(
  <Payload {...{
    payloadType: 'projects',
    query: 'vallie-eichmann'
  }}/>,
  document.getElementById('root')
);