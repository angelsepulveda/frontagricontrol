import { createSlice } from '@reduxjs/toolkit';

import cuartelesService from '../../../../app-zonecl-agricontrol/services/cuartelesService';

export const cuartelesSlice = createSlice({
	name: 'cuarteles',
	initialState: {
		listSelect: [],
		list: [],
	},
	reducers: {
		setCuartelesSelect: (state, action) => {
			state.listSelect = action.payload;
		},
		setCuartelesList: (state, action) => {
			state.list = action.payload;
		},
	},
});

export const { setCuartelesSelect, setCuartelesList } = cuartelesSlice.actions;

export default cuartelesSlice.reducer;

export const fetchCuarteles = () => (dispatch) => {
	cuartelesService.getAll().then((response) => {
		dispatch(setCuartelesSelect(response));
	});
};
