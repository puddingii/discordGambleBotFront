// quires/useTodosQuery.ts
import axios from 'axios';
import { useQuery } from 'react-query';
import { useRecoilState } from 'recoil';
import { isLoggedIn } from 'recoils/user';
// useQuery에서 사용할 UniqueKey를 상수로 선언하고 export로 외부에 노출합니다.
// 상수로 UniqueKey를 관리할 경우 다른 컴포넌트 (or Custom Hook)에서 쉽게 참조가 가능합니다.
export const QUERY_KEY = {
	login: `${process.env.REACT_APP_BACK_API}/api/auth`,
	logout: `${process.env.REACT_APP_BACK_API}/api/auth`,
	isLogin: `${process.env.REACT_APP_BACK_API}/api/auth/is-login`,
	get: `${process.env.REACT_APP_BACK_API}/api/user`,
};
// useQuery에서 사용할 `서버의 상태를 불러오는데 사용할 Promise를 반환하는 함수`
const getUserFetcher = () =>
	axios.get(QUERY_KEY.get, { withCredentials: true }).then(({ data }) => data);
export const useGetUserQuery = () => {
	return useQuery(QUERY_KEY.get, getUserFetcher);
};

const getIsLoginFetcher = () =>
	axios.get(QUERY_KEY.isLogin, { withCredentials: true }).then(({ data }) => data);
export const useGetIsLoginQuery = () => {
	const [loginStatus, setLoginStatus] = useRecoilState(isLoggedIn);
	return useQuery(QUERY_KEY.isLogin, getIsLoginFetcher, {
		onSuccess: data => {
			setLoginStatus(data?.isLoggedIn ?? false);
		},
		refetchOnWindowFocus: false,
	});
};
export default { useGetUserQuery, getIsLoginFetcher };
