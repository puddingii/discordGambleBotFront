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

export default { setComma };
