import Head from "next/head";

interface Props {
  title?: string;
}

export function HeadUtil(props: Props) {
  return (
    <Head>
      <title>{props.title} - Maycon Jesus</title>
    </Head>
  );
}
