import './index.css';
import './assets/css/shared/dx.material.theme-agricontrol.css';
import 'devextreme/dist/css/dx.material.lime.light.compact.css';
import 'react-toastify/dist/ReactToastify.css';
import './shared/interceptors/axios';

import { ThemeProvider } from '@mui/material/styles';
import React from 'react';
import ReactDOM from 'react-dom/client';
import { I18nextProvider } from 'react-i18next';
import { BrowserRouter } from 'react-router-dom';

import App from './App';
import theme from './shared/config/theme';
import i18next from './shared/config/translation';
ReactDOM.createRoot(document.getElementById('root')).render(
	<React.StrictMode>
		<ThemeProvider theme={theme}>
			<BrowserRouter>
				<I18nextProvider i18n={i18next}>
					<App />
				</I18nextProvider>
			</BrowserRouter>
		</ThemeProvider>
	</React.StrictMode>,
);
