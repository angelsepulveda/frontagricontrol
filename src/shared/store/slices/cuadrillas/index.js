import { createSlice } from '@reduxjs/toolkit';

import { getAll } from '../../../../app-zonecl-agricontrol/services/cuadrillasService';

export const cuadrillasSlice = createSlice({
	name: 'cuadrillas',
	initialState: {
		listSelect: [],
		list: [],
	},
	reducers: {
		setCuadrillasSelect: (state, action) => {
			state.listSelect = action.payload;
		},
		setCuadrillasList: (state, action) => {
			state.list = action.payload;
		},
	},
});

export const { setCuadrillasSelect, setCuadrillasList } =
	cuadrillasSlice.actions;

export default cuadrillasSlice.reducer;

export const fetchCuadrillas = () => (dispatch) => {
	getAll().call.then((response) => {
		dispatch(setCuadrillasSelect(response.data));
	});
};
