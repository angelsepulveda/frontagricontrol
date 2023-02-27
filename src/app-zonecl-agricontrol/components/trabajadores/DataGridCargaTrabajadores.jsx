import { Typography } from '@mui/material';
import { DataGrid } from 'devextreme-react';
import {
	Column,
	ColumnChooser,
	Editing,
	FilterRow,
	Grouping,
	GroupPanel,
	HeaderFilter,
	LoadPanel,
	Lookup,
	Pager,
	Paging,
	RequiredRule,
	Scrolling,
	Selection,
	Sorting,
	StringLengthRule,
	Summary,
	TotalItem,
} from 'devextreme-react/data-grid';
import { useTranslation } from 'react-i18next';

import useDataGridCargaTrabajadores from '../../hooks/trabajadores/useDataGridCargaTrabajadores';
const DataGridCargaTrabajadores = () => {
	const [t] = useTranslation('global');

	const {
		trabajadoresStore,
		sexos,
		cuadrillas,
		contratistas,
		addButton,
		linkRef,
		handleExcelClick,
		selectedRowKeys,
		onSelectionChangedData,
		totalSeleccionados,
		handleRemove,
	} = useDataGridCargaTrabajadores();
	return (
		<>
			<a
				ref={linkRef}
				href="/PlantillaTrabajadores.xlsx"
				download
				style={{ display: 'none' }}
			>
				Download JSON
			</a>
			<DataGrid
				id="grid"
				dataSource={trabajadoresStore}
				repaintChangesOnly={true}
				showRowLines={true}
				showBorders={true}
				rowAlternationEnabled={true}
				columnHidingEnabled={true}
				columnAutoWidth={true}
				onSelectionChanged={onSelectionChangedData}
				selectedRowKeys={selectedRowKeys}
				onToolbarPreparing={(e) => {
					e.toolbarOptions.items.unshift(
						{
							location: 'before',
							widget: 'dxButton',
							options: {
								type: 'default',
								stylingMode: 'contained',
								icon: 'textdocument',
								text: 'Descargar Plantilla',
								onClick: handleExcelClick,
							},
						},
						selectedRowKeys.length > 0
							? {
									location: 'before',
									widget: 'dxButton',
									options: {
										type: 'danger',
										stylingMode: 'contained',
										icon: 'trash',
										text: 'Eliminar',
										onClick: handleRemove,
									},
							  }
							: {},
					);
				}}
			>
				<Grouping contextMenuEnabled={true} expandMode="rowClick" />
				<GroupPanel visible={true} emptyPanelText="" />
				<ColumnChooser enabled={true} />
				<LoadPanel enabled={true} />
				<Selection mode="multiple" />
				<Sorting mode="multiple" />
				<FilterRow visible={true} applyFilter={'auto'} />
				<HeaderFilter visible={true} />
				<Editing
					refreshMode="full"
					mode="form"
					allowAdding={addButton}
					allowUpdating={true}
					allowDeleting={true}
				/>
				<Column dataField="codTrabajador" caption={t('common.dni')}>
					<RequiredRule message={t('validations.required')} />
					<StringLengthRule
						message={t('validations.maxLength', { max: '20' })}
						max={20}
					/>
				</Column>
				<Column
					dataType="string"
					dataField="nemoTecnico"
					caption={t('common.nemoTecnico')}
				>
					<StringLengthRule
						message={t('validations.maxLength', { max: '20' })}
						max={20}
					/>
				</Column>
				<Column dataField="nombres" caption={t('common.nombres')}>
					<RequiredRule message={t('validations.required')} />
					<StringLengthRule
						message={t('validations.maxLength', { max: '30' })}
						max={30}
					/>
				</Column>
				<Column dataField="primerApellido" caption={t('common.primerApellido')}>
					<RequiredRule message={t('validations.required')} />
					<StringLengthRule
						message={t('validations.maxLength', { max: '30' })}
						max={30}
					/>
				</Column>
				<Column
					dataField="segundoApellido"
					caption={t('common.segundoApellido')}
				>
					<RequiredRule message={t('validations.required')} />
					<StringLengthRule
						message={t('validations.maxLength', { max: '30' })}
						max={30}
					/>
				</Column>
				<Column
					dataField="fechaNacimiento"
					dataType="date"
					caption={t('common.fechaNacimiento')}
				>
					<RequiredRule message={t('validations.required')} />
				</Column>
				<Column dataField="codSexo" caption={t('common.sexo')}>
					<Lookup
						dataSource={sexos}
						displayExpr="nemoTecnico"
						valueExpr="codSexo"
						allowClearing={true}
					/>
				</Column>
				<Column
					dataField="telefono1"
					dataType="string"
					caption={t('trabajadores.telefono1')}
				>
					<StringLengthRule
						message={t('validations.maxLength', { max: '15' })}
						max={15}
					/>
				</Column>
				<Column dataField="email" caption={t('common.email')}>
					<StringLengthRule
						message={t('validations.maxLength', { max: '120' })}
						max={120}
					/>
				</Column>
				<Column dataField="codCuadrilla" caption={t('common.cuadrilla')}>
					<Lookup
						dataSource={cuadrillas}
						displayExpr="cuadrilla"
						valueExpr="codCuadrilla"
						allowClearing={true}
					/>
				</Column>
				<Column dataField="codContratista" caption={t('common.contratista')}>
					<Lookup
						dataSource={contratistas}
						displayExpr="nombre"
						valueExpr="codContratista"
						allowClearing={true}
					/>
				</Column>
				<Summary>
					<TotalItem column={t('common.dni')} summaryType="count" />
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
			<Typography variant="h6" sx={{ marginBottom: 5 }}>
				Total seleccionados: {totalSeleccionados}{' '}
			</Typography>
		</>
	);
};

export default DataGridCargaTrabajadores;
