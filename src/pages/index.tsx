import { CardLogin } from "components/auth/CardLogin/CardLogin";
import { HeadUtil } from "components/utils/HeadUtil";
import { AuthLayout } from "layouts/Auth";
import { NextPage } from "next";
import styles from "./index.module.scss";

const Page: NextPage = () => {
  return (
    <>
      <HeadUtil title="Entrar"></HeadUtil>
      <AuthLayout>
        <div
          style={{
            paddingInline: "20px",
          }}
          className={styles.wrapper}
        >
          <CardLogin className={styles.cardLogin}></CardLogin>
        </div>
      </AuthLayout>
    </>
  );
};

export default Page;
