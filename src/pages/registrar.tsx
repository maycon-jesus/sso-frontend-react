import { CardRegister } from "components/auth/CardRegister/CardRegister";
import { HeadUtil } from "components/utils/HeadUtil";
import { AuthLayout } from "layouts/Auth";
import { NextPage } from "next";
import styles from "./registrar.module.scss";

const Page: NextPage = () => {
  // const paddingCardLogin = useBreakpointValue({
  //   base: "20px",
  //   md: "0px",
  // });
  return (
    <>
      <HeadUtil title="Registrar"></HeadUtil>
      <AuthLayout>
        <div
          style={{
            paddingInline: "20px",
          }}
          className={styles.wrapper}
        >
          <CardRegister className={styles.cardLogin}></CardRegister>
        </div>
      </AuthLayout>
    </>
  );
};

export default Page;
