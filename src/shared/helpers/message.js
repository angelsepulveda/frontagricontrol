import '@sweetalert2/theme-material-ui/material-ui.css';

import { toast } from 'react-toastify';
import Swal from 'sweetalert2';

import i18next from '../config/translation';

const messageError = (message) => {
	i18next.setDefaultNamespace('global');
	Swal.fire({
		icon: 'error',
		title: i18next.t('common.errores'),
		text: message,
		confirmButtonText: i18next.t('common.aceptar'),
	});
};

const messageSuccess = (message) => {
	toast.success(message, {
		position: toast.POSITION.TOP_CENTER,
	});
};

const messageValidation = (messages) => {
	i18next.setDefaultNamespace('global');
	Swal.fire({
		icon: 'error',
		title: i18next.t('common.erroresValidaciones'),
		text: messages.map((message) => message.value),
		confirmButtonText: i18next.t('common.aceptar'),
	});
};

const messageConfirm = async (message, action) => {
	Swal.fire({
		title: 'Esta seguro(a)?',
		text: message.text,
		icon: 'warning',
		showCancelButton: true,
		cancelButtonText: 'Cancelar',
		confirmButtonColor: '#d33',
		cancelButtonColor: '#3A6F99',
		confirmButtonText: message.confirmButtonText,
	}).then((result) => {
		if (result.isConfirmed) {
			action().then((result) => {});
		}
	});
};

export { messageConfirm, messageError, messageSuccess, messageValidation };
