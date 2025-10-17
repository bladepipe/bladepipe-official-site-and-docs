import React from 'react';
import Layout from '@theme/Layout';
import Link from '@docusaurus/Link';
import Translate from '@docusaurus/Translate';

export default function NotFound(): React.JSX.Element {
  return (
    <Layout
      title="404"
      description="Page not found"
    >
      <main className="grid min-h-full place-items-center bg-white px-6 py-24 sm:py-32 lg:px-8">
        <div className="text-center">
          <p className="text-base font-semibold text-[#0087c7]">404</p>
          <h1 className="mt-4 text-3xl font-bold tracking-tight text-gray-900 sm:text-5xl">
            <Translate id="404.title">Page not found</Translate>
          </h1>
          <p className="mt-6 text-base leading-7 text-gray-600">
            <Translate id="404.description">Sorry, we couldn't find the page you're looking for.</Translate>
          </p>
          <div className="mt-10 flex items-center justify-center gap-x-6">
            <Link
              to="/"
              className="rounded-md bg-[#0087c7] px-3.5 py-2.5 text-sm font-semibold text-white shadow-sm hover:bg-[#006ba6] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#0087c7] no-underline hover:no-underline transition-colors"
            >
              <Translate id="404.goBackHome">Go back home</Translate>
            </Link>
            <Link
              to="/about"
              className="text-sm font-semibold text-[#0087c7] hover:text-[#006ba6] no-underline hover:no-underline transition-colors"
            >
              <Translate id="404.contactSupport">Contact support</Translate>
              <span aria-hidden="true"> →</span>
            </Link>
          </div>
        </div>
      </main>
    </Layout>
  );
}