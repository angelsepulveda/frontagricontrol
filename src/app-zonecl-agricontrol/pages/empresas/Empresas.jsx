import { Button, Column, Lookup } from 'devextreme-react/data-grid';
import { useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';

import { DataGridCustom } from '../../../shared/components/controls';
import IconBreadcrumbs from '../../../shared/components/navigations/IconBreadcrumbs';
import { tabTitle } from '../../../shared/helpers/headerTitle';
import { fetchCajasCompensaciones } from '../../../shared/store/slices/cajasCompensaciones';
import { setEmpresasList } from '../../../shared/store/slices/empresas';
import { fetchEstados } from '../../../shared/store/slices/estados';
import { fetchMutualidades } from '../../../shared/store/slices/mutualidades';
import useEmpresas from '../../hooks/empresas/useEmpresas';

export const Empresas = () => {
	const navigate = useNavigate();
	const [t] = useTranslation('global');

	const title = t('empresas.title').toString();

	tabTitle(`AgriControl - ${title}`);

	const dispatch = useDispatch();

	const { list: estados } = useSelector((state) => state.estados);
	const { listSelect: mutualidades } = useSelector(
		(state) => state.mutualidades,
	);
	const { listSelect: cajasCompensaciones } = useSelector(
		(state) => state.cajasCompensaciones,
	);

	const { loadData, empresasStore, buttonAddGrid, empresas } = useEmpresas();

	useEffect(() => {
		loadData();
		if (estados.length <= 0) dispatch(fetchEstados());

		dispatch(fetchCajasCompensaciones());
		dispatch(fetchMutualidades());
	}, []);

	useEffect(() => {
		dispatch(setEmpresasList(empresas));
	}, [empresas]);

	return (
		<>
			<IconBreadcrumbs urls={[{ name: 'empresas', url: '/empresas' }]} />
			{/* <Container> */}
			<DataGridCustom
				dataStore={empresasStore}
				addButton={buttonAddGrid}
				adding={false}
				updating={true}
				deleting={true}
				pageSize={10}
				columnCount={t('common.razonSocial')}
				fileNameReport={t('empresas.excel')}
			>
				<Column
					dataField="razonSocial"
					caption={t('common.razonSocial')}
					width={200}
				/>

				<Column dataField="dni" caption={t('common.dni')} width={100} />

				<Column dataField="giro" caption={t('common.giro')} width={100} />

				<Column
					dataField="nemoTecnico"
					caption={t('common.nemoTecnico')}
					width={100}
				/>
				<Column
					dataField="repLegal"
					caption={t('empresas.representanteLegal')}
					width={200}
				/>
				<Column
					dataField="dniRepLegal"
					caption={t('empresas.dniRepresentanteLegal')}
					width={200}
				/>
				<Column
					dataField="codMutualidad"
					caption={t('empresas.mutualidad')}
					width={200}
				>
					<Lookup
						dataSource={mutualidades}
						valueExpr="codMutualidad"
						displayExpr="mutualidad"
					/>
				</Column>
				<Column
					dataField="codCajaCompensacion"
					caption={t('empresas.cajaCompensacion')}
					width={200}
				>
					<Lookup
						dataSource={cajasCompensaciones}
						valueExpr="codCajaCompensacion"
						displayExpr="cajaCompensacion"
					/>
				</Column>
				<Column
					dataField="factorCajaCompensacion"
					caption={t('empresas.factorCajaCompensacion')}
					dataType="number"
					width={100}
				/>
				<Column
					dataField="ajustarSueldoMinimo"
					caption={t('empresas.ajustarSueldoMinimo')}
					dataType="boolean"
					defaultValue={1}
					width={150}
				/>
				<Column dataField="codEstado" caption={t('common.estado')} width={100}>
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
							navigate(`/empresas/actualizar/${e.row.data.codEmpresa}`)
						}
					/>
					<Button name="delete" />
				</Column>
			</DataGridCustom>
			{/* </Container> */}
		</>
	);
};
