import React from 'react';

/**
 * @example
 * setComma(1000000) // 1,000,000
 * setComma(1000000.123) // 1,000,000.123
 * setComma(1000000.123, true) // 1,000,000
 */
export const setComma = (num, isRemoveDecimal) => {
	if (!num) {
		return '0';
	}
	num = isRemoveDecimal ? Math.floor(Number(num)) : Number(num);
	num = num.toString();
	return num.replace(/(\d)(?=(?:\d{3})+(?!\d))/g, '$1,');
};

/**
 * @param {React.MutableRefObject} ref
 * @param {1 | 2 | 3 | 4 | 5} colorType
 * @param {string} message
 * @example
 * colorType
 * 1: primary
 * 2: success
 * 3: danger
 * 4: warning
 * 5: info
 */
export const notify = (ref, colorType, message) => {
	let type;
	switch (colorType) {
		case 1:
			type = 'primary';
			break;
		case 2:
			type = 'success';
			break;
		case 3:
			type = 'danger';
			break;
		case 4:
			type = 'warning';
			break;
		case 5:
			type = 'info';
			break;
		default:
			break;
	}
	const options = {
		place: 'tr',
		message: (
			<div>
				<div>{message}</div>
			</div>
		),
		type,
		icon: 'nc-icon nc-bell-55',
		autoDismiss: 7,
	};
	ref.current.notificationAlert(options);
};

export default { setComma, notify };
