import axios from 'axios';
import { useMutation, useQueryClient } from 'react-query';
import { isLoggedIn, myNickname } from 'recoils/user';
import { useSetRecoilState } from 'recoil';
import { QUERY_KEY as userQueryKey } from './useUserQuery';
// useMutation에서 사용할 `서버에 Side Effect를 발생시키기 위해 사용할 함수`
// 이 함수의 파라미터로는 useMutation의 `mutate` 함수의 파라미터가 전달됩니다.

const giveMoneyFetcher = contents =>
	axios.patch(userQueryKey.giveMoney, contents, { withCredentials: true });

export const useGiveMoneyMutation = () => {
	const queryClient = useQueryClient();
	const setMyNickname = useSetRecoilState(myNickname);
	const setIsLoggedIn = useSetRecoilState(isLoggedIn);
	return useMutation(giveMoneyFetcher, {
		onSuccess: () => {
			queryClient.invalidateQueries(userQueryKey.giveMoney);
		},
		onError: e => {
			if (e?.response?.status === 403) {
				setMyNickname(() => '');
				setIsLoggedIn(() => false);
			}
		},
	});
};

const getGrantMoneyFetch = () =>
	axios.patch(userQueryKey.getGrantMoney, null, { withCredentials: true });

export const useGetGrantMoneyMutation = () => {
	const queryClient = useQueryClient();
	const setMyNickname = useSetRecoilState(myNickname);
	const setIsLoggedIn = useSetRecoilState(isLoggedIn);
	return useMutation(getGrantMoneyFetch, {
		onSuccess: () => {
			queryClient.invalidateQueries(userQueryKey.getGrantMoney);
		},
		onError: e => {
			if (e?.response?.status === 403) {
				setMyNickname(() => '');
				setIsLoggedIn(() => false);
			}
		},
	});
};

export default {
	useGiveMoneyMutation,
	useGetGrantMoneyMutation,
};
