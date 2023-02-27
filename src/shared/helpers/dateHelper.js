const formatDate = (currentDatetime) => {
	return (
		currentDatetime.getFullYear() +
		'-' +
		(currentDatetime.getMonth() + 1) +
		'-' +
		currentDatetime.getDate()
	);
};

const formatDateVista = (currentDateTime) => {
	return (
		currentDateTime.getDate().toString().padStart(2, '0') +
		'/' +
		(currentDateTime.getMonth() + 1).toString().padStart(2, '0') +
		'/' +
		currentDateTime.getFullYear()
	);
};

export default { formatDate, formatDateVista };
