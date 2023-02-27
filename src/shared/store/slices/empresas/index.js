import { createSlice } from '@reduxjs/toolkit';

import { getAll } from '../../../../app-zonecl-agricontrol/services/empresasService';

export const empresasSlice = createSlice({
	name: 'empresas',
	initialState: {
		listSelect: [],
		list: [],
	},
	reducers: {
		setEmpresasSelect: (state, action) => {
			state.listSelect = action.payload;
		},
		setEmpresasList: (state, action) => {
			state.list = action.payload;
		},
	},
});

export const { setEmpresasSelect, setEmpresasList } = empresasSlice.actions;

export default empresasSlice.reducer;

export const fetchEmpresas = () => (dispatch) => {
	getAll().call.then((response) => {
		dispatch(setEmpresasSelect(response.data));
	});
};
