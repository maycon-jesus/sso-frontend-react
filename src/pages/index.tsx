import {CardLogin} from "components/auth/CardLogin/CardLogin"
import { AuthLayout } from "layouts/Auth"
import { NextPage } from "next"
import styles from "./index.module.scss"

const Page:NextPage = ()=>{
    return (
        <AuthLayout>
        <div style={{
            paddingInline: '20px'
        }} className={styles.wrapper}>
            <CardLogin className={styles.cardLogin}></CardLogin>
        </div>
        </AuthLayout>
    )
}

export default Page