import { setApiToken } from "libs/api";
import { useGetAuthUserData } from "states/hooks/auth/useGetAuthUserData";
import cookie from "js-cookie";
import { useRecoilValue, useSetRecoilState } from "recoil";
import { useAuthLoggedState, useAuthTokenState } from "states/Auth";
import { useEffect, useLayoutEffect } from "react";
import { useAuthLogout } from "states/hooks/auth/useAuthLogout";

export function AuthProvider() {
  const tokenState = useRecoilValue(useAuthTokenState);
  const getAuthUserData = useGetAuthUserData();
  const doLogout = useAuthLogout();
  const setLogged = useSetRecoilState(useAuthLoggedState);
  const token = tokenState || cookie.get("AUTH_TOKEN");

  useEffect(() => {
    if (token) {
      setLogged({
        loading: true,
        logged: false,
      });
      setApiToken(token);
      getAuthUserData()
        .then(() => {
          setLogged({
            logged: true,
            loading: false,
          });
        })
        .catch(() => {
          doLogout();
        });
    }

    if (tokenState) {
      cookie.set("AUTH_TOKEN", tokenState);
    }
  }, [tokenState]);

  return <></>;
}
