import { createSlice } from '@reduxjs/toolkit';

import { findSelect } from '../../../../app-zonecl-agricontrol/services/contratistasService';

export const contratistasSlice = createSlice({
	name: 'contratistas',
	initialState: {
		listSelect: [],
	},
	reducers: {
		setContratistasListSelect: (state, action) => {
			state.listSelect = action.payload;
		},
	},
});

export const { setContratistasListSelect } = contratistasSlice.actions;

export default contratistasSlice.reducer;

export const fetchContratistas = () => (dispatch) => {
	findSelect().call.then((response) => {
		dispatch(setContratistasListSelect(response.data));
	});
};
