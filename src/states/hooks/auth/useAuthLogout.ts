import { useRouter } from 'next/router';
import { useSetRecoilState } from "recoil";
import { useAuthLoggedState, useAuthUserDataState } from "states/Auth";
import cookie from "js-cookie"

export function useAuthLogout() {
  const setUserData = useSetRecoilState(useAuthUserDataState);
  const setLogged = useSetRecoilState(useAuthLoggedState);
  const router = useRouter()

  return () => {
    cookie.remove('AUTH_TOKEN')
    setLogged(false)
    setUserData(null)
    router.push('/')
  };
}
