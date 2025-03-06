module.exports = {
  extends: ['@commitlint/config-conventional'],
  ignores: [
    (commit) => commit.includes('node_modules'),
    (commit) => commit.includes('dist'),
  ],
  rules: {
    'body-max-line-length': [0],
  },
};
