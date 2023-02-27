import { useEffect } from 'react';

import useModal from '../../../shared/hooks/useModal';

const useDataGridTrabajadoresCuadrilla = (
	trabajadores,
	loadDataTrabajadoresCuadrillas,
) => {
	const { open, handleOpen, handleClose } = useModal();

	useEffect(() => {
		loadDataTrabajadoresCuadrillas(trabajadores);
	}, []);

	return {
		open,
		handleClose,
		handleOpen,
	};
};

export default useDataGridTrabajadoresCuadrilla;
