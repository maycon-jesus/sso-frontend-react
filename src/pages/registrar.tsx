import { useBreakpointValue } from "@chakra-ui/react";
import { CardRegister } from "components/auth/CardRegister/CardRegister";
import { HeadUtil } from "components/utils/HeadUtil";
import { AuthLayout } from "layouts/Auth";
import { NextPage } from "next";
import Head from "next/head";
import styles from "./registrar.module.scss";

const Page: NextPage = () => {
  const paddingCardLogin = useBreakpointValue({
    base: "20px",
    md: "0px",
  });
  return (
    <>
      <HeadUtil title="Registrar"></HeadUtil>
      <AuthLayout>
        <div
          style={{
            paddingInline: paddingCardLogin,
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
