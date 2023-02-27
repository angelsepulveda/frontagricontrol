import { Typography } from '@mui/material';
import { TextBox } from 'devextreme-react';
import { PatternRule } from 'devextreme-react/data-grid';
import {
	RequiredRule,
	StringLengthRule,
	Validator,
} from 'devextreme-react/validator';
import { useTranslation } from 'react-i18next';

export const InputComponent = (props) => {
	const [t] = useTranslation('global');
	const {
		value,
		name,
		accessKey,
		handleChangeEvent,
		required,
		maxLength,
		label,
		style,
		patternRule,
		messagePatternRule,
		disabled,
	} = props;
	return (
		<>
			<Typography variant="body1" sx={style}>
				{label}
			</Typography>
			<TextBox
				value={value}
				name={name}
				onChange={handleChangeEvent}
				accessKey={accessKey}
				disabled={
					disabled !== undefined || disabled !== null ? disabled : false
				}
			>
				<Validator>
					{required ? <RequiredRule message={t('validations.required')} /> : ''}
					{maxLength !== undefined ? (
						<StringLengthRule
							message={t('validations.maxLength', {
								max: maxLength.toString(),
							})}
							max={maxLength}
						/>
					) : (
						''
					)}
					{patternRule !== undefined ? (
						<PatternRule message={messagePatternRule} pattern={patternRule} />
					) : (
						''
					)}
				</Validator>
			</TextBox>
		</>
	);
};

