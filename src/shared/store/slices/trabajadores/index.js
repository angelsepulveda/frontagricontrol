import { createSlice } from '@reduxjs/toolkit';

import { getAll } from '../../../../app-zonecl-agricontrol/services/trabajadoresService';

export const trabajadoresSlice = createSlice({
	name: 'trabajadores',
	initialState: {
		listSelect: [],
		list: [],
	},
	reducers: {
		seTrabajadoresSelect: (state, action) => {
			state.listSelect = action.payload;
		},
		setTrabajadoresList: (state, action) => {
			state.list = action.payload;
		},
	},
});

export const { setTrabajadoresSelect, setTrabajadoresList } =
	trabajadoresSlice.actions;

export default trabajadoresSlice.reducer;

export const fetchTrabajadores = () => (dispatch) => {
	getAll().call.then((response) => {
		dispatch(setTrabajadoresSelect(response.data));
	});
};
