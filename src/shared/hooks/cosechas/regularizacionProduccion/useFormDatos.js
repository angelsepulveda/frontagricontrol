import { useEffect, useState } from 'react';

import cuartelesService from '../../../../app-zonecl-agricontrol/services/cuartelesService.js';
import formatosCosechasService from '../../../../app-zonecl-agricontrol/services/formatos-cosechasService.js';

export const useFormDatos = (
	cuarteles,
	variedades,
	trabajadores,
	regularizacionForm,
	setRegularizacionForm,
	especies,
	formatoCosechas,
	tratos,
	sectores,
	validacion,
	isDisableForm,
	setIsDisableForm,
	campos,
	codCampo,
) => {
	const [cuartelesData, setCuartelesData] = useState(cuarteles);
	const [variedadesData, setVariedadesData] = useState(variedades);
	const [trabajadoresData, setTrabajadoresData] = useState(trabajadores);
	const [especiesData, setEspeciesData] = useState(especies);
	const [formatoCosechasData, setFormatoCosechasData] =
		useState(formatoCosechas);
	const [sectoresData, setSectoresData] = useState(sectores);

	useEffect(() => {
		const sectorCampos = sectores.filter(
			(sector) => sector.codCampo === codCampo,
		);
		setSectoresData(sectorCampos);

		const cuartelCampos = cuarteles.filter(
			(cuartel) => cuartel.codCampo === codCampo,
		);

		loadFormatosCosechas(codCampo);

		setCuartelesData(cuartelCampos);
	}, [codCampo]);

	const loadFormatosCosechas = async (codCampo) => {
		const dataFormatoCosechas =
			await formatosCosechasService.formatoCosechasCamposAll(codCampo);

		setFormatoCosechasData(dataFormatoCosechas);
	};

	const handleChangeCheckCuadrilla = (e) => {
		if (!e) {
			setRegularizacionForm({ ...regularizacionForm, codCuadrilla: undefined });
		}

		setIsDisableForm({
			...isDisableForm,
			cuadrilla: e,
		});
	};

	const handleChangeCheckSector = (e) => {
		setIsDisableForm({
			...isDisableForm,
			sector: e,
			cuartel: e,
			variedad: e,
		});

		if (!e)
			setRegularizacionForm({
				...regularizacionForm,
				codVariedad: undefined,
				codCuartel: undefined,
				codSector: undefined,
			});
	};

	const handleChangeCheckCuartel = (e) => {
		if (!e)
			setRegularizacionForm({
				...regularizacionForm,
				codCuartel: undefined,
				codVariedad: undefined,
			});

		setIsDisableForm({
			...isDisableForm,
			cuartel: e,
			variedad: e,
		});
	};

	const handleChangeCheckJefeCuadrilla = (e) => {
		setIsDisableForm({
			...isDisableForm,
			jefeCuadrilla: e,
		});

		if (!e)
			setRegularizacionForm({
				...regularizacionForm,
				codJefeCuadrilla: undefined,
			});
	};

	const handleChangeCheckVariedad = (e) => {
		setIsDisableForm({
			...isDisableForm,
			variedad: e,
		});

		if (!e)
			setRegularizacionForm({ ...regularizacionForm, codVariedad: undefined });
	};

	const handleChangeCheckFormatoCosecha = (e) => {
		setIsDisableForm({
			...isDisableForm,
			formatoCosecha: e,
		});

		if (!e)
			setRegularizacionForm({
				...regularizacionForm,
				codFormatoCosecha: undefined,
			});
	};

	const handleChangeCheckTrato = (e) => {
		setIsDisableForm({
			...isDisableForm,
			trato: e,
		});

		if (!e) setRegularizacionForm({ ...regularizacionForm, trato: undefined });
	};

	const handleChangeCheckContratista = (e) => {
		setIsDisableForm({
			...isDisableForm,
			contratista: e,
		});

		if (!e)
			setRegularizacionForm({
				...regularizacionForm,
				codContratista: undefined,
			});
	};

	const handleChangeCheckCampo = (e) => {
		if (e.value !== undefined) {
			const sectorCampos = sectores.filter(
				(sector) => sector.codCampo === e.value,
			);

			setSectoresData(sectorCampos);

			const cuartelCampos = cuarteles.filter(
				(cuartel) => cuartel.codCampo === e.value,
			);

			setCuartelesData(cuartelCampos);
		}

		setIsDisableForm({
			...isDisableForm,
			campo: e,
			cuartel: e,
			variedad: e,
			sector: e,
			formatoCosecha: e,
		});

		if (!e)
			setRegularizacionForm({
				...regularizacionForm,
				codCampo: undefined,
				codVariedad: undefined,
				codCuartel: undefined,
				codSector: undefined,
				codFormatoCosecha: undefined,
			});
	};

	const handleChangeCheckTrabajador = (e) => {
		setIsDisableForm({
			...isDisableForm,
			trabajador: e,
		});

		if (!e)
			setRegularizacionForm({
				...regularizacionForm,
				codTrabajador: undefined,
			});
	};

	const handleChangeCheckFechaCaptura = (e) => {
		setIsDisableForm({
			...isDisableForm,
			fechaCaptura: e.value,
		});

		if (!e)
			setRegularizacionForm({ ...regularizacionForm, fechaCaptura: undefined });
	};

	const handleChangeCampo = (e) => {
		setSectoresData(sectores.filter((sector) => sector.codCampo === e.value));

		loadFormatosCosechas(e.value);

		setRegularizacionForm({
			...regularizacionForm,
			codCampo: e.value,
		});
	};

	const handleChangeCuartel = async (e) => {
		const codCuartel = e.value;
		setRegularizacionForm({ ...regularizacionForm, codCuartel });
		if (codCuartel !== undefined) {
			if (codCuartel !== undefined || codCuartel !== null) {
				const data = await cuartelesService.getCuartelesVariedades(codCuartel);
				for (const i in data) {
					const dataEspecie = especies.filter(
						(item) => item.codEspecie === data[i].codEspecie,
					);

					setEspeciesData(dataEspecie);
				}

				setVariedadesData(data);
			} else {
				const data = {
					codVariedad: undefined,
					codFormatoCosecha: undefined,
					codEspecie: undefined,
					codCuartel: undefined,
				};
				setRegularizacionForm({ ...regularizacionForm, data });
				setVariedadesData(variedades);
				setFormatoCosechasData(formatoCosechas);
			}
		}
	};

	const handleChangeCuadrilla = (e) => {
		if (e.value !== undefined) {
			setTrabajadoresData(
				trabajadores.filter(
					(trabajador) => trabajador.codCuadrilla === e.value,
				),
			);
		} else {
			setTrabajadoresData(trabajadores);
		}

		setRegularizacionForm({
			...regularizacionForm,
			codCuadrilla: e.value,
		});
	};

	const handleChangeJefeCuadrilla = (e) => {
		setRegularizacionForm({
			...regularizacionForm,
			codJefeCuadrilla: e.value,
		});
	};

	const handleChangeVariedad = (e) => {
		if (e.value !== undefined) {
			const variedad = variedades.filter(
				(variedad) => variedad.codVariedad === e.value,
			);

			if (variedad.length > 0) {
				setRegularizacionForm({
					...regularizacionForm,
					codVariedad: e.value,
					codEspecie: variedad[0].codEspecie,
				});
			}
		} else {
			setRegularizacionForm({
				...regularizacionForm,
				codVariedad: e.value,
				codEspecie: undefined,
			});
		}
	};

	const handleChangeContratista = (e) => {
		setRegularizacionForm({
			...regularizacionForm,
			codContratista: e.value,
		});
	};

	const handleChangeTrabajador = (e) => {
		setRegularizacionForm({
			...regularizacionForm,
			codTrabajador: e.value,
		});
	};

	const handleChangeFechaCaptura = (e) => {
		setRegularizacionForm({
			...regularizacionForm,
			fechaCaptura: new Date(e.value),
		});
	};

	const handleChangeSector = (e) => {
		const codSector = e.value;

		if (codSector !== undefined) {
			setCuartelesData(
				cuarteles.filter((cuartel) => cuartel.codSector === codSector),
			);
		} else {
			setCuartelesData(cuarteles);
		}

		setRegularizacionForm({
			...regularizacionForm,
			codSector,
		});
	};

	const handleChangeFormatoCosecha = (e) => {
		const codFormatoCosecha = e.value;

		setRegularizacionForm({
			...regularizacionForm,
			codFormatoCosecha,
		});
	};

	const handleChangeTrato = (e) => {
		setRegularizacionForm({
			...regularizacionForm,
			trato: e.value,
		});
	};

	return {
		isDisableForm,
		handleChangeCheckCuadrilla,
		handleChangeCheckCuartel,
		handleChangeCheckJefeCuadrilla,
		handleChangeCheckFormatoCosecha,
		handleChangeCheckVariedad,
		handleChangeCheckContratista,
		handleChangeCheckCampo,
		handleChangeCheckTrabajador,
		handleChangeCheckFechaCaptura,
		handleChangeCampo,
		handleChangeCuartel,
		handleChangeCuadrilla,
		handleChangeJefeCuadrilla,
		handleChangeVariedad,
		handleChangeContratista,
		handleChangeTrabajador,
		handleChangeFechaCaptura,
		handleChangeFormatoCosecha,
		handleChangeCheckTrato,
		handleChangeTrato,
		handleChangeCheckSector,
		handleChangeSector,
		cuartelesData,
		variedadesData,
		trabajadoresData,
		regularizacionForm,
		especiesData,
		formatoCosechasData,
		sectoresData,
	};
};
