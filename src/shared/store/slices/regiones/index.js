import { createSlice } from '@reduxjs/toolkit';

import { findSelect } from '../../../../app-zonecl-agricontrol/services/regionesService';

export const regionesSlice = createSlice({
	name: 'regiones',
	initialState: {
		listSelect: [],
	},
	reducers: {
		setRegionesListSelect: (state, action) => {
			state.listSelect = action.payload;
		},
	},
});

export const { setRegionesListSelect } = regionesSlice.actions;

export default regionesSlice.reducer;

export const fetchRegiones = () => (dispatch) => {
	findSelect().call.then((response) => {
		dispatch(setRegionesListSelect(response.data));
	});
};
