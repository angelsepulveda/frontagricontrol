import { createSlice } from '@reduxjs/toolkit';

import productoresService from '../../../services/productoresService';

export const productoresSlice = createSlice({
	name: 'productores',
	initialState: {
		listSelect: [],
	},
	reducers: {
		setProductoresList: (state, action) => {
			state.listSelect = action.payload;
		},
	},
});

export const { setProductoresList } = productoresSlice.actions;

export default productoresSlice.reducer;

export const fetchProductores = () => (dispatch) => {
	productoresService.getAll().then((response) => {
		dispatch(setProductoresList(response));
	});
};
