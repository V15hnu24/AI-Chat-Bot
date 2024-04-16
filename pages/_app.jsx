import "@/styles/globals.css";
import Layout from "@/components/Layout";
import { SubjectProvider } from "@/components/SubjectContext";

export default function App({ Component, pageProps }) {
  return (
    <SubjectProvider>
      <Layout>
        <Component {...pageProps} />
      </Layout>
    </SubjectProvider>
  );
}
