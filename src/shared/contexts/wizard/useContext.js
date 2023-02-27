import { createContext, useContext } from 'react';

export const WizardContext = createContext();

export const useWizardContext = () => {
	const context = useContext(WizardContext);

	if (!context)
		throw new Error('El componente compuesto no se puede ser renderizado');

	return context;
};
