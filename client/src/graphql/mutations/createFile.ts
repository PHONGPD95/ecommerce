import gql from 'graphql-tag';

export const CREATE_FILE = gql`
  mutation CreateFile {
    createFile {
      data {
        id
        path
      }
      error {
        title
        message
      }
    }
  }
`;
