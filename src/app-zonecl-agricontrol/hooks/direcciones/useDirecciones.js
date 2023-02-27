import { useState } from 'react';

const useDirecciones = () => {
	const [direcciones, setDirecciones] = useState([]);
	const [isRemoveDireccion, setIsRemoveDireccion] = useState(false);
	const [isAddDireccion, setIsAddDireccion] = useState(false);
	const [isDisablePredeterminada, setIsDisablePredeterminada] = useState(false);

	const initDirecciones = (data) => {
		if (data.length > 1) {
			setIsRemoveDireccion(true);
			setIsDisablePredeterminada(false);
		} else {
			setIsDisablePredeterminada(true);
			setIsRemoveDireccion(false);
		}
		setDirecciones(data);
	};

	const handleChangeDireccion = (e) => {
		const key = parseInt(e.event.target.accessKey);

		const newDirecciones = direcciones.map((direccion, index) => {
			if (index === key) {
				return {
					...direccion,
					[e.event.target.name]: e.event.target.value,
				};
			}
			return direccion;
		});

		setDirecciones(newDirecciones);
	};

	const handleChangePredeterminada = (e, indexForm) => {
		const value = e ? 1 : 0;
		const newDirecciones = direcciones.map((direccion, index) => {
			if (index === indexForm) {
				return {
					...direccion,
					predeterminada: value,
				};
			}
			return {
				...direccion,
				predeterminada: 0,
			};
		});

		setDirecciones([...newDirecciones]);
	};

	const handleRemove = (indexDireccion) => {
		if (direcciones.length > 1) {
			const newDirecciones = direcciones.filter((direccion, index) => {
				return index !== indexDireccion;
			});

			if (newDirecciones.length === 1) {
				setIsRemoveDireccion(false);
				setIsDisablePredeterminada(true);
			}

			if (newDirecciones.length <= 5) {
				setIsAddDireccion(true);
			}

			if (newDirecciones.length === 1) {
				const newDireccionesPredeterminada = newDirecciones.map((direccion) => {
					return {
						...direccion,
						predeterminada: 1,
					};
				});

				setDirecciones(newDireccionesPredeterminada);
			} else {
				setDirecciones(newDirecciones);
			}
		}
	};

	const handleButtonRemove = () => {
		if (direcciones.length > 1) {
			setIsRemoveDireccion(true);
		} else {
			setIsRemoveDireccion(false);
		}
	};

	const handleButtonAdd = () => {
		if (direcciones.length < 5) {
			setIsAddDireccion(true);
		} else {
			setIsAddDireccion(false);
		}
	};

	const handleAdd = () => {
		setIsDisablePredeterminada(false);
		if (direcciones.length < 5) {
			const direccion = {
				codDireccion: 0,
				codPais: 0,
				codRegion: 0,
				codComuna: 0,
				ciudad: '',
				codigoPostal: '',
				informacionAdicional: '',
				calle: '',
				apartamento: '',
				numero: '',
				predeterminada: 0,
			};

			const direccionNew = [...direcciones, direccion];

			setDirecciones(direccionNew);

			if (direccionNew.length >= 5) {
				setIsAddDireccion(false);
			}
			setIsRemoveDireccion(true);
		}
	};

	const handleChangeComuna = (e) => {
		const key = parseInt(e.element.id);

		const newDirecciones = direcciones.map((direccion, index) => {
			if (index === key) {
				return {
					...direccion,
					codComuna: e.selectedItem.codComuna,
				};
			}
			return direccion;
		});

		setDirecciones(newDirecciones);
	};

	return {
		direcciones,
		isRemoveDireccion,
		isAddDireccion,
		handleChangeDireccion,
		handleRemove,
		handleButtonRemove,
		handleAdd,
		handleButtonAdd,
		initDirecciones,
		handleChangeComuna,
		handleChangePredeterminada,
		isDisablePredeterminada,
	};
};

export default useDirecciones;
