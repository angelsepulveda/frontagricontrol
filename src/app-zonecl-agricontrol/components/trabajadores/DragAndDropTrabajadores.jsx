import useDragAndDropTrabajadores from '../../hooks/trabajadores/useDragAndDropTrabajadores';

const DragAndDropTrabajadores = (props) => {
	const { contratistas, cuadrillas, setIsLoading, sexos } =
		props;

	const { getRootProps, getInputProps, files, errorMessage } =
		useDragAndDropTrabajadores(
			contratistas,
			cuadrillas,
			setIsLoading,
			sexos,
		);

	const filesList = files.map((file) => (
		<li key={file.name}>
			<span>
				<img src="/public/static/image/excel.png" className="logo-excel" />
				{file.name}
			</span>
		</li>
	));

	return (
		<>
			<div className="drag-area">
				<div {...getRootProps()} className="container">
					<input {...getInputProps()} />
					<h2>
						Arrastra y suelta tu archivo de Excel aquí, o haz clic para
						seleccionarlo
					</h2>
				</div>
			</div>
			<div className="file-name">
				<h4>Archivo seleccionado</h4>
				{errorMessage ? (
					<span className="error-message">{errorMessage}</span>
				) : (
					<span className="label-excel">{filesList}</span>
				)}
			</div>
		</>
	);
};

export default DragAndDropTrabajadores;
