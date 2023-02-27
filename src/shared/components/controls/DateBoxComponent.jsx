import Typography from '@mui/material/Typography';
import { DateBox } from 'devextreme-react';
import { RequiredRule, Validator } from 'devextreme-react/validator';
import { useTranslation } from 'react-i18next';

export const DateBoxComponent = (props) => {
	const [t] = useTranslation('global');
	const { handleChangeEvent,value,required,label,text } = props;
	if(text !== undefined) {
		return (
			<>
				<DateBox onValueChanged={handleChangeEvent} value={value} labelMode="floating" label={text}>
					<Validator>
						{required ? <RequiredRule message={t('validations.required')} /> : ''}
					</Validator>
				</DateBox>
			</>
		);
	}else{
		return (
			<>
				<Typography variant="body1">{label}</Typography>
				<DateBox onValueChanged={handleChangeEvent} value={value}>
					<Validator>
						{required ? <RequiredRule message={t('validations.required')} /> : ''}
					</Validator>
				</DateBox>
			</>
		);
	}
};

