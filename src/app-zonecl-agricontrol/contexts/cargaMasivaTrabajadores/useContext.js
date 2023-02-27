import { createContext, useContext } from 'react';

export const CargaMasivaTrabajadoresContext = createContext();

export const useCargaMasivaTrabajadoresContext = () => {
	const context = useContext(CargaMasivaTrabajadoresContext);

	if (!context)
		throw new Error('El componente compuesto no se puede ser renderizado');

	return context;
};
