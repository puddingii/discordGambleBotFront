import axios from 'axios';
import { useQueryClient } from 'react-query';
import { useLoginMutation } from 'quires';
import { QUERY_KEY as userQueryKey } from './useUserQuery';
// useMutation에서 사용할 `서버에 Side Effect를 발생시키기 위해 사용할 함수`
// 이 함수의 파라미터로는 useMutation의 `mutate` 함수의 파라미터가 전달됩니다.

const giveMoneyFetcher = contents =>
	axios.patch(userQueryKey.giveMoney, contents, { withCredentials: true });

export const useGiveMoneyMutation = () => {
	const queryClient = useQueryClient();
	return useLoginMutation(userQueryKey.giveMoney, giveMoneyFetcher, {
		onSuccess: () => {
			queryClient.invalidateQueries(userQueryKey.giveMoney);
		},
	});
};

const getGrantMoneyFetch = () =>
	axios.patch(userQueryKey.getGrantMoney, null, { withCredentials: true });

export const useGetGrantMoneyMutation = () => {
	const queryClient = useQueryClient();
	return useLoginMutation(getGrantMoneyFetch, {
		onSuccess: () => {
			queryClient.invalidateQueries(userQueryKey.getGrantMoney);
		},
	});
};

const getAllGiftMoney = () =>
	axios.patch(userQueryKey.getAllGiftMoney, null, { withCredentials: true });

export const useGetAllGiftMoneyMutation = () => {
	const queryClient = useQueryClient();
	return useLoginMutation(getAllGiftMoney, {
		onSuccess: () => {
			queryClient.invalidateQueries(userQueryKey.getAllGiftMoney);
		},
	});
};

export default {
	useGiveMoneyMutation,
	useGetGrantMoneyMutation,
};
