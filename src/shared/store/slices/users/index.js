import { createSlice } from '@reduxjs/toolkit';

import usuariosService from '../../../services/usuariosService';
export const trabajadoresSlice = createSlice({
	name: 'users',
	initialState: {
		listSelect: [],
		list: [],
		user: null,
	},
	reducers: {
		setUsersSelect: (state, action) => {
			state.listSelect = action.payload;
		},
		setUsersList: (state, action) => {
			state.list = action.payload;
		},
		setUser: (state, action) => {
			state.user = action.payload;
		},
	},
});

export const { setUsersSelect, setUsersList, setUser } =
	trabajadoresSlice.actions;

export default trabajadoresSlice.reducer;

export const fetchUsers = () => (dispatch) => {
	usuariosService.getAll().then((response) => {
		dispatch(setUsersSelect(response.data));
	});
};

export const getOneUser = (id) => (dispatch) => {
	if (id === null) {
		dispatch(
			setUser({
				codProductor: null,
				name: null,
				email: null,
				password: null,
				campos: [],
				role: null,
			}),
		);
	} else {
		usuariosService.getOne(id).then((response) => {
			dispatch(setUsersSelect(response.data));
		});
	}
};
