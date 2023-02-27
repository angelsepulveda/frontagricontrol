import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';

import usuariosService from '../../services/usuariosService';
import { fetchCampos } from '../../store/slices/campos';
import { fetchEstados } from '../../store/slices/estados';
import { fetchProductores } from '../../store/slices/productores';

const rolesSuper = [
	{ id: 0, nombre: 'SuperAdmin' },
	{ id: 1, nombre: 'Administrador' },
	{ id: 2, nombre: 'Usuario' },
];

const rolesAdmin = [
	{ id: 1, nombre: 'Administrador' },
	{ id: 2, nombre: 'Usuario' },
];

const userData = {
	codProductor: null,
	name: null,
	role: null,
	password: null,
	email: null,
	codEstado: null,
	campos: [],
};

const useFormUsuarios = (id) => {
	const { listSelect: campos } = useSelector((state) => state.campos);
	const { list: estados } = useSelector((state) => state.estados);

	const [userLogin, setUserLogin] = useState(null);
	const [url, setUrl] = useState([]);
	const [loading, setLoading] = useState(false);
	const [passwordMode, setPasswordMode] = useState('password');
	const dispatch = useDispatch();
	const { listSelect: productores } = useSelector((state) => state.productores);
	const [roles, setRoles] = useState([]);
	const [userForm, setUserForm] = useState(userData);
	const [userId, setUserId] = useState(null);
	const [password, setPassword] = useState(null);

	const navigate = useNavigate();

	useEffect(() => {
		loadUser(id);
	}, [id]);

	const loadUser = async (id) => {
		setLoading(true);
		if (productores.length <= 0) dispatch(fetchProductores());

		if (campos.length <= 0) dispatch(fetchCampos());

		if (estados.length <= 0) dispatch(fetchEstados());
		setUrl([
			{ name: 'usuarios', url: '/usuarios' },
			{ name: 'nuevo', url: '/usuarios/nuevo' },
		]);
		const dataUser = localStorage.getItem('user');
		const userObject = JSON.parse(dataUser);
		setUserLogin(userObject);
		if (id === undefined) {
			setUserId(null);
			if (userObject && userObject.role === 0) {
				setUserForm(userData);
				setRoles(rolesSuper);
			} else {
				setUserForm({
					codProductor: userObject.codProductor,
					name: null,
					role: null,
					password: null,
					email: null,
					codEstado: null,
					campos: [],
				});
				setRoles(rolesAdmin);
			}
		} else {
			const data = await usuariosService.getOne(id);
			if (userObject && userObject.role === 0) {
				setRoles(rolesSuper);
			} else {
				setRoles(rolesAdmin);
			}
			setUserId(id);
			setPassword(data.password);
			setUserForm({
				codProductor: data.codProductor,
				name: data.name,
				role: data.role,
				password: null,
				email: data.email,
				codEstado: data.isActive,
				campos: data.campos,
			});
		}
		setLoading(false);
	};

	const handleChangeProductor = (e) => {
		setUserForm({ ...userForm, codProductor: e.value });
	};

	const handleChangeUser = (e) => {
		setUserForm({ ...userForm, [e.event.target.name]: e.event.target.value });
	};

	const handleChangeRole = (e) => {
		setUserForm({ ...userForm, role: e.value });
	};

	const handleChangeCampos = (e) => {
		setUserForm({ ...userForm, campos: e.value });
	};

	const handleChangeEstado = (e) => {
		setUserForm({ ...userForm, codEstado: e.value });
	};

	const handleSave = async (e) => {
		e.preventDefault();
		setLoading(true);
		if (userId !== null) {
			await usuariosService.update(userId, {
				codProductor: userForm.codProductor,
				name: userForm.name,
				role: userForm.role,
				password,
				email: userForm.email,
				isActive: userForm.codEstado,
				campos: userForm.campos,
			});
		} else {
			await usuariosService.insert(userForm);
		}
		setLoading(false);
		navigate('/usuarios');
	};

	return {
		userLogin,
		url,
		loading,
		handleChangeProductor,
		productores,
		handleChangeUser,
		passwordMode,
		setPasswordMode,
		roles,
		handleChangeRole,
		userForm,
		handleChangeCampos,
		handleChangeEstado,
		campos,
		estados,
		navigate,
		handleSave,
		userId,
	};
};

export default useFormUsuarios;
