import { atom, selector } from 'recoil';

export const isLoggedIn = atom({
	key: 'isLoggedIn',
	default: false,
});

export const myNickname = atom({
	key: 'myNickname',
	default: '',
});

export default {
	isLoggedIn,
	myNickname,
};
