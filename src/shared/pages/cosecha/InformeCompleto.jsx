import { Card, CardContent, CardHeader, Divider, Grid } from '@mui/material';
import { DataGrid, LoadPanel } from 'devextreme-react';
import {
	Column,
	ColumnChooser,
	Export,
	FilterRow,
	HeaderFilter,
	Pager,
	Paging,
	Scrolling,
	SearchPanel,
	Selection,
	Sorting,
	Summary,
	TotalItem,
} from 'devextreme-react/data-grid';
import { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';

import { DateBoxComponent } from '../../components/controls';
import IconBreadcrumbs from '../../components/navigations/IconBreadcrumbs';
import { tabTitle } from '../../helpers/headerTitle';
import cosechaService from '../../services/cosechaService';

const InformeCompleto = () => {
	const [t] = useTranslation('global');

	const title = t('cosechas.informeCompleto.title').toString();

	tabTitle(`AgriControl - ${title}`);

	const [datos, setDatos] = useState([]);
	const [loading, setLoading] = useState(false);
	const [fechaDesde, setFechaDesde] = useState(new Date());
	const [fechaHasta, setFechaHasta] = useState(new Date());

	useEffect(() => {
		async function loadData() {
			try {
				setLoading(true);
				setDatos(
					await cosechaService.getInformeCompleto(fechaDesde, fechaHasta),
				);
				setLoading(false);
			} catch (error) {
				console.log('Mi error', error);
				setLoading(false);
			}
		}
		loadData();
	}, [fechaDesde, fechaHasta]);

	return (
		<>
			<IconBreadcrumbs
				urls={[
					{
						name: 'cosechas Informe Completo',
						url: '/cosecha/informe-completo',
					},
				]}
			/>
			<LoadPanel
				shadingColor="rgba(0,0,0,0.4)"
				visible={loading}
				showIndicator={true}
				shading={true}
				showPane={true}
			/>
			<Card>
				<CardContent>
					<Grid container spacing={2}>
						<Grid item xs={12} md={6}>
							<DateBoxComponent
								value={fechaDesde}
								text={t('common.fechaDesde')}
								handleChangeEvent={(e) => {
									const seleccion = e.value;
									if (seleccion > fechaHasta) {
										setFechaHasta(seleccion);
									}
									setFechaDesde(seleccion);
								}}
							/>
						</Grid>
						<Grid item xs={12} md={6}>
							<DateBoxComponent
								value={fechaHasta}
								text={t('common.fechaHasta')}
								handleChangeEvent={(e) => {
									const seleccion = e.value;
									if (seleccion < fechaDesde) {
										setFechaDesde(seleccion);
									}
									setFechaHasta(seleccion);
								}}
							/>
						</Grid>
					</Grid>
				</CardContent>
			</Card>
			<Divider />
			<Card>
				<CardHeader title={t('cosechas.informeCompleto.titleCard')} />
				<CardContent>
					<DataGrid
						id="grid"
						dataSource={datos}
						repaintChangesOnly={true}
						showRowLines={true}
						showBorders={true}
						rowAlternationEnabled={true}
					>
						<Export
							enabled={true}
							allowExportSelectedData={false}
							fileName={'informeDiario'}
						/>
						<ColumnChooser enabled={true} />
						<LoadPanel enabled={true} />
						<Selection mode="single" />
						<Sorting mode="multiple" />
						<FilterRow visible={true} applyFilter={'auto'} />
						<HeaderFilter visible={true} />
						<SearchPanel visible={true} width={240} placeholder="Search..." />
						<Scrolling mode="virtual" />

						<Column dataField="fechaCaptura" caption={t('common.fecha')} />
						<Column dataField="campo" caption={t('common.campo')} />
						<Column dataField="sector" caption={t('common.cuartel')} />
						<Column dataField="especie" caption={t('common.especie')} />
						<Column dataField="variedad" caption={t('common.variedad')} />
						<Column
							dataField="nombreContratista"
							caption={t('common.contratista')}
						/>
						<Column dataField="dni" caption="Rut" />
						<Column dataField="empleado" caption={t('common.empleado')} />
						<Column dataField="cuadrilla" caption={t('common.cuadrilla')} />
						<Column dataField="formato" caption={t('common..formato')} />
						<Column dataField="calidad" caption={t('common.calidad')} />
						<Column
							dataField="numeroBandejas"
							caption={t('common.numeroBandejas')}
						/>
						<Column dataField="kilos" caption={t('common.kilos')} />
						<Column dataField="celular" caption={t('common.celular')} />

						<Summary>
							<TotalItem column="fecha" summaryType="count" />
							<TotalItem column="kilos" summaryType="sum" />
						</Summary>
						<Scrolling rowRenderingMode="virtual"></Scrolling>
						<Paging defaultPageSize={10} />
						<Pager
							visible={true}
							displayMode={'full'}
							showInfo={true}
							showNavigationButtons={true}
						/>
					</DataGrid>
				</CardContent>
			</Card>
		</>
	);
};

export default InformeCompleto;
