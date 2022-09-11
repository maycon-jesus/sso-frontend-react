import Head from "next/head";

interface Props {
  title?: string;
}

export function HeadUtil(props: Props) {
  return (
    <Head>
      <title>{props.title} - Maycon Jesus</title>

      <meta property="og:type" content="website" />
      <meta property="og:title" content={`${props.title} - Maycon Jesus SSO`} />
      <meta property="og:url" content="https://sso.mayconjesus.dev" />
      <meta
        property="og:image"
        content="https://sso.mayconjesus.dev/assets/images/logo/og-image.png"
      />
      <meta property="og:image:width" content="1200" />
      <meta property="og:image:height" content="627" />
      <meta
        property="og:description"
        content="Sistema de autenticação única para sites desenvolvidos por Maycon Jesus"
      ></meta>
      <meta name="theme-color" content="#42E2B8"></meta>
    </Head>
  );
}
