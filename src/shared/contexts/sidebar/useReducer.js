export const reducer = (state, action) => {
	switch (action.type) {
		case 'SET_EXPANDED_MENU':
			return { ...state, expandedMenu: action.payload };

		default:
			return state;
	}
};
