import '../../../assets/css/shared/components/graficos.css';

const TooltipGraficos = (arg) => {
	return (
		<div className="state-tooltip">
			<h4 className="state">{`${arg.argumentText}`}</h4>
			<div className="capital">
				<span className="caption"></span>
				{arg.originalValue.toString()} {`${arg.point.data.unidadMedida}`}
			</div>
		</div>
	);
};

export default TooltipGraficos;
