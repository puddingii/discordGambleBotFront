export const getStockName = type => {
	switch (type) {
		case 'stock':
			return '주식';
		case 'coin':
			return '코인';
		default:
			return '알수없음';
	}
};

export default {
	getStockName,
};
