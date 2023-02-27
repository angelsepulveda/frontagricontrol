import { useState } from 'react';

import { messageValidation } from '../../../shared/helpers/message';

const useCuartelesVariedades = () => {
	const [cuartelesVariedades, setCuartelesVariedades] = useState([]);
	const [isRemoveCuartelesVariedades, setIsRemoveCuartelesVariedades] =
		useState(false);
	const [isAddCuartelesVariedades, setIsAddCuartelesVariedades] =
		useState(false);

	const initCuartelesVariedades = (data) => {
		if (data.length > 1) {
			setIsRemoveCuartelesVariedades(true);
		} else {
			setIsRemoveCuartelesVariedades(false);
		}
		setCuartelesVariedades(data);
	};

	const handleChangeCuartelVariedad = (e) => {
		const key = parseInt(e.event.target.accessKey);

		const newCuartelesVariedades = cuartelesVariedades.map(
			(cuartelVariedad, index) => {
				if (index === key) {
					return {
						...cuartelVariedad,
						[e.event.target.name]: e.event.target.value,
					};
				}
				return cuartelVariedad;
			},
		);

		setCuartelesVariedades(newCuartelesVariedades);
	};

	const handleRemoveCuartelVariedad = (indexCuartelVariedad) => {
		if (cuartelesVariedades.length > 1) {
			const newCuartelesVariedades = cuartelesVariedades.filter(
				(cuartelVariedad, index) => {
					return index !== indexCuartelVariedad;
				},
			);

			if (newCuartelesVariedades.length === 1) {
				setIsRemoveCuartelesVariedades(false);
			}

			setCuartelesVariedades(newCuartelesVariedades);
		}
	};

	const handleVisibleButtonRemove = () => {
		if (cuartelesVariedades.length > 1) {
			setIsRemoveCuartelesVariedades(true);
		} else {
			setIsRemoveCuartelesVariedades(false);
		}
	};

	const validationVariedades = () => {
		let codVariedad = 0;
		const messages = [];

		for (let i = 0; i < cuartelesVariedades.length; i++) {
			if (cuartelesVariedades[i].codVariedad === codVariedad) {
				messages.push({
					value: `La variedad ${cuartelesVariedades[i].variedad} se encuentra repetida`,
				});
			}
			codVariedad = cuartelesVariedades[i].codVariedad;
		}

		if (messages.length > 0) {
			messageValidation(messages);
			return false;
		}

		return true;
	};

	const handleVisibleButtonAdd = () => {
		setIsAddCuartelesVariedades(true);
		if (cuartelesVariedades.length > 1) {
			setIsRemoveCuartelesVariedades(true);
		}
	};

	const handleChangeVariedad = (e) => {
		const key = parseInt(e.element.id);

		const newCuartelesVariedades = cuartelesVariedades.map(
			(cuartelVariedad, index) => {
				if (index === key) {
					return {
						...cuartelVariedad,
						codVariedad: e.selectedItem.codVariedad,
						variedad: e.selectedItem.variedad,
					};
				}

				return cuartelVariedad;
			},
		);

		setCuartelesVariedades(newCuartelesVariedades);
	};

	const handleAddCuartelVariedad = () => {
		const cuartelVariedad = {
			codCuartel: 0,
			codCampo: 0,
			codSector: 0,
			codVariedad: null,
			nemoTecnico: null,
			haProductivasVar: null,
			numPlantas: null,
			numHileras: null,
			diaFrecuenciaMin: null,
			diaFrecuenciaMax: null,
			finalizaCosecha: false,
		};

		const cuartelVariedadNew = [...cuartelesVariedades, cuartelVariedad];

		setIsRemoveCuartelesVariedades(true);

		setCuartelesVariedades(cuartelVariedadNew);
	};

	const handleChangeFinalizaCosecha = (e, indexForm) => {
		const newCuartelesVariedades = cuartelesVariedades.map(
			(cuartelVariedad, index) => {
				if (index === indexForm) {
					return {
						...cuartelVariedad,
						finalizaCosecha: e,
					};
				}
				return cuartelVariedad;
			},
		);

		setCuartelesVariedades(newCuartelesVariedades);
	};

	return {
		cuartelesVariedades,
		isAddCuartelesVariedades,
		isRemoveCuartelesVariedades,
		initCuartelesVariedades,
		handleChangeCuartelVariedad,
		handleRemoveCuartelVariedad,
		handleVisibleButtonAdd,
		handleChangeFinalizaCosecha,
		handleVisibleButtonRemove,
		handleChangeVariedad,
		handleAddCuartelVariedad,
		validationVariedades,
	};
};

export default useCuartelesVariedades;
