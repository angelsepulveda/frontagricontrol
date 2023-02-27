import { useEffect } from 'react';

const useFetchAndLoad = () => {
	let controller = null;

	const callEndpoint = async (axiosCall) => {
		if (axiosCall.controller) controller = axiosCall.controller;
		try {
			const { data } = await axiosCall.call;
			return data;
		} catch (err) {}
	};

	const cancelEndpoint = () => {
		controller && controller.abort();
	};

	useEffect(() => {
		return () => {
			cancelEndpoint();
		};
	}, []);

	return { callEndpoint };
};

export default useFetchAndLoad;
