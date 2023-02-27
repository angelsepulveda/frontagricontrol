import { useEffect } from 'react';

const useAsync = (
	asyncFn,
	successFunction,
	returnFunction,
	dependencies = [],
) => {
	useEffect(() => {
		let isActive = true;
		asyncFn().then((result) => {
			if (isActive) successFunction(result);
		});
		return () => {
			returnFunction && returnFunction();
			isActive = false;
		};
	}, dependencies);
};

export default useAsync;
