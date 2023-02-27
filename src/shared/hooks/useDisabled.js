import { useState } from 'react';

const useDisabled = () => {
	const [isActive, setIsActive] = useState(true);

	const handleIsActiveOpen = () => setIsActive(true);

	const handleIsActiveClose = () => setIsActive(false);

	return {
		isActive,
		handleIsActiveOpen,
		handleIsActiveClose,
	};
};

export default useDisabled;
