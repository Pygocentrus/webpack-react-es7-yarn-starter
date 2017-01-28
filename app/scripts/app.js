import React from 'react';
import { render } from 'react-dom';

console.log('ENV:', __ENV__);

require.ensure([], (require) => {
  const utils = require('./utils');
  utils.sayHi();
});

const App = () =>
  <h1>Webpack Yarn React ES7 starter kit</h1>;

render(<App />, document.getElementById('app'));
