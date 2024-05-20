import { gql } from '@apollo/client';

export const GET_LIFT_BY_ID = gql`
  query GetLiftById($_id: ID!) {
    lift(_id: $_id) {
      _id
      name
      components {
        _id
        name
      }
    }
  }
`;

export const GET_LIFTS = gql`
    query GetLifts {
        lifts {
            _id
            name
            components {
              _id
              name
            }
        }
    }
`;

export const FETCH_COMPONENTS_BY_LIFT_ID = gql`
  query FetchComponentsByLiftId($liftId: ID!) {
    lift(_id: $liftId) {
      components {
        _id
        name
        services {
          _id
          dateCompleted
          reason
        }
      }
    }
  }
`;

export const ADD_ANNUAL_SERVICE = gql`
    mutation AddAnnualService($componentId: ID!, $task: String!, $dateCompleted: String!, $completedBy: String!, $testValues: String, $notes: String, $procedureLocations: String) {
        addAnnualService(componentId: $componentId, task: $task, dateCompleted: $dateCompleted, completedBy: $completedBy, testValues: $testValues, notes: $notes, procedureLocations: $procedureLocations) {
        _id
        task
        dateCompleted
        completedBy
        testValues
        notes
        procedureLocations
        }
    }
    `;

export const GET_ANNUAL_SERVICES = gql`
    query GetAnnualServices($componentId: ID!) {
      annualServices(componentId: $componentId) {
        _id
        task
        dateCompleted
        completedBy
        testValues
        notes
        procedureLocations
      }
    }
  `;


export const GET_SERVICES = gql`
  query GetServices($componentId: ID!) {
    services(componentId: $componentId) {
      _id
      dateCompleted
      reason
      workDescription
      partsUsed
      completedBy
    }
  }
`;

export const ADD_SERVICE = gql`
  mutation AddService($componentId: ID!, $dateCompleted: String!, $reason: String!, $workDescription: String!, $partsUsed: String!, $completedBy: String!) {
    addService(componentId: $componentId, dateCompleted: $dateCompleted, reason: $reason, workDescription: $workDescription, partsUsed: $partsUsed, completedBy: $completedBy) {
      _id
      dateCompleted
      reason
      workDescription
      partsUsed
      completedBy
    }
  }
`;

export const ADD_TOWER_SERVICE = gql`
  mutation AddTowerService($towerId: ID!, $dateCompleted: String!, $uphillOrDownhill: String!, $workDescription: String!, $partsUsed: String!, $completedBy: String!) {
    addTowerService(towerId: $towerId, dateCompleted: $dateCompleted, uphillOrDownhill: $uphillOrDownhill, workDescription: $workDescription, partsUsed: $partsUsed, completedBy: $completedBy) {
      _id
      dateCompleted
      uphillOrDownhill
      workDescription
      partsUsed
      completedBy
    }
  }
`;

export const FETCH_TOWERS_BY_LIFT_ID = gql`
query FetchTowersByLiftId($liftId: ID!) {
  lift(_id: $liftId) {
    towers {
      _id
      name
    }
  }
}
`;

export const FETCH_SERVICES_BY_TOWER_ID = gql`
  query FetchServicesByTowerId($towerId: ID!) {
    tower(_id: $towerId) {
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
  }
`;

export const GET_WORK_ORDERS = gql`
  query GetWorkOrders {
    workOrders {
      _id
      job
      personnel
      toolsRequired
      partsUsed {
        name
        cost
      }
      timeWorked
    }
  }
`;

export const GET_PROCEDURES = gql`
  query GetProcedures($componentId: ID!) {
    procedures(componentId: $componentId) {
      _id
      description
    }
  }
`;
