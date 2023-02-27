import { useState } from 'react';
import tiposCoberturasService from '../services/tiposCoberturasService';

const useTiposCoberturas = () => {
	const [tiposCoberturas, setTiposCoberturas] = useState([]);

	const loadTiposCoberturas = async () => {
		setTiposCoberturas(await tiposCoberturasService.getAll());
	};

	return {
		tiposCoberturas,
		loadTiposCoberturas,
	};
};

export default useTiposCoberturas;
