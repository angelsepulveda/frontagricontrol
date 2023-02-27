import { createSlice } from '@reduxjs/toolkit';

import { getAll } from '../../../../app-zonecl-agricontrol/services/mutualidadesService';

export const mutualidadesSlice = createSlice({
	name: 'mutualidades',
	initialState: {
		listSelect: [],
	},
	reducers: {
		setMutualidadesListSelect: (state, action) => {
			state.listSelect = action.payload;
		},
	},
});

export const { setMutualidadesListSelect } = mutualidadesSlice.actions;

export default mutualidadesSlice.reducer;

export const fetchMutualidades = () => (dispatch) => {
	getAll().call.then((response) => {
		dispatch(setMutualidadesListSelect(response.data));
	});
};
