import { createSlice } from '@reduxjs/toolkit';

import { getAll } from '../../../../app-zonecl-comun/services/sexosService';

export const sexosSlice = createSlice({
	name: 'estados',
	initialState: {
		listSelect: [],
	},
	reducers: {
		setSexosList: (state, action) => {
			state.listSelect = action.payload;
		},
	},
});

export const { setSexosList } = sexosSlice.actions;

export default sexosSlice.reducer;

export const fetchSexos = () => (dispatch) => {
	getAll().call.then((response) => {
		dispatch(setSexosList(response.data));
	});
};
