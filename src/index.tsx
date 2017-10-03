import * as React from 'react';
import * as ReactDOM from 'react-dom';

import { createStore } from 'redux';
import reducers from './reducers';
import { Provider } from 'react-redux';

import AppContainer from './containers/AppContainer';

const store = createStore(reducers);

console.log('Store: ', store.getState());

ReactDOM.render(
	<Provider store={store}>
		<AppContainer />
	</Provider>,
	document.getElementById('app'),
);
