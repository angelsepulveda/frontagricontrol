import Calidades from '../../app-zonecl-agricontrol/pages/Calidades';
import Campos from '../../app-zonecl-agricontrol/pages/Campo';
import Comunas from '../../app-zonecl-agricontrol/pages/Comunas';
import Contratistas from '../../app-zonecl-agricontrol/pages/Contratista';
import {
	Cuadrillas,
	FormCuadrillas,
} from '../../app-zonecl-agricontrol/pages/cuadrillas';
import {
	Cuarteles,
	FormCuarteles,
} from '../../app-zonecl-agricontrol/pages/cuarteles';
import {
	Empresas,
	FormEmpresas,
} from '../../app-zonecl-agricontrol/pages/empresas';
import Equipos from '../../app-zonecl-agricontrol/pages/Equipos';
import Especies from '../../app-zonecl-agricontrol/pages/Especies';
import FormatosCosechas from '../../app-zonecl-agricontrol/pages/Formatos-Cosechas';
import Localidades from '../../app-zonecl-agricontrol/pages/Localidades';
import Paises from '../../app-zonecl-agricontrol/pages/Paises';
import Regiones from '../../app-zonecl-agricontrol/pages/Regiones';
import Sectores from '../../app-zonecl-agricontrol/pages/Sectores';
import Temporadas from '../../app-zonecl-agricontrol/pages/Temporadas';
import {
	CargaMasivaTrabajadores,
	FormTrabajadores,
	Trabajadores,
	ViewTrabajador,
} from '../../app-zonecl-agricontrol/pages/Trabajadores';
import Tratos from '../../app-zonecl-agricontrol/pages/Trato';
import Variedades from '../../app-zonecl-agricontrol/pages/Variedades';
import LayoutAdmin from '../layouts/LayoutAdmin';
import CargaProduccionManual from '../pages/cosecha/CargaProduccionManual';
import InformeCompleto from '../pages/cosecha/InformeCompleto';
import InformeDiarioCosecha from '../pages/cosecha/InformeDiarioCosecha';
import RegularizacionProduccion from '../pages/cosecha/RegularizacionProduccion';
import Dashboard from '../pages/Dashboard';
import { FormUsuarios, Usuarios } from '../pages/usuarios';

const routes = [
	{
		path: 'dashboard',
		layout: LayoutAdmin,
		component: Dashboard,
	},
	{
		path: 'usuarios',
		layout: LayoutAdmin,
		component: Usuarios,
	},
	{
		path: 'calidades',
		layout: LayoutAdmin,
		component: Calidades,
	},
	{
		path: 'localidades',
		layout: LayoutAdmin,
		component: Localidades,
	},
	{
		path: 'paises',
		layout: LayoutAdmin,
		component: Paises,
	},
	{
		path: 'formatos-cosechas',
		layout: LayoutAdmin,
		component: FormatosCosechas,
	},
	{
		path: 'tratos',
		layout: LayoutAdmin,
		component: Tratos,
	},
	{
		path: 'regiones',
		layout: LayoutAdmin,
		component: Regiones,
	},
	{
		path: 'campos',
		layout: LayoutAdmin,
		component: Campos,
	},
	{
		path: 'especies',
		layout: LayoutAdmin,
		component: Especies,
	},
	{
		path: 'variedades',
		layout: LayoutAdmin,
		component: Variedades,
	},
	{
		path: 'empresas',
		layout: LayoutAdmin,
		component: Empresas,
	},
	{
		path: 'empresas/nuevo',
		layout: LayoutAdmin,
		component: FormEmpresas,
	},
	{
		path: 'empresas/actualizar/:id',
		layout: LayoutAdmin,
		component: FormEmpresas,
	},
	{
		path: 'sectores',
		layout: LayoutAdmin,
		component: Sectores,
	},
	{
		path: 'comunas',
		layout: LayoutAdmin,
		component: Comunas,
	},
	{
		path: 'equipos',
		layout: LayoutAdmin,
		component: Equipos,
	},
	{
		path: 'temporadas',
		layout: LayoutAdmin,
		component: Temporadas,
	},
	{
		path: 'cuarteles',
		layout: LayoutAdmin,
		component: Cuarteles,
	},
	{
		path: 'cuarteles/nuevo',
		layout: LayoutAdmin,
		component: FormCuarteles,
	},
	{
		path: 'cuarteles/actualizar/:id',
		layout: LayoutAdmin,
		component: FormCuarteles,
	},
	{
		path: 'cosecha/informe-completo',
		layout: LayoutAdmin,
		component: InformeCompleto,
	},
	{
		path: 'cuadrillas',
		layout: LayoutAdmin,
		component: Cuadrillas,
	},
	{
		path: 'cuadrillas/nuevo',
		layout: LayoutAdmin,
		component: FormCuadrillas,
	},
	{
		path: 'cuadrillas/actualizar/:id',
		layout: LayoutAdmin,
		component: FormCuadrillas,
	},
	{
		path: 'cosecha/informe-diario',
		layout: LayoutAdmin,
		component: InformeDiarioCosecha,
	},
	{
		path: 'contratistas',
		layout: LayoutAdmin,
		component: Contratistas,
	},
	{
		path: 'trabajadores',
		layout: LayoutAdmin,
		component: Trabajadores,
	},
	{
		path: 'trabajadores/nuevo',
		layout: LayoutAdmin,
		component: FormTrabajadores,
	},
	{
		path: 'trabajadores/actualizar/:id',
		layout: LayoutAdmin,
		component: FormTrabajadores,
	},
	{
		path: 'trabajadores/vista/:id',
		layout: LayoutAdmin,
		component: ViewTrabajador,
	},
	{
		path: 'trabajadores/carga-masiva',
		layout: LayoutAdmin,
		component: CargaMasivaTrabajadores,
	},
	{
		path: 'cosecha/regularizacion-produccion',
		layout: LayoutAdmin,
		component: RegularizacionProduccion,
	},
	{
		path: 'usuarios/nuevo',
		layout: LayoutAdmin,
		component: FormUsuarios,
	},
	{
		path: 'usuarios/actualizar/:id',
		layout: LayoutAdmin,
		component: FormUsuarios,
	},
	{
		path: 'cosecha/carga-produccion-trabajadores',
		layout: LayoutAdmin,
		component: CargaProduccionManual,
	},
];

export default routes;
