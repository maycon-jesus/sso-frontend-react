import BtnColorModeChange from "components/BtnColorModeChange";
import { useRouter } from "next/router";
import { useRecoilValue } from "recoil";
import { useAuthLoggedState } from "states/Auth";

interface Props {
  children: React.ReactNode;
}

export function AuthLayout(props: Props): JSX.Element {
  const router = useRouter();
  const logged = useRecoilValue(useAuthLoggedState);
  if (
    ["/", "/registrar"].includes(router.pathname) &&
    !logged.loading &&
    logged.logged
  ) {
    router.push((router.query.redirectUrl as string) || "/minha-conta");
  }

  if (
    ["/oauth2"].includes(router.pathname) &&
    !logged.loading &&
    !logged.logged
  ) {
    router.push({
      pathname: "/",
      query: {
        redirectUrl: router.asPath,
      },
    });
  }

  return (
    // background="background2"
    <>
      <BtnColorModeChange></BtnColorModeChange>
      <main
        style={{
          minHeight: "100vh",
        }}
      >
        {props.children}
      </main>
    </>
  );
}
