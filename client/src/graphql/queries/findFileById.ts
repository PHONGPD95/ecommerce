import gql from 'graphql-tag';

export const FIND_FILE_BY_ID = gql`
  query FindFileById($id: String!) {
    findFileById(id: $id) {
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
