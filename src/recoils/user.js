import { atom, selector } from 'recoil';

export const userState = atom({
	key: 'userState',
	default: {
		isLoggedIn: false,
	},
});

export const loginStatus = selector({
	key: 'loginStatus',
	get: ({ get }) => {
		const user = get(userState);

		return user.isLoggedIn;
	},
});

export default {
	userState,
	loginStatus,
};
