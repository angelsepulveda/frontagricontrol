import { createSlice } from '@reduxjs/toolkit';

import { getAll } from '../../../../app-zonecl-agricontrol/services/cajaCompensacionesService';

export const cajasCompensacionesSlice = createSlice({
	name: 'cajasCompensaciones',
	initialState: {
		listSelect: [],
	},
	reducers: {
		setCajasCompensacionesListSelect: (state, action) => {
			state.listSelect = action.payload;
		},
	},
});

export const { setCajasCompensacionesListSelect } =
	cajasCompensacionesSlice.actions;

export default cajasCompensacionesSlice.reducer;

export const fetchCajasCompensaciones = () => (dispatch) => {
	getAll().call.then((response) => {
		dispatch(setCajasCompensacionesListSelect(response.data));
	});
};
