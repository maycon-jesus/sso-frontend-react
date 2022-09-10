import { $api } from "libs/api";
import { useSetRecoilState } from "recoil";
import { useAuthUserDataState } from "states/Auth";

export function useGetAuthUserData() {
  const setUserData = useSetRecoilState(useAuthUserDataState);

  return () => {
    return new Promise((resolve, reject) => {
      $api
        .get("/users/me")
        .then((data) => {
          setUserData(data.data);
          resolve(true);
        })
        .catch(reject);
    });
  };
}
