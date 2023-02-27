import {
	Card,
	CardContent,
	CardHeader,
	Divider,
	Grid,
	Typography,
} from '@mui/material';
import { Button, DataGrid, LoadPanel } from 'devextreme-react';
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
import { useTranslation } from 'react-i18next';

import { DateBoxComponent, SelectComponent } from '../../components/controls';
import IconBreadcrumbs from '../../components/navigations/IconBreadcrumbs';
import { tabTitle } from '../../helpers/headerTitle';
import useInformeDiarioCosechas from '../../hooks/cosechas/useInformeDiarioCosechas';

const InformeDiarioCosecha = () => {
	const [t] = useTranslation('global');

	const title = t('cosechas.informeDiario.title').toString();

	tabTitle(`AgriControl - ${title}`);
	const {
		especies,
		campos,
		especie,
		campo,
		loading,
		setFecha,
		fecha,
		tipoInforme,
		datos,
		handleChangeEspecie,
		handleChangeCampo,
		onSubmit,
		messageError,
		setInforme,
		informe,
	} = useInformeDiarioCosechas();

	console.log(especies);
	return (
		<>
			<IconBreadcrumbs
				urls={[
					{
						name: 'cosechas Informe Diario',
						url: '/cosecha/informe-diario',
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
						<Grid item xs={12} md={2}>
							<DateBoxComponent
								value={fecha}
								text={t('common.fecha')}
								handleChangeEvent={(e) => {
									const seleccion = e.value;
									setFecha(seleccion);
								}}
							/>
						</Grid>
						<Grid item xs={12} md={3}>
							<SelectComponent
								dataSource={campos}
								displayExpr={'campo'}
								valueExpr={'codCampo'}
								text={t('common.campo')}
								value={campo}
								valueChangedEvent={handleChangeCampo}
							/>
						</Grid>
						<Grid item xs={12} md={3}>
							<SelectComponent
								dataSource={especies}
								displayExpr={'especie'}
								valueExpr={'codEspecie'}
								text={t('common.especie')}
								value={especie}
								valueChangedEvent={handleChangeEspecie}
							/>
						</Grid>
						<Grid item xs={12} md={2}>
							<SelectComponent
								dataSource={tipoInforme}
								displayExpr={'text'}
								valueExpr={'id'}
								text={t('common.tipoInforme')}
								value={informe}
								valueChangedEvent={(e) => {
									const seleccion = e.value;
									setInforme(seleccion);
								}}
							/>
						</Grid>
						<Grid item xs={12} md={2}>
							<Button
								width="100%"
								height={30}
								text={t('common.generarInforme')}
								type="default"
								stylingMode="contained"
								onClick={onSubmit}
							/>
						</Grid>
						{messageError === '' ? (
							''
						) : (
							<Typography
								color="error"
								variant="body2"
								sx={{ marginLeft: 10, marginTop: 3 }}
							>
								{messageError}
							</Typography>
						)}
					</Grid>
				</CardContent>
			</Card>
			<Divider />
			<Card>
				<CardHeader title={t('cosechas.informeDiario.titleCard')} />
				<CardContent>
					<DataGrid
						id="grid"
						dataSource={datos}
						repaintChangesOnly={true}
						showRowLines={true}
						showBorders={true}
						rowAlternationEnabled={true}
						allowColumnReordering={true}
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
						<Column
							dataField="fechaCaptura"
							caption={t('common.fecha')}
							width={150}
						/>
						<Column dataField="campo" caption={t('common.campo')} width={100} />
						<Column
							dataField="sector"
							caption={t('common.sector')}
							width={100}
						/>
						<Column
							dataField="cuartel"
							caption={t('common.cuartel')}
							width={100}
						/>
						<Column
							dataField="especie"
							caption={t('common.especie')}
							width={100}
						/>
						<Column
							dataField="variedad"
							caption={t('common.variedad')}
							width={100}
						/>
						<Column
							dataField="nombreContratista"
							caption={t('common.contratista')}
							width={150}
						/>
						<Column dataField="dni" caption={t('common.rut')} width={150} />
						<Column
							dataField="empleado"
							caption={t('common.empleado')}
							width={100}
						/>
						<Column
							dataField="cuadrilla"
							caption={t('common.cuadrilla')}
							width={100}
						/>
						<Column
							dataField="bandeja"
							caption={t('common.formato')}
							width={150}
						/>
						<Column
							dataField="calidad"
							caption={t('common.calidad')}
							width={100}
						/>
						<Column dataField="kilos" caption={t('common.kilos')} width={100} />
						<Summary>
							<TotalItem
								column="fecha"
								summaryType="count"
								alignment={'center'}
							/>
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

export default InformeDiarioCosecha;
