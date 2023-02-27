import { Typography } from '@mui/material';
import { CheckBox } from 'devextreme-react/check-box';
import { RequiredRule } from 'devextreme-react/validator';
import { useTranslation } from 'react-i18next';

export const CheckBoxComponent = (props) => {
	const [t] = useTranslation('global');

	const { styles, label, value, name, valueChangedEvent, required, valueChangeEvent, id, disabled } = props;

	if(valueChangedEvent !== undefined){
		return (
			<>
				<Typography variant="body1" sx={styles}>
					{label}
				</Typography>
				<CheckBox value={value} name={name} onValueChanged={valueChangedEvent}>
					{required ? <RequiredRule message={t('validations.required')} /> : ''}
				</CheckBox>
			</>
		);
	}else{
		return (
			<>
				<Typography variant="body1" sx={styles}>
					{label}
				</Typography>
				<CheckBox value={value} name={name} onValueChange={valueChangeEvent} id={id} disabled={disabled}>
					{required ? <RequiredRule message={t('validations.required')} /> : ''}
				</CheckBox>
			</>
		);
	}
};

