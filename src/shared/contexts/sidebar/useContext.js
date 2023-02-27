import { createContext, useContext } from 'react';

export const SidebarContext = createContext();

export const useSidebarContext = () => {
	const context = useContext(SidebarContext);

	if (!context)
		throw new Error('El componente compuesto no se puede ser renderizado');

	return context;
};
