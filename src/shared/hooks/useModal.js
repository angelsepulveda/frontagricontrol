import { useState } from 'react';

const useModal = () => {
	const [open, setOpen] = useState(false);
	const handleClose = () => setOpen(false);
	const handleOpen = () => setOpen(true);

	return {
		open,
		handleOpen,
		handleClose,
	};
};

export default useModal;
