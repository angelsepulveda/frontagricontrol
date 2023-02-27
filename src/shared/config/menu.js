import {
	faCaretRight,
	faDesktop,
	faLemon,
	faListCheck,
	faTable,
	faUser,
} from '@fortawesome/free-solid-svg-icons';

const menu = [
	{
		title: 'dashboard.title',
		icon: faDesktop,
		path: '/dashboard',
	},
	{
		id: 'cosechas',
		title: 'common.cosechas',
		icon: faLemon,
		items: [
			{
				title: 'cosechas.informeCompleto.title',
				icon: faTable,
				path: '/cosecha/informe-completo',
			},
			{
				title: 'cosechas.informeDiario.title',
				icon: faTable,
				path: '/cosecha/informe-diario',
			},
			{
				title: 'Regularizacion de Produccion',
				icon: faTable,
				path: '/cosecha/regularizacion-produccion',
			},
			{
				title: 'Mantenedores',
				icon: faTable,
				items: [
					{
						title: 'calidades.title',
						icon: faCaretRight,
						path: '/calidades',
					},
					{
						title: 'formatosCosechas.title',
						icon: faCaretRight,
						path: '/formatos-cosechas',
					},
					{
						title: 'tratos.title',
						icon: faCaretRight,
						path: '/tratos',
					},
					{
						title: 'contratistas.title',
						icon: faCaretRight,
						path: '/contratistas',
					},
				],
			},
		],
	},
	{
		id: 'generales',
		title: 'common.generales',
		icon: faListCheck,
		items: [
			{
				title: 'common.mantenedores',
				icon: faTable,
				items: [
					{
						title: 'empresas.title',
						icon: faCaretRight,
						path: '/empresas',
					},
					{
						title: 'especies.title',
						icon: faCaretRight,
						path: '/especies',
					},
					{
						title: 'cuarteles.title',
						icon: faCaretRight,
						path: '/cuarteles',
					},
					{
						title: 'localidades.title',
						icon: faCaretRight,
						path: '/localidades',
					},
					{
						title: 'paises.title',
						icon: faCaretRight,
						path: '/paises',
					},
					{
						title: 'regiones.title',
						icon: faCaretRight,
						path: '/regiones',
					},
					{
						title: 'sectores.title',
						icon: faCaretRight,
						path: '/sectores',
					},
					{
						title: 'variedades.title',
						icon: faCaretRight,
						path: '/variedades',
					},
					{
						title: 'campos.title',
						icon: faCaretRight,
						path: '/campos',
					},
					{
						title: 'comunas.title',
						icon: faCaretRight,
						path: '/comunas',
					},
					{
						title: 'equipos.title',
						icon: faCaretRight,
						path: '/equipos',
					},
					{
						title: 'temporadas.title',
						icon: faCaretRight,
						path: '/temporadas',
					},
					{
						title: 'cuadrillas.title',
						icon: faCaretRight,
						path: '/cuadrillas',
					},
					{
						title: 'trabajadores.title',
						icon: faCaretRight,
						path: '/trabajadores',
					},
				],
			},
		],
	},
	{
		title: 'usuarios.title',
		icon: faUser,
		path: '/usuarios',
	},
];

export default menu;
