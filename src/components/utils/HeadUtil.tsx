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
      <meta
        property="og:description"
        content="Sistema de autenticação única para sites desenvolvidos por Maycon Jesus"
      ></meta>
    </Head>
  );
}
