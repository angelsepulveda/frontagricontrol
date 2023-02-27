import { createSlice } from '@reduxjs/toolkit';

import { findSelect } from '../../../../app-zonecl-agricontrol/services/especiesService';

export const especiesSlice = createSlice({
	name: 'especies',
	initialState: {
		listSelect: [],
	},
	reducers: {
		setEspeciesList: (state, action) => {
			state.listSelect = action.payload;
		},
	},
});

export const { setEspeciesList } = especiesSlice.actions;

export default especiesSlice.reducer;

export const fetchEspecies = () => (dispatch) => {
	findSelect().call.then((response) => {
		dispatch(setEspeciesList(response.data));
	});
};
