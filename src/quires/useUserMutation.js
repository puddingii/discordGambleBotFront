import axios from 'axios';
import { useMutation, useQueryClient } from 'react-query';
import { QUERY_KEY as userQueryKey } from './useUserQuery';
// useMutation에서 사용할 `서버에 Side Effect를 발생시키기 위해 사용할 함수`
// 이 함수의 파라미터로는 useMutation의 `mutate` 함수의 파라미터가 전달됩니다.
const loginFetcher = contents =>
	axios.post(userQueryKey.login, contents, { withCredentials: true });
const logoutFetcher = contents =>
	axios.delete(userQueryKey.logout, { withCredentials: true });

export const useUserLoginMutation = () => {
	// mutation 성공 후 `useTodosQuery`로 관리되는 서버 상태를 다시 불러오기 위한
	// Cache 초기화를 위해 사용될 queryClient 객체
	const queryClient = useQueryClient();
	return useMutation(loginFetcher, {
		// mutate 요청이 성공한 후 queryClient.invalidateQueries 함수를 통해
		// useTodosQuery에서 불러온 API Response의 Cache를 초기화
		onSuccess: () => queryClient.invalidateQueries(userQueryKey.login),
	});
};

export const useUserLogoutMutation = () => {
	const queryClient = useQueryClient();
	return useMutation(logoutFetcher, {
		onSuccess: () => queryClient.invalidateQueries(userQueryKey.logout),
	});
};

export default { useUserLoginMutation, useUserLogoutMutation };
