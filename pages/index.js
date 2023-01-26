import Head from "next/head";
import Link from "next/link";
import Layout, { siteTitle } from "../components/layout";
import styles from "../styles/Home.module.css";
import utilStyles from "../styles/utils.module.css";

export default function Home() {
  return (
    <Layout home>
      <Head>
        <title>{siteTitle}</title>
      </Head>
      <section className={utilStyles.headingMd}>
        <p>Hello, I'm Nisvet. Welcome to my digital space. :)</p>
        <p>This is me learning how to make a blog</p>
      </section>
    </Layout>
  );
}
