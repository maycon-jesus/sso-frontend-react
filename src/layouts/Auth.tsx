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
  console.log("layout render");
  if (!logged.loading && logged.logged) {
    router.push("/minha-conta");
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
