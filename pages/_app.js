import '../styles/globals.css';
import "@code-hike/mdx/dist/index.css";

import { AuthUserProvider } from '../context/AuthUserContext';

function MyApp({ Component, pageProps }) {
  return <AuthUserProvider>
    <Component   {...pageProps} />
  </AuthUserProvider>;
}

export default MyApp;

