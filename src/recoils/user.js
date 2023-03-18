import { atom } from 'recoil';

const localStorageEffect =
	key =>
	({ setSelf, onSet }) => {
		const savedValue = localStorage.getItem(key);
		if (savedValue != null) {
			setSelf(JSON.parse(savedValue));
		}

		onSet((newValue, _, isReset) => {
			isReset
				? localStorage.removeItem(key)
				: localStorage.setItem(key, JSON.stringify(newValue));
		});
	};

export const isLoggedIn = atom({
	key: 'isLoggedIn',
	default: false,
	effects: [localStorageEffect('isLoggedIn')],
});

export const myNickname = atom({
	key: 'myNickname',
	default: '',
	effects: [localStorageEffect('myNickname')],
});

export default {
	isLoggedIn,
	myNickname,
};
