import { configureStore } from '@reduxjs/toolkit';

import bancos from './slices/bancos';
import cajasCompensaciones from './slices/cajasCompensaciones';
import campos from './slices/campos';
import comunas from './slices/comunas';
import contratistas from './slices/contratistas';
import cuadrillas from './slices/cuadrillas';
import cuarteles from './slices/cuarteles';
import empresas from './slices/empresas';
import especies from './slices/especies';
import estados from './slices/estados';
import estadosCiviles from './slices/estadosCiviles';
import mutualidades from './slices/mutualidades';
import paises from './slices/paises';
import productores from './slices/productores';
import regiones from './slices/regiones';
import sexos from './slices/sexos';
import trabajadores from './slices/trabajadores';
import users from './slices/users';

export default configureStore({
	reducer: {
		campos,
		estados,
		cuarteles,
		mutualidades,
		cajasCompensaciones,
		cuadrillas,
		empresas,
		trabajadores,
		bancos,
		sexos,
		paises,
		contratistas,
		estadosCiviles,
		especies,
		comunas,
		regiones,
		users,
		productores,
	},
});
