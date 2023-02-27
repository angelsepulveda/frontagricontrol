import { TagBox } from 'devextreme-react';
import {
	Button,
	Column,
	Lookup,
	PatternRule,
	RequiredRule,
	StringLengthRule,
} from 'devextreme-react/data-grid';
import { Button as TextBoxButton, TextBox } from 'devextreme-react/text-box';
import { useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { useDispatch, useSelector } from 'react-redux';

import { DataGridCustom } from '../../components/controls';
import IconBreadcrumbs from '../../components/navigations/IconBreadcrumbs';
import { tabTitle } from '../../helpers/headerTitle';
import useUsuarios from '../../hooks/usuarios/useUsuarios';
import { fetchEstados } from '../../store/slices/estados';
export const Usuarios = () => {
	const [t] = useTranslation('global');

	const title = t('usuarios.title').toString();

	tabTitle(`AgriControl - ${title}`);

	const { list: estados } = useSelector((state) => state.estados);
	const dispatch = useDispatch();
	const {
		loadData,
		productores,
		usuariosStore,
		roles,
		campos,
		calculateFilterExpression,
		cellTemplate,
		passwordMode,
		setPasswordMode,
		buttonAddGrid,
		navigate,
	} = useUsuarios();

	useEffect(() => {
		if (estados.length <= 0) dispatch(fetchEstados());
		loadData();
	}, []);

	const CamposTaxBoxComponent = (props) => {
		const onValueChanged = (e) => {
			props.data.setValue(e.value);
		};

		const onSelectionChanged = () => {
			props.data.component.updateDimensions();
		};

		return (
			<TagBox
				dataSource={props.data.column.lookup.dataSource}
				defaultValue={props.data.value}
				valueExpr="codCampo"
				displayExpr="campo"
				showSelectionControls={true}
				maxDisplayedTags={3}
				showMultiTagOnly={false}
				applyValueMode="useButtons"
				searchEnabled={true}
				onValueChanged={onValueChanged}
				onSelectionChanged={onSelectionChanged}
			/>
		);
	};

	const PasswordComponent = (props) => {
		const onValueChanged = (e) => {
			props.data.setValue(e.value);
		};

		return (
			<TextBox
				name="password"
				value={props.data.value}
				placeholder="password"
				defaultValue={props.data.value}
				mode={passwordMode}
				onValueChanged={onValueChanged}
			>
				<TextBoxButton
					name="password"
					type="default"
					options={{
						icon: '/static/image/eye.png',
						type: 'default',
						onClick: () => {
							setPasswordMode(passwordMode === 'text' ? 'password' : 'text');
						},
					}}
				/>
			</TextBox>
		);
	};

	return (
		<>
			<IconBreadcrumbs urls={[{ name: 'usuarios', url: '/usuarios' }]} />
			{/* <Container> */}
			<DataGridCustom
				dataStore={usuariosStore}
				adding={false}
				updating={true}
				deleting={true}
				pageSize={10}
				addButton={buttonAddGrid}
				columnCount={t('usuarios.productor')}
				fileNameReport={t('usuarios.excel')}
			>
				<Column dataField="codProductor" caption={t('usuarios.productor')}>
					<RequiredRule message={t('validations.required')} />
					<Lookup
						dataSource={productores}
						valueExpr="codProductor"
						displayExpr="nombre"
					/>
				</Column>

				<Column dataField="name" caption={t('common.nombre')}>
					<RequiredRule message={t('validations.required')} />
					<StringLengthRule
						message={t('validations.maxLength', { max: '100' })}
						max={100}
					/>
				</Column>

				<Column dataField="avatar" caption={t('usuarios.avatar')} />
				<Column dataField="email" caption={t('common.email')} dataType="string">
					<RequiredRule message={t('validations.required')} />
					<PatternRule
						message={t('validations.email')}
						pattern={/^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/}
					/>
				</Column>
				<Column
					dataField="password"
					caption={t('common.password')}
					datype="string"
					editCellComponent={PasswordComponent}
				/>
				<Column dataField="role" caption={t('usuarios.rol')}>
					<RequiredRule message={t('validations.required')} />
					<Lookup dataSource={roles} valueExpr="id" displayExpr="nombre" />
				</Column>

				<Column
					dataField="campos"
					caption={t('common.campos')}
					editCellComponent={CamposTaxBoxComponent}
					calculateFilterExpression={calculateFilterExpression}
					cellTemplate={cellTemplate}
				>
					<Lookup
						dataSource={campos}
						displayExpr="campo"
						valueExpr="codCampo"
					/>
				</Column>

				<Column dataField="isActive" caption={t('common.estado')}>
					<RequiredRule message={t('validations.required')} />
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
							navigate(`/usuarios/actualizar/${e.row.data.userId}`)
						}
					/>
					<Button name="delete" />
				</Column>
			</DataGridCustom>
			{/* </Container> */}
		</>
	);
};
