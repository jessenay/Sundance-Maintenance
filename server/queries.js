import { gql } from '@apollo/client';

export const GET_ALL_SERVICES = gql`
  query GetAllServices {
    lifts {
      _id
      name
      components {
        _id
        name
        services {
          _id
          dateCompleted
          reason
          workDescription
          partsUsed
          completedBy
        }
      }
      towers {
        _id
        name
        services {
          _id
          dateCompleted
          uphillOrDownhill
          workDescription
          partsUsed
          completedBy
        }
      }
      workOrders {
        _id
        job
        dateCompleted
        personnel
        toolsRequired
        partsUsed {
          _id
          name
          cost
        }
        timeWorked
      }
    }
  }
`;
