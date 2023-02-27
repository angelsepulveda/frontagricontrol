import { Box } from '@mui/material';
import { Button as ButtonBox } from 'devextreme-react';
import { Button, Column, Lookup } from 'devextreme-react/data-grid';
import { useEffect } from 'react';
import { useTranslation } from 'react-i18next';

import { DataGridCustom } from '../../../shared/components/controls';
import IconBreadcrumbs from '../../../shared/components/navigations/IconBreadcrumbs';
import { tabTitle } from '../../../shared/helpers/headerTitle';
import useTrabajadores from '../../hooks/trabajadores/useTrabajadores';

export const Trabajadores = () => {
	const [t] = useTranslation('global');

	const title = t('trabajadores.title').toString();

	tabTitle(`AgriControl - ${title}`);

	const {
		estados,
		sexos,
		contratistas,
		cuadrillas,
		paises,
		estadosCiviles,
		bancos,
		formatosPago,
		loadData,
		trabajadoresStore,
		buttonAddGrid,
		navigate,
	} = useTrabajadores();

	useEffect(() => {
		loadData();
	}, []);

	return (
		<>
			<IconBreadcrumbs
				urls={[{ name: 'trabajadores', url: '/trabajadores' }]}
			/>
			<Box sx={{ paddingBottom: 1 }}>
				<ButtonBox
					text="Carga Masiva"
					icon="add"
					type="default"
					stylingMode="contained"
					onClick={() => navigate('/trabajadores/carga-masiva')}
				/>
			</Box>
			{/* <Container> */}
			<Box>
				<DataGridCustom
					dataStore={trabajadoresStore}
					addButton={buttonAddGrid}
					adding={false}
					updating={true}
					deleting={true}
					pageSize={10}
					columnCount={t('common.dni')}
					fileNameReport={t('trabajadores.excel')}
				>
					<Column dataField="codTrabajador" caption={t('common.dni')} />
					<Column dataField="nombres" caption={t('common.nombres')} />
					<Column
						dataField="primerApellido"
						caption={t('common.primerApellido')}
					/>
					<Column
						dataField="segundoApellido"
						caption={t('common.segundoApellido')}
					/>
					<Column
						dataField="nombreSocial"
						caption={t('common.nombreSocial')}
						visible={false}
					/>
					<Column
						dataField="nemoTecnico"
						caption={t('common.nemoTecnico')}
						visible={false}
					/>
					<Column
						dataField="codsexso"
						caption={t('common.sexo')}
						visible={false}
					>
						<Lookup
							dataSource={sexos}
							valueExpr="codSexso"
							displayExpr="sexo"
						/>
					</Column>
					<Column
						dataField="telefono1"
						caption={t('trabajadores.telefono1')}
						visible={false}
					/>
					<Column
						dataField="telefono2"
						caption={t('trabajadores.telefono2')}
						visible={false}
					/>

					<Column
						dataField="email"
						caption={t('common.email')}
						visible={false}
					/>
					<Column dataField="codContratista" caption={t('common.contratista')}>
						<Lookup
							dataSource={contratistas}
							valueExpr="codContratista"
							displayExpr="nombre"
						/>
					</Column>
					<Column dataField="codCuadrilla" caption={t('cuadrillas.title')}>
						<Lookup
							dataSource={cuadrillas}
							valueExpr="codCuadrilla"
							displayExpr="cuadrilla"
						/>
					</Column>
					<Column dataField="codPais" caption={t('common.pais')}>
						<Lookup
							dataSource={paises}
							valueExpr="codPais"
							displayExpr="pais"
						/>
					</Column>

					<Column
						dataField="codEstadoCivil"
						caption={t('trabajadores.estadoCivil')}
						visible={false}
					>
						<Lookup
							dataSource={estadosCiviles}
							valueExpr="codEstadoCivil"
							displayExpr="estadoCivil"
						/>
					</Column>

					<Column
						dataField="codBanco"
						caption={t('trabajadores.banco')}
						visible={false}
					>
						<Lookup
							dataSource={bancos}
							valueExpr="codBanco"
							displayExpr="banco"
						/>
					</Column>

					<Column
						dataField="codTipoCuenta"
						caption={t('trabajadores.tipoCuenta')}
						visible={false}
					/>
					<Column
						dataField="numeroCuenta"
						caption={t('trabajadores.numeroCuenta')}
						visible={false}
					/>
					<Column
						dataField="codFormaPago"
						caption={t('trabajadores.formaPago')}
						visible={false}
					>
						<Lookup
							dataSource={formatosPago}
							valueExpr="codFormaPago"
							displayExpr="formasPagos"
						/>
					</Column>
					<Column
						dataField="codObjetado"
						caption={t('trabajadores.objetado')}
						dataType="boolean"
						defaultValue={1}
					/>
					<Column dataField="codEstado" caption={t('common.estado')}>
						<Lookup
							dataSource={estados}
							valueExpr="codEstado"
							displayExpr="estado"
						/>
					</Column>
					<Column type="buttons" width={110}>
						<Button
							name="edit"
							onClick={(e) =>
								navigate(`/trabajadores/actualizar/${e.row.data.codTrabajador}`)
							}
						/>
						<Button name="delete" />
						<Button
							icon="info"
							onClick={(e) =>
								navigate(`/trabajadores/vista/${e.row.data.codTrabajador}`)
							}
						/>
					</Column>
				</DataGridCustom>
			</Box>
			{/* </Container> */}
		</>
	);
};
