module.exports = {
  extends: ['@commitlint/config-conventional'],
  ignores: [
    (commit) => commit.includes('node_modules'),
    (commit) => commit.includes('dist'),
  ],
  rules: {
    'body-max-line-length': [0],
    'subject-case': [
      2,
      'always',
      ['lower-case', 'upper-case', 'pascal-case', 'start-case'],
    ],
  },
};
