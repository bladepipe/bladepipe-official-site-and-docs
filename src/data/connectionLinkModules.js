const docsModules = require.context(
  '@site/docs/dataMigrationAndSync/connection',
  true,
  /_links\/index\.js$/
);

const ccDocsModules = require.context(
  '@site/ccDocs/dataMigrationAndSync/connection',
  true,
  /_links\/index\.js$/
);

export const getConnectionLinkData = (docsDir, linksPath) => {
  const modulePath = `./${linksPath}`;
  const modules = docsDir === 'ccDocs' ? ccDocsModules : docsModules;
  const targetModule = modules(modulePath);

  return targetModule.default || targetModule;
};
