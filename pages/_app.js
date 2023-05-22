import Layout from "@/components/layout/layout";
import { NotificationContextProvider } from "@/store/notification-context";
import "@/styles/globals.css";
import Head from "next/head";

export default function App({ Component, pageProps }) {
  return (
    <NotificationContextProvider>
      <Layout>
        {/* The head content is merged with the content of other Head content in the page folder 
      //if the element and it's the content are the same, the nexted Head content will be selected
      //here it will be the one in the page folder
      */}
        <Head>
          <title>Opulence Developer</title>
          <meta name="description" content="NextJS Events" />
          <meta
            name="viewport"
            content="initial-scale=1.0, width=device-width"
          />
        </Head>
        <Component {...pageProps} />
      </Layout>
    </NotificationContextProvider>
  );
}
