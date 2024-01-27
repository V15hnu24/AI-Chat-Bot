import Head from "next/head";
import Header from "./Header";

function Layout({ children }) {
  return (
    <div className="container-fluid" style={{ height: "100%" }}>
      <Head>
        <title>AI-Chat Bot | MIDAS</title>
        <meta name="description" content="Generated by create next app" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/head-logo.jpeg" />
        <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/normalize/8.0.1/normalize.min.css" />
      </Head>

      {/* <Header /> */}
      {children}

    </div>
  );
}

export default Layout;
