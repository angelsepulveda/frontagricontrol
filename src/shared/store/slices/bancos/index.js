import { createSlice } from '@reduxjs/toolkit';

import { getAll } from '../../../../app-zonecl-comun/services/bancosService';

export const bancosSlice = createSlice({
	name: 'bancos',
	initialState: {
		listSelect: [],
	},
	reducers: {
		setBancosList: (state, action) => {
			state.listSelect = action.payload;
		},
	},
});

export const { setBancosList } = bancosSlice.actions;

export default bancosSlice.reducer;

export const fetchBancos = () => (dispatch) => {
	getAll().call.then((response) => {
		dispatch(setBancosList(response.data));
	});
};
