import { createSlice } from '@reduxjs/toolkit';

import { getAll } from '../../../../app-zonecl-agricontrol/services/camposService';

export const camposSlice = createSlice({
	name: 'campos',
	initialState: {
		listSelect: [],
	},
	reducers: {
		setCamposListSelect: (state, action) => {
			state.listSelect = action.payload;
		},
	},
});

export const { setCamposListSelect } = camposSlice.actions;

export default camposSlice.reducer;

export const fetchCampos = () => (dispatch) => {
	getAll().call.then((response) => {
		dispatch(setCamposListSelect(response.data));
	});
};
