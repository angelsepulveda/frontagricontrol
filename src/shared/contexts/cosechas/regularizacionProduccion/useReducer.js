export const reducer = (state, action) => {
	switch (action.type) {
		case 'PRODUCCION_FETCHED':
			return { ...state, produccionData: action.payload };

		case 'PRODUCCION_BACK':
			return { ...state, produccionData: action.payload };

		case 'LOAD_CAMPOS':
			return { ...state, campos: action.payload };

		case 'LOAD_CUARTELES':
			return { ...state, cuarteles: action.payload };

		case 'LOAD_CUADRILLAS':
			return { ...state, cuadrillas: action.payload };

		case 'LOAD_TRABAJADORES':
			return { ...state, trabajadores: action.payload };

		case 'LOAD_CONTRATISTAS':
			return { ...state, contratistas: action.payload };

		case 'LOAD_EQUIPOS':
			return { ...state, equipos: action.payload };

		case 'LOAD_FORMATOS_COSECHAS':
			return { ...state, formatoCosechas: action.payload };

		case 'LOAD_VARIEDADES':
			return { ...state, variedades: action.payload };

		case 'LOAD_CALIDADES':
			return { ...state, calidades: action.payload };

		case 'LOAD_SECTORES':
			return { ...state, sectores: action.payload };

		case 'LOAD_ESPECIES':
			return { ...state, especies: action.payload };

		default:
			return state;
	}
};
