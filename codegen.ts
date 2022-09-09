import { CodegenConfig } from '@graphql-codegen/cli';

const config: CodegenConfig = {
  schema: [
    {
      'https://new-anchovy-87.hasura.app/v1/graphql': {
        headers: {
          'x-hasura-admin-secret':
            'rTisquXVdS2Ffxe5nK92OnNQjK72OpuKTPWUpM4kbr33bUF5zVHj63tET1N8jhez',
        },
      },
    },
  ],
  documents: './src/**/!(*.d).{ts,tsx}',
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
