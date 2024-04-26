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
