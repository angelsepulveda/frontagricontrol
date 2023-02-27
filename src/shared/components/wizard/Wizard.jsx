import { Grid } from '@mui/material';
import { useCallback, useReducer } from 'react';

import {
	actions,
	combinReducer,
	defaultInitialState,
	defaultReducer,
	wizardReducer,
} from '../../contexts/wizard';
import { WizardContext } from '../../contexts/wizard/useContext';

export const Wizard = ({
	children,
	reducer = defaultReducer,
	initialState = defaultInitialState,
}) => {
	const [state, dispatch] = useReducer(combinReducer(wizardReducer, reducer), {
		...defaultInitialState,
		...initialState,
	});

	const goPrevPage = () => {
		dispatch({ type: actions.PREV_PAGE });
	};

	const goNextPage = () => {
		dispatch({ type: actions.NEXT_PAGE });
	};

	const setSteps = useCallback(
		(n) => {
			dispatch({ type: actions.SET_STEPS, payload: n });
		},
		[dispatch],
	);

	const context = {
		...state,
		dispatch,
		goNextPage,
		goPrevPage,
		setSteps,
	};

	return (
		<>
			<WizardContext.Provider value={context}>
				<Grid container spacing={2} sx={{ padding: 2, alignItems: 'center' }}>
					{children}
				</Grid>
			</WizardContext.Provider>
		</>
	);
};
