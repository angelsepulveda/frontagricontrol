import { createSlice } from '@reduxjs/toolkit';

import { getAll } from '../../../../app-zonecl-comun/services/estadosCivilesService';

export const estadosCivilesSlice = createSlice({
	name: 'estadosCiviles',
	initialState: {
		listSelect: [],
	},
	reducers: {
		setEstadosCivilesList: (state, action) => {
			state.listSelect = action.payload;
		},
	},
});

export const { setEstadosCivilesList } = estadosCivilesSlice.actions;

export default estadosCivilesSlice.reducer;

export const fetchEstadosCiviles = () => (dispatch) => {
	getAll().call.then((response) => {
		dispatch(setEstadosCivilesList(response.data));
	});
};
