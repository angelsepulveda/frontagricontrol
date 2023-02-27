import { useCallback, useEffect, useState } from 'react';
import { useDropzone } from 'react-dropzone';
import * as XLSX from 'xlsx';

import dateHelper from '../../../shared/helpers/dateHelper';
import { useCargaMasivaTrabajadoresContext } from '../../contexts/cargaMasivaTrabajadores';

const useDragAndDropTrabajadores = (
	contratistas,
	cuadrillas,
	setIsLoading,
	sexos,
) => {
	const [files, setFiles] = useState([]);
	const { dispatch, errorMessage } = useCargaMasivaTrabajadoresContext();
	const [dataContratista, setDataContratista] = useState(contratistas);
	const [dataSexos, setDataSexos] = useState(sexos);
	const [dataCuadrillas, setDataCuadrillas] = useState(cuadrillas);

	useEffect(() => {
		dispatch({ type: 'LOAD_CUADRILLAS', payload: cuadrillas });
		setDataCuadrillas(cuadrillas);
		dispatch({ type: 'LOAD_SEXOS', payload: sexos });
		setDataSexos(sexos);
		dispatch({ type: 'LOAD_CONTRATISTAS', payload: contratistas });
		setDataContratista(contratistas);
	}, [cuadrillas, contratistas]);

	const onDrop = useCallback(
		(acceptedFiles) => {
			setIsLoading(true);
			acceptedFiles.forEach((file) => {
				setFiles(
					acceptedFiles.map((file) =>
						Object.assign(file, {
							preview: URL.createObjectURL(file),
						}),
					),
				);
				const reader = new FileReader();

				const fileName = file.name;
				const allowedExtensions = ['.xlsx', '.xls'];
				const extension = fileName.substring(fileName.lastIndexOf('.'));

				if (allowedExtensions.indexOf(extension) === -1) {
					dispatch({
						type: 'ERROR_MESSAGE',
						payload: 'Selecciona un archivo Excel válido',
					});
					setIsLoading(false);
					return;
				}

				dispatch({
					type: 'ERROR_MESSAGE',
					payload: null,
				});

				reader.onload = (e) => {
					const binaryData = e.target.result;
					const workbook = XLSX.read(binaryData, { type: 'binary' });
					const sheetName = workbook.SheetNames[0];
					const sheet = workbook.Sheets[sheetName];
					const sheetJson = XLSX.utils.sheet_to_json(sheet);

					if (sheetJson.length <= 0) {
						dispatch({
							type: 'ERROR_MESSAGE',
							payload: 'El excel debe contar con al menos un registro',
						});
						setIsLoading(false);
						return;
					}
					dispatch({
						type: 'ERROR_MESSAGE',
						payload: null,
					});

					loadTrabajadores(sheetJson);
				};
				reader.readAsBinaryString(file);
				setIsLoading(false);
			});
		},
		[dataSexos],
	);

	const loadTrabajadores = (trabajadoresArray) => {
		dispatch({
			type: 'ERROR_MESSAGE',
			payload: null,
		});
		const trabajadores = trabajadoresArray.map((trabajador) => {
			if (trabajador.Rut !== undefined) {
				const cuadrilla = dataCuadrillas.find(
					(cuadrilla) => cuadrilla.cuadrilla === trabajador.Cuadrilla,
				);

				const contratista = dataContratista.find(
					(contratista) => contratista.nombre === trabajador.Contratista,
				);

				const sexo = dataSexos.find(
					(sexo) => sexo.nemoTecnico === trabajador.Sexo,
				);
				let codTrabajador =
					trabajador.DV !== undefined
						? trabajador.Rut.toString() + trabajador.DV.toString()
						: trabajador.Rut;

				codTrabajador = codTrabajador.replace(/,/g, '').replace(/-/g, '');
				const nombres = trabajador.Nombres;
				const primerApellido = trabajador['Apellido Paterno'];
				const segundoApellido = trabajador['Apellido Materno'];
				const fechaNacimiento = dateHelper.formatDate(
					new Date(trabajador['Fecha Nacimiento']),
				);
				const email = trabajador.Email;

				const telefono1 = trabajador['Nro Celular'];
				const nemoTecnico = trabajador.Codigo;

				delete trabajador.Cuadrilla;
				delete trabajador.DV;
				delete trabajador.Rut;
				delete trabajador['Apellido Paterno'];
				delete trabajador['Apellido Materno'];
				delete trabajador['Fecha Nacimiento'];
				delete trabajador.Email;
				delete trabajador['Nro Celular'];
				delete trabajador.Codigo;
				delete trabajador.Cuadrilla;
				delete trabajador.Contratista;
				delete trabajador.Sexo;

				return {
					...trabajador,
					codCuadrilla:
						cuadrilla !== undefined ? cuadrilla.codCuadrilla : undefined,
					codContratista:
						contratista !== undefined ? contratista.codContratista : undefined,
					codSexo: sexo !== undefined ? sexo.codSexo : undefined,
					codTrabajador,
					nombres,
					primerApellido,
					segundoApellido,
					fechaNacimiento,
					email,
					telefono1,
					nemoTecnico,
				};
			}

			dispatch({
				type: 'LOAD_TRABAJADORES',
				payload: [],
			});
			dispatch({
				type: 'ERROR_MESSAGE',
				payload: 'no es valido el archivo',
			});
			throw new Error('no es valido el archivo');
		});

		if (trabajadores.length > 0) {
			dispatch({
				type: 'ADD_BUTTON',
				payload: true,
			});

			dispatch({
				type: 'LOAD_TRABAJADORES',
				payload: trabajadores,
			});
		}
	};

	const { getRootProps, getInputProps } = useDropzone({
		accept: '.xlsx',
		onDrop: (acceptedFiles) => onDrop(acceptedFiles),
	});

	return {
		getRootProps,
		getInputProps,
		files,
		errorMessage,
		setIsLoading,
	};
};

export default useDragAndDropTrabajadores;
