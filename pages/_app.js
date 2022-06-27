import "@code-hike/mdx/dist/index.css";
import '../styles/globals.css';

import { AuthUserProvider } from '../context/AuthUserContext';

function MyApp({ Component, pageProps }) {
  return <AuthUserProvider>
    <Component   {...pageProps} />
  </AuthUserProvider>;
}

export default MyApp;

