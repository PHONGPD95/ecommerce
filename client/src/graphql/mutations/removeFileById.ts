import gql from 'graphql-tag';

export const REMOVE_FILE_BY_ID = gql`
  mutation RemoveFileById($id: String!) {
    removeFileById(id: $id) {
      data {
        id
      }
      error {
        title
        message
      }
    }
  }
`;
