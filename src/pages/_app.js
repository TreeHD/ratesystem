import "@/styles/globals.css";
import Layout from "@/compoments/layout";

export default function App({ Component, pageProps }) {
  return (
    <Layout>
      <Component {...pageProps} />
    </Layout>
  )
}
