module.exports = {
  parserPreset: {
    parserOpts: {
      headerPattern: /^([a-z]+)(\([a-z]+\/[a-z]+\))#([A-Z]+-\d+): (.+)$/,
      headerCorrespondence: ['type', 'scope', 'ticket', 'subject']
    },
  },
  rules: {
    'header-match-pattern': [2, 'always'],
    'header-max-length': [2, 'always', 100],
    'type-enum': [
      2,
      'always',
      ['feat', 'fix', 'docs', 'style', 'refactor', 'test', 'chore', 'ci', 'build', 'perf']
    ],
    'subject-empty': [2, 'never'],
    'subject-case': [0],
  },
  plugins: [
    {
      rules: {
        'header-match-pattern': (parsed) => {
          const { type, scope, ticket, subject } = parsed;
          if (type && scope && ticket && subject) {
            return [true];
          }
          return [
            false,
            'Commit message format is invalid. Use: action(tech/module)#ticket: message\n' +
            'Example: fix(be/api)#TICKET-123: resolve validation error'
          ];
        }
      }
    }
  ]
};