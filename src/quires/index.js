import { useQuery, useMutation } from 'react-query';
import { useSetRecoilState } from 'recoil';
import { isLoggedIn, myNickname } from 'recoils/user';

export const useLoginQuery = (queryKey, queryFetcher, options = {}) => {
	const { onError } = options;
	const setMyNickname = useSetRecoilState(myNickname);
	const setIsLoggedIn = useSetRecoilState(isLoggedIn);

	return useQuery(queryKey, queryFetcher, {
		...options,
		onError: e => {
			if (e?.response?.status === 403) {
				console.log('?');
				setMyNickname(() => '');
				setIsLoggedIn(() => false);
			}
			if (typeof onError === 'function') {
				options.onError();
			}
		},
	});
};

export const useLoginMutation = (queryFetcher, options = {}) => {
	const { onError } = options;
	const setMyNickname = useSetRecoilState(myNickname);
	const setIsLoggedIn = useSetRecoilState(isLoggedIn);

	return useMutation(queryFetcher, {
		...options,
		onError: e => {
			if (e?.response?.status === 403) {
				setMyNickname(() => '');
				setIsLoggedIn(() => false);
			}
			if (typeof onError === 'function') {
				options.onError();
			}
		},
	});
};
