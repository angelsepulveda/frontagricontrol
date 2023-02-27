import { createSlice } from '@reduxjs/toolkit';

import { findSelect } from '../../../../app-zonecl-agricontrol/services/paisesService';

export const paisesSlice = createSlice({
	name: 'paises',
	initialState: {
		listSelect: [],
	},
	reducers: {
		setPaisesListSelect: (state, action) => {
			state.listSelect = action.payload;
		},
	},
});

export const { setPaisesListSelect } = paisesSlice.actions;

export default paisesSlice.reducer;

export const fetchPaises = () => (dispatch) => {
	findSelect().call.then((response) => {
		dispatch(setPaisesListSelect(response.data));
	});
};
