import { Grid, Typography } from '@mui/material';
import { Button, TagBox, ValidationSummary } from 'devextreme-react';
import { Button as TextBoxButton, TextBox } from 'devextreme-react/text-box';
import { RequiredRule, Validator } from 'devextreme-react/validator';
import { useTranslation } from 'react-i18next';
import { useParams } from 'react-router-dom';

import SkeletonFormUsuarios from '../../components/usuarios/SkeletonFormUsuarios';
import useFormUsuarios from '../../hooks/usuarios/useFormUsuarios';
import { InputComponent, SelectComponent } from './../../components/controls';
import IconBreadcrumbs from './../../components/navigations/IconBreadcrumbs';

export const FormUsuarios = () => {
	const { id } = useParams();
	const {
		userLogin,
		url,
		loading,
		handleChangeProductor,
		productores,
		handleChangeUser,
		setPasswordMode,
		passwordMode,
		roles,
		handleChangeRole,
		userForm,
		handleChangeCampos,
		campos,
		estados,
		navigate,
		handleChangeEstado,
		handleSave,
		userId,
	} = useFormUsuarios(id);
	const [t] = useTranslation('global');

	if (loading) {
		return <SkeletonFormUsuarios />;
	} else {
		return (
			<>
				<IconBreadcrumbs urls={url} />
				<Grid container spacing={2} sx={{ padding: 5, alignItems: 'center' }}>
					<Grid
						xs={12}
						item={true}
						sx={{ paddingBottom: 1, borderBottom: '1px solid #e9ecef' }}
					>
						<Typography variant="h3">{t('usuarios.formulario')}</Typography>
						<Grid xs={12} item={true} sx={{ minHeight: 350 }}>
							<form action="" onSubmit={handleSave}>
								<Grid spacing={2} container sx={{ padding: 2 }}>
									{userLogin && userLogin.role === 0 ? (
										<Grid md={12} xs={12} sm={12} lg={4} item={true}>
											<SelectComponent
												dataSource={productores}
												style={{ padding: '5px' }}
												displayExpr={'nombre'}
												valueExpr={'codProductor'}
												label={t('usuarios.productor')}
												value={userForm.codProductor}
												valueChangedEvent={handleChangeProductor}
												required={true}
											/>
										</Grid>
									) : (
										<></>
									)}
									<Grid md={12} xs={12} sm={12} lg={4} item={true}>
										<InputComponent
											value={userForm.name}
											name={'name'}
											label={t('common.nombre')}
											handleChangeEvent={handleChangeUser}
											required={true}
											maxLength={100}
											style={{ padding: '5px' }}
										/>
									</Grid>
									<Grid md={12} xs={12} sm={12} lg={4} item={true}>
										<InputComponent
											value={userForm.email}
											name={'email'}
											label={t('common.email')}
											handleChangeEvent={handleChangeUser}
											required={true}
											maxLength={100}
											style={{ padding: '5px' }}
										/>
									</Grid>
									<Grid md={12} xs={12} sm={12} lg={4} item={true}>
										<Typography variant="body1" sx={{ padding: '5px' }}>
											{t('common.password')}
										</Typography>
										<TextBox
											name="password"
											value={userForm.password}
											placeholder="password"
											mode={passwordMode}
											onChange={handleChangeUser}
										>
											<TextBoxButton
												name="password"
												type="default"
												options={{
													icon: '/static/image/eye.png',
													type: 'default',
													onClick: () => {
														setPasswordMode(
															passwordMode === 'text' ? 'password' : 'text',
														);
													},
												}}
											/>
											<Validator>
												{userId === null ? (
													<RequiredRule message={t('validations.required')} />
												) : (
													''
												)}
											</Validator>
										</TextBox>
									</Grid>
									<Grid md={12} xs={12} sm={12} lg={4} item={true}>
										<SelectComponent
											dataSource={roles}
											style={{ padding: '5px' }}
											displayExpr={'nombre'}
											valueExpr={'id'}
											label={t('usuarios.rol')}
											value={userForm.role}
											valueChangedEvent={handleChangeRole}
											required={true}
										/>
									</Grid>
									<Grid md={12} xs={12} sm={12} lg={4} item={true}>
										<Typography variant="body1" sx={{ padding: '5px' }}>
											{t('common.campos')}
										</Typography>

										<TagBox
											dataSource={campos}
											defaultValue={userForm.campos}
											valueExpr="codCampo"
											displayExpr="campo"
											showSelectionControls={true}
											maxDisplayedTags={3}
											showMultiTagOnly={false}
											applyValueMode="useButtons"
											searchEnabled={true}
											onValueChanged={handleChangeCampos}
										>
											<Validator>
												{(userLogin && userLogin.role !== 0) ||
												userForm.role !== 0 ? (
													<RequiredRule message={t('validations.required')} />
												) : (
													''
												)}
											</Validator>
										</TagBox>
									</Grid>
									<Grid md={12} xs={12} sm={12} lg={4} item={true}>
										<SelectComponent
											dataSource={estados}
											style={{ padding: '5px' }}
											displayExpr={'estado'}
											valueExpr={'codEstado'}
											label={t('common.estado')}
											value={userForm.codEstado}
											valueChangedEvent={handleChangeEstado}
											required={true}
										/>
									</Grid>
								</Grid>
								<Grid
									spacing={2}
									container
									sx={{
										paddingLeft: 2,
										marginTop: 4,
										paddingTop: 0,
										borderTop: '1px solid #e9ecef',
									}}
								>
									<Grid
										xs={12}
										md={12}
										sm={12}
										lg={6}
										item={true}
										sx={{ marginTop: 2 }}
									>
										<ValidationSummary visible={false}></ValidationSummary>
										<Button
											width="100%"
											height={38}
											text={t('common.guardar')}
											type="default"
											stylingMode="contained"
											useSubmitBehavior={true}
										/>
									</Grid>
									<Grid
										xs={12}
										md={12}
										sm={12}
										lg={6}
										item={true}
										sx={{ marginTop: 2 }}
									>
										<Button
											width="100%"
											height={38}
											text={t('common.cancelar')}
											type="danger"
											stylingMode="contained"
											onClick={() => navigate('/usuarios')}
										/>
									</Grid>
								</Grid>
							</form>
						</Grid>
					</Grid>
				</Grid>
			</>
		);
	}
};
