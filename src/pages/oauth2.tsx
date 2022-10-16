import AuthorizeApp from "components/auth/AuthorizeApp";
import { HeadUtil } from "components/utils/HeadUtil";
import { AuthLayout } from "layouts/Auth";
import { $api } from "libs/api";
import { GetServerSideProps } from "next";
import { Application } from "types/api/application";
import { NextPageCustom } from "./_app";
import styles from "./oauth2.module.scss";
import { useRouter } from "next/router";
import AuthorizeAppErrorCard from "components/auth/AuthorizeAppErrorCard";
import { AnimatePresence, motion } from "framer-motion";
import AuthorizeAppSuccessCard from "components/auth/AuthorizeAppSuccessCard";
import { useLayoutEffect, useState } from "react";

interface Props {
  app: Application;
}

type steps = "authorize" | "error" | "success-authorization";

const Page: NextPageCustom<Props> = (props) => {
  const router = useRouter();
  const [currentStep, setStep] = useState<steps>("authorize");
  // @ts-ignore
  const scopes: string[] = router.query.scopes?.split(",") || [];
  const clientId = router.query.clientId;
  const redirectUrl = router.query.redirectUrl;

  const hasErro = !clientId || !redirectUrl || typeof redirectUrl !== "string";

  useLayoutEffect(() => {
    if (hasErro) {
      setStep("error");
    }
  });

  const onAuthorize = (data: any) => {
    setStep("success-authorization");
    setTimeout(() => {
      window.location.href =
        redirectUrl + `?code=${data.code}&clientId=${props.app.id}`;
    }, 3000);
  };

  return (
    <>
      <HeadUtil title={`Entrar em ${props.app.name}`}></HeadUtil>
      <div className={styles.wrapper}>
        {currentStep === "success-authorization" && (
          <motion.div
            key="success-authorization"
            initial={{
              scale: 0,
            }}
            animate={{
              scale: 1,
            }}
            exit={{
              translateX: "100%",
              scale: 0,
            }}
          >
            <AuthorizeAppSuccessCard className={styles.card} />
          </motion.div>
        )}

        {currentStep === "error" && (
          <motion.div
            key="error"
            initial={{
              scale: 0,
            }}
            animate={{
              scale: 1,
            }}
            exit={{
              translateX: "100%",
              scale: 0,
            }}
          >
            <AuthorizeAppErrorCard
              className={styles.card}
              errorMessage={
                !clientId
                  ? 'Informe o parâmetro "clientId"!'
                  : 'Informe o parâmetro "redirectUrl"!'
              }
            />
          </motion.div>
        )}

        {currentStep === "authorize" && (
          <motion.div
            className={styles["motion-div"]}
            key="authorize"
            initial={{
              scale: 0,
            }}
            animate={{
              scale: 1,
            }}
            exit={{
              translateX: "100%",
              scale: 0,
            }}
          >
            <AuthorizeApp
              className={styles.card}
              scopes={scopes}
              app={props.app}
              redirectUrl={redirectUrl as string}
              onAuthorize={onAuthorize}
            />
          </motion.div>
        )}
      </div>
    </>
  );
};

Page.getLayout = function (page) {
  return <AuthLayout>{page}</AuthLayout>;
};

export const getServerSideProps: GetServerSideProps = async function (ctx) {
  const res = await $api.get(`/applications/${ctx.query.clientId}`);
  return {
    props: {
      app: res.data,
    },
  };
};

export default Page;
