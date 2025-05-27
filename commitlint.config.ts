export default {
    /*
     * Resolve and load @commitlint/config-conventional from node_modules.
     * Referenced packages must be installed
     */
    extends: ['@commitlint/config-conventional'],
    /*
     * Resolve and load conventional-changelog-atom from node_modules.
     * Referenced packages must be installed
     */
    parserPreset: {
        parserOpts: {
            // Updated headerPattern to match both Jira and GitHub issue formats
            headerPattern: /^(\w*)(?:\((.*)\))?:\s((?:[A-Z]{1,4}-\d{1,5}|#\d+))\s(.*)$/,
            headerCorrespondence: ['type', 'scope', 'issues', 'subject'],
            issuePrefixes: ['^XXXX-[0-9]{1,5}', '#[0-9]{1,5}'],
        },
    },
    /*
     * Any rules defined here will override rules from @commitlint/config-conventional
     */
    rules: {
        // Ensure type is always in lower case
        'type-case': [2, 'always', 'lower-case'],
        // Allow custom types (e.g., feature, setup, hotfix)
        'type-enum': [
            2, // 2 = error level, 1 = warning
            'always',
            ['feature', 'setup', 'hotfix', 'fix', 'docs', 'style', 'refactor', 'test'],
        ],
        // Scope can be empty or must be lowercase if present
        'scope-empty': [0],
        'scope-case': [2, 'always', 'lower-case'],
        // Subject should follow sentence case
        'subject-case': [2, 'always', 'sentence-case'],
        // Subject cannot be empty
        'subject-empty': [2, 'never'],
        // Subject must end with a Jira issue number, allowing optional scope
        'subject-full-stop': [0, 'never'],
        // Header (type, scope, subject) max length
        'header-max-length': [2, 'always', 100],
    },
    /*
     * Custom URL to show upon failure
     */
    helpUrl: 'https://github.com/conventional-changelog/commitlint/#what-is-commitlint',
    /*
     * Custom prompt configs
     */
    prompt: {
        messages: {},
        questions: {
            type: {
                description: 'please input type:',
            },
        },
    },
};
