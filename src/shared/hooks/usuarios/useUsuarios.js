import CustomStore from 'devextreme/data/custom_store';
import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';

import useCampos from '../../../app-zonecl-agricontrol/hooks/useCampos';
import usuariosService from '../../services/usuariosService';
import { fetchProductores } from '../../store/slices/productores';
import { getOneUser } from '../../store/slices/users';

const useUsuarios = () => {
	const roles = [
		{ id: 0, nombre: 'SuperAdmin' },
		{ id: 1, nombre: 'Administrador' },
		{ id: 2, nombre: 'Usuario' },
	];
	const navigate = useNavigate();
	const [usuariosStore, setUsuariosStore] = useState([]);
	const { campos, loadCampos } = useCampos();
	const [passwordMode, setPasswordMode] = useState('password');
	const [buttonAddGrid, setButtonAddGrid] = useState({});
	const { listSelect: productores } = useSelector((state) => state.productores);

	const [user, setUser] = useState({});
	const dispatch = useDispatch();

	const loadUser = () => {
		const dataUser = localStorage.getItem('user');
		const userObject = JSON.parse(dataUser);
		setUser(userObject);
	};

	const cellTemplate = (container, options) => {
		const noBreakSpace = '\u00A0';
		const text = (options.value || [])
			.map((element) => options.column.lookup.calculateCellValue(element))
			.join(', ');
		container.textContent = text || noBreakSpace;
		container.title = text;
	};

	const loadData = async () => {
		try {
			setButtonAddGrid({
				location: 'after',
				widget: 'dxButton',
				options: {
					icon: 'add',
					onClick: () => {
						dispatch(getOneUser(null));
						navigate('/usuarios/nuevo');
					},
				},
			});
			setUsuariosStore(
				new CustomStore({
					key: 'userId',
					load: () => usuariosService.getAllUserCampos(),
					insert: (values) => usuariosService.insert(values),
					update: (key, values) => usuariosService.update(key, values),
					remove: (key) => usuariosService.del(key),
				}),
			);
			await loadCampos();
			dispatch(fetchProductores());
		} catch (error) {
			console.log('Mi error', error);
		}
	};

	const calculateFilterExpression = (
		filterValue,
		selectedFilterOperation,
		target,
	) => {
		if (target === 'search' && typeof filterValue === 'string') {
			return [this.dataField, 'contains', filterValue];
		}
		return function (data) {
			return (data.campo || []).indexOf(filterValue) !== -1;
		};
	};

	return {
		user,
		loadUser,
		loadData,
		productores,
		usuariosStore,
		roles,
		campos,
		calculateFilterExpression,
		cellTemplate,
		setPasswordMode,
		passwordMode,
		buttonAddGrid,
		navigate,
	};
};

export default useUsuarios;
