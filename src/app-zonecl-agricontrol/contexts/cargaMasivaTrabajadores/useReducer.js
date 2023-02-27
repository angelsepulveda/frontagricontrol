export const reducer = (state, action) => {
	switch (action.type) {
		case 'LOAD_CUADRILLAS':
			return { ...state, cuadrillas: action.payload };
		case 'LOAD_CONTRATISTAS':
			return { ...state, contratistas: action.payload };
		case 'LOAD_SEXOS':
			return { ...state, sexos: action.payload };
		case 'LOAD_TRABAJADORES':
			return { ...state, trabajadores: action.payload };
		case 'ADD_BUTTON':
			return { ...state, addButton: action.payload };
		case 'ERROR_MESSAGE':
			return { ...state, errorMessage: action.payload };
		default:
			return state;
	}
};
