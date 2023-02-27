import {
	Home,
	Regularizacion,
} from '../../components/regularizacionProduccion';
import { Pages, Wizard } from '../../components/wizard';
import { initialState, reducer } from '../../contexts/cosechas';

Wizard.Pages = Pages;

const RegularizacionProduccion = () => {
	return (
		<>
			<Wizard initialState={initialState} reducer={reducer}>
				<Wizard.Pages>
					<Home />
					<Regularizacion />
				</Wizard.Pages>
			</Wizard>
		</>
	);
};

export default RegularizacionProduccion;
