import { actions } from './actions';

export const defaultReducer = (state, action) => state;

export const wizardReducer = (state, action) => {
	const { activePageIndex } = state;

	switch (action.type) {
		case actions.NEXT_PAGE:
			return { ...state, activePageIndex: activePageIndex + 1 };
		case actions.PREV_PAGE:
			return { ...state, activePageIndex: activePageIndex - 1 };
		case actions.SET_STEPS:
			return { ...state, steps: action.payload };
		default:
			return state;
	}
};

export const combinReducer =
	(...reducers) =>
	(state, action) => {
		return reducers.reduce((acc, nextReducer) => {
			return nextReducer(acc, action);
		}, state);
	};
