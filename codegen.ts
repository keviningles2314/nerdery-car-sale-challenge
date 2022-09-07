import { CodegenConfig } from '@graphql-codegen/cli';

const config: CodegenConfig = {
  schema: [
    {
      ${REACT_APP_API}: {
        headers: {
          'x-hasura-admin-secret':
            ${REACT_APP_API_KEY},
        },
      },
    },
  ],
  documents: 'src/**/!(*.d).{ts,tsx}',
  generates: {
    './src/api/graphql/__generated__/graphql-types.ts': {
      plugins: [
        'typescript',
        'typescript-operations',
        'typescript-react-apollo',
      ],
    },
    './src/api/graphql/__generated__/graphql.schema.json': {
      plugins: ['introspection'],
    },
  },
};
export default config;
