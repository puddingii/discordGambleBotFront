// quires/useTodosQuery.ts
import axios from 'axios';
import { useQuery } from 'react-query';
// useQuery에서 사용할 UniqueKey를 상수로 선언하고 export로 외부에 노출합니다.
// 상수로 UniqueKey를 관리할 경우 다른 컴포넌트 (or Custom Hook)에서 쉽게 참조가 가능합니다.
export const QUERY_KEY = {
	get: `${process.env.REACT_APP_BACK_API}/user`,
	myStockList: `${process.env.REACT_APP_BACK_API}/user/stocklist`,
	myWeaponList: `${process.env.REACT_APP_BACK_API}/user/weaponlist`,
	myStock: `${process.env.REACT_APP_BACK_API}/user/stock?`,
	updateStock: `${process.env.REACT_APP_BACK_API}/user/stock?`,
	userNicknameList: `${process.env.REACT_APP_BACK_API}/user/nicklist?`,
	giveMoney: `${process.env.REACT_APP_BACK_API}/user/give/money`,
};

// useQuery에서 사용할 `서버의 상태를 불러오는데 사용할 Promise를 반환하는 함수`
const getUserInfoFetcher = () =>
	axios.get(QUERY_KEY.get, { withCredentials: true }).then(({ data }) => data);
export const useGetUserInfoQuery = () => {
	return useQuery(QUERY_KEY.get, getUserInfoFetcher, { refetchOnWindowFocus: false });
};

const getMyStockList = () =>
	axios.get(QUERY_KEY.myStockList, { withCredentials: true }).then(({ data }) => data);
export const useGetUserStockListQuery = () => {
	return useQuery(QUERY_KEY.myStockList, getMyStockList, { refetchOnWindowFocus: false });
};

const getMyWeaponList = () =>
	axios.get(QUERY_KEY.myWeaponList, { withCredentials: true }).then(({ data }) => data);
export const useGetUserWeaponListQuery = () => {
	return useQuery(QUERY_KEY.myWeaponList, getMyWeaponList, {
		refetchOnWindowFocus: false,
	});
};

const getUserNicknameList = () =>
	axios
		.get(QUERY_KEY.userNicknameList, { withCredentials: true })
		.then(({ data }) => data);
export const useGetUserNicknameListQuery = () => {
	return useQuery(QUERY_KEY.userNicknameList, getUserNicknameList, {
		refetchOnWindowFocus: false,
	});
};

export default {
	useGetUserInfoQuery,
	useGetUserStockListQuery,
	useGetUserWeaponListQuery,
	useGetUserNicknameListQuery,
};
