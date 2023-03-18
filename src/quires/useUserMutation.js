import axios from 'axios';
import { useMutation, useQueryClient } from 'react-query';
import { QUERY_KEY as userQueryKey } from './useUserQuery';
// useMutation에서 사용할 `서버에 Side Effect를 발생시키기 위해 사용할 함수`
// 이 함수의 파라미터로는 useMutation의 `mutate` 함수의 파라미터가 전달됩니다.

const giveMoneyFetcher = contents =>
	axios.patch(userQueryKey.giveMoney, contents, { withCredentials: true });

export const useGiveMoneyMutation = () => {
	const queryClient = useQueryClient();
	return useMutation(giveMoneyFetcher, {
		onSuccess: () => {
			queryClient.invalidateQueries(userQueryKey.giveMoney);
		},
	});
};

export default { useGiveMoneyMutation };
