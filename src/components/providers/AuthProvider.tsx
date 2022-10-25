import { useGetAuthUserData } from "states/hooks/auth/useGetAuthUserData";
import cookie from "js-cookie";
import { useRecoilState, useRecoilValue, useSetRecoilState } from "recoil";
import {
  useAuthLoggedLoadingState,
  useAuthLoggedState,
  useAuthUserDataState,
} from "states/Auth";
import { useEffect, useLayoutEffect } from "react";
import { useAuthLogout } from "states/hooks/auth/useAuthLogout";

export function AuthProvider() {
  const getAuthUserData = useGetAuthUserData();
  const doLogout = useAuthLogout();
  const [logged, setLogged] = useRecoilState(useAuthLoggedState);
  const [loadingLogged, setLoadingLogged] = useRecoilState(
    useAuthLoggedLoadingState
  );
  const token = cookie.get("AUTH_TOKEN");

  useLayoutEffect(() => {
    const token = cookie.get("AUTH_TOKEN");
    if (token && logged === true) {
      setLoadingLogged(true);

      getAuthUserData()
        .then(() => {
          setLoadingLogged(false);
        })
        .catch(() => {
          setLoadingLogged(false);
          doLogout();
        });
    } else if (!token) {
      setLoadingLogged(false);
    }
  }, [logged]);

  useLayoutEffect(() => {
    setLogged(true);
  }, []);

  return <></>;
}
