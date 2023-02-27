import { createSlice } from '@reduxjs/toolkit';

import estadosService from '../../../../app-zonecl-comun/services/estadosService';

export const estadosSlice = createSlice({
	name: 'estados',
	initialState: {
		list: [],
	},
	reducers: {
		setEstadosList: (state, action) => {
			state.list = action.payload;
		},
	},
});

export const { setEstadosList } = estadosSlice.actions;

export default estadosSlice.reducer;

export const fetchEstados = () => (dispatch) => {
	estadosService.getAll().then((response) => {
		dispatch(setEstadosList(response));
	});
};
