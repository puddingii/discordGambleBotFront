// quires/useTodosQuery.ts
// useQuery에서 사용할 UniqueKey를 상수로 선언하고 export로 외부에 노출합니다.
// 상수로 UniqueKey를 관리할 경우 다른 컴포넌트 (or Custom Hook)에서 쉽게 참조가 가능합니다.
export const QUERY_KEY = {
	login: `${process.env.REACT_APP_BACK_API}/auth`,
	logout: `${process.env.REACT_APP_BACK_API}/auth`,
	isLogin: `${process.env.REACT_APP_BACK_API}/auth/is-login`,
};

export default {};
