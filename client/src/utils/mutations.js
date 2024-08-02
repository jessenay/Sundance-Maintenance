import { gql } from '@apollo/client';

export const LOGIN_USER = gql`
mutation login($username: String!, $password: String!) {
  login(username: $username, password: $password) {
    token
    user {
      _id
      username
      role
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

export const ADD_TOWER = gql`
  mutation AddTower($name: String!, $liftId: ID!) {
    addTower(name: $name, liftId: $liftId) {
      _id
      name
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

export const ADD_WORK_ORDER = gql`
  mutation AddWorkOrder($job: String!, $personnel: [String]!, $toolsRequired: [String]!, $partsUsed: [PartInput]!, $timeWorked: String!) {
    addWorkOrder(job: $job, personnel: $personnel, toolsRequired: $toolsRequired, partsUsed: $partsUsed, timeWorked: $timeWorked) {
      _id
      job
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
`;

export const ADD_TODO = gql`
  mutation AddTodo($job: String!) {
    addTodo(job: $job) {
      _id
      job
    }
  }
`;

export const REMOVE_TODO = gql`
  mutation RemoveTodo($_id: ID!) {
    removeTodo(_id: $_id) {
      _id
      job
    }
  }
`;

export const ADD_PROCEDURE = gql`
  mutation AddProcedure($name: String!, $description: String!, $componentId: ID!) {
    addProcedure(name: $name, description: $description, componentId: $componentId) {
      _id
      name
      description
    }
  }
`;

export const CREATE_ACCOUNT = gql`
mutation createAccount($username: String!, $password: String!, $role: String!) {
  createAccount(username: $username, password: $password, role: $role) {
    _id
    username
    role
  }
}
`;

export const DELETE_WORK_ORDER = gql`
  mutation deleteWorkOrder($_id: ID!) {
    deleteWorkOrder(_id: $_id) {
      _id
    }
  }
`;

export const TOGGLE_WINTER_TASK = gql`
  mutation ToggleWinterTask($_id: ID!, $initials: String!, $dateCompleted: String!) {
    toggleWinterTask(_id: $_id, initials: $initials, dateCompleted: $dateCompleted) {
      _id
      name
      completed
      initials
      dateCompleted
    }
  }
`;

export const ADD_WINTER_TASK = gql`
  mutation AddWinterTask($name: String!) {
    addWinterTask(name: $name) {
      _id
      name
      completed
    }
  }
`;

export const UNCHECK_ALL_WINTER_TASKS = gql`
  mutation UncheckAllWinterTasks {
    uncheckAllWinterTasks {
      _id
      name
      completed
    }
  }
`;

export const DELETE_WINTER_TASK = gql`
  mutation DeleteWinterTask($_id: ID!) {
    deleteWinterTask(_id: $_id) {
      _id
    }
  }
`;

export const ADD_SPRING_TASK = gql`
  mutation AddSpringTask($name: String!) {
    addSpringTask(name: $name) {
      _id
      name
      completed
    }
  }
`;

export const TOGGLE_SPRING_TASK = gql`
  mutation ToggleSpringTask($_id: ID!, $initials: String!, $dateCompleted: String!) {
    toggleSpringTask(_id: $_id, initials: $initials, dateCompleted: $dateCompleted) {
      _id
      name
      completed
      initials
      dateCompleted
    }
  }
`;

export const UNCHECK_ALL_SPRING_TASKS = gql`
  mutation UncheckAllSpringTasks {
    uncheckAllSpringTasks {
      _id
      name
      completed
    }
  }
`;

export const DELETE_SPRING_TASK = gql`
  mutation DeleteSpringTask($_id: ID!) {
    deleteSpringTask(_id: $_id) {
      _id
    }
  }
`;
