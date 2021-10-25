import React from 'react';
import MdxPage from '../data/index.mdx';
import { MDXProvider } from '@mdx-js/react';

const MyH1 = (props) => <h1 {...props} style={{ color: 'red' }} />;

const components = {
  h1: MyH1,
};

export default function Page() {
  return (
    <MDXProvider components={components}>
      <MdxPage />
    </MDXProvider>
  );
}
