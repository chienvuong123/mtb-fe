module.exports = {
  extends: ['@commitlint/config-conventional'],
  ignores: [
    (commit) => commit.includes('node_modules'),
    (commit) => commit.includes('dist'),
  ],
};
