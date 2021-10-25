import React from 'react';

const Layout = ({ children }) => (
  <div>
    <div>Layout</div>
    <div style={{ border: `1px solid black` }}>{children}</div>
  </div>
);

export default function App({ Component, pageProps }) {
  return (
    <Layout>
      <Component {...pageProps} />
    </Layout>
  );
}
