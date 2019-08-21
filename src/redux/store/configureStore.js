import { createStore, applyMiddleware, compose } from 'redux';
import thunkMiddleware from 'redux-thunk';

export default function configureStore(initialState) {
	let createStoreWithMiddleware = compose(
		applyMiddleware(thunkMiddleware),
		window.devToolsExtension ? window.devToolsExtension() : f => f
	)(createStore);

	const reducer = require('../reducers/index').default;
	const store = createStoreWithMiddleware(reducer, initialState);

	if (module.hot) {
		module.hot.accept('../reducers/index', () => {
			store.replaceReducer(require('../reducers/index').default);
		});
	}
	return store;
}
