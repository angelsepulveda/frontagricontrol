import { Typography } from '@mui/material';
import { SelectBox } from 'devextreme-react';
import { RequiredRule, Validator } from 'devextreme-react/validator';
import { useTranslation } from 'react-i18next';

export const SelectComponent = (props) => {
	const [t] = useTranslation('global');
	const {
		dataSource,
		displayExpr,
		valueExpr,
		value,
		searchExpr,
		name,
		valueChangedEvent,
		selectionChangedEvent,
		label,
		style,
		required,
		accessKey,
		disabled,
		clearButton,
		id,
		text,
		defaultValue,
	} = props;

	if (valueChangedEvent !== undefined) {
		return (
			<>
				<Typography variant="body1" sx={style}>
					{label}
				</Typography>
				<SelectBox
					dataSource={dataSource}
					displayExpr={displayExpr}
					valueExpr={valueExpr}
					accessKey={accessKey}
					label={text}
					value={value}
					defaultValue={defaultValue}
					searchEnabled={true}
					searchExpr={searchExpr}
					showClearButton={clearButton !== null}
					disabled={
						disabled !== undefined || disabled !== null ? disabled : false
					}
					name={name}
					onValueChanged={valueChangedEvent}
				>
					<Validator>
						{required ? (
							<RequiredRule message={t('validations.required')} />
						) : (
							''
						)}
					</Validator>
				</SelectBox>
			</>
		);
	} else {
		return (
			<>
				<Typography variant="body1" sx={style}>
					{label}
				</Typography>
				<SelectBox
					id={id}
					dataSource={dataSource}
					displayExpr={displayExpr}
					valueExpr={valueExpr}
					accessKey={accessKey}
					defaultValue={defaultValue}
					value={value}
					searchEnabled={true}
					searchExpr={searchExpr}
					showClearButton={clearButton !== null}
					name={name}
					disabled={
						disabled !== undefined || disabled !== null ? disabled : false
					}
					onSelectionChanged={selectionChangedEvent}
				>
					<Validator>
						<RequiredRule message={t('validations.required')} />
					</Validator>
				</SelectBox>
			</>
		);
	}
};
