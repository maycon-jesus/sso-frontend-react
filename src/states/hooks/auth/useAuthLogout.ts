import { useAuthTokenState } from './../../Auth';
import { useSetRecoilState } from "recoil";
import { useAuthLoggedState, useAuthUserDataState } from "states/Auth";
import cookie from "js-cookie"

export function useAuthLogout() {
  const setUserData = useSetRecoilState(useAuthUserDataState);
  const setLogged = useSetRecoilState(useAuthLoggedState);
  const setToken = useSetRecoilState(useAuthTokenState);

  return () => {
    cookie.remove('AUTH_TOKEN')
    setLogged({
      loading:false,
      logged:false
    })
    setUserData(null)
    setToken(null)
  };
}
