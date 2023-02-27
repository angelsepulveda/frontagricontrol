import { createSlice } from '@reduxjs/toolkit';

import { findSelect } from '../../../../app-zonecl-agricontrol/services/comunasService';

export const comunasSlice = createSlice({
	name: 'comunas',
	initialState: {
		listSelect: [],
	},
	reducers: {
		setComunasListSelect: (state, action) => {
			state.listSelect = action.payload;
		},
	},
});

export const { setComunasListSelect } = comunasSlice.actions;

export default comunasSlice.reducer;

export const fetchComunas = () => (dispatch) => {
	findSelect().call.then((response) => {
		dispatch(setComunasListSelect(response.data));
	});
};
