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

export const GET_ANNUAL_SERVICES = gql`
query GetAnnualServices($componentId: ID!, $month: Int, $year: Int) {
  annualServices(componentId: $componentId, month: $month, year: $year) {
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
  query GetServices($componentId: ID!, $month: Int, $year: Int) {
    services(componentId: $componentId, month: $month, year: $year) {
      _id
      dateCompleted
      reason
      workDescription
      partsUsed
      completedBy
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
  query getWorkOrders($liftId: ID) {
    workOrders(liftId: $liftId) {
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
      dateCompleted
      lift {
        _id
        name
      }
    }
  }
`;

export const ADD_WORK_ORDER = gql`
  mutation addWorkOrder(
    $job: String!,
    $personnel: [String],
    $toolsRequired: [String],
    $partsUsed: [PartInput],
    $timeWorked: String,
    $dateCompleted: String,
    $lift: ID!
  ) {
    addWorkOrder(
      job: $job,
      personnel: $personnel,
      toolsRequired: $toolsRequired,
      partsUsed: $partsUsed,
      timeWorked: $timeWorked,
      dateCompleted: $dateCompleted,
      lift: $lift
    ) {
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
      dateCompleted
      lift {
        _id
        name
      }
    }
  }
`;

export const GET_TODOS = gql`
  query GetTodos {
    todos {
      _id
      job
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

export const GET_PROCEDURES = gql`
  query GetProcedures($componentId: ID!) {
    procedures(componentId: $componentId) {
      _id
      name
      description
    }
  }
`;

export const GET_WINTER_TASKS = gql`
  query GetWinterTasks {
    winterTasks {
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

export const TOGGLE_WINTER_TASK = gql`
  mutation ToggleWinterTask($_id: ID!, $initials: String!, $dateCompleted: String!) {
    toggleWinterTask(_id: $_id, initials: $initials, dateCompleted: $dateCompleted) {
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

export const GET_SPRING_TASKS = gql`
  query GetSpringTasks {
    springTasks {
      _id
      name
      completed
      initials
      dateCompleted
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

export const DELETE_ANNUAL_SERVICE = gql`
  mutation deleteAnnualService($_id: ID!) {
    deleteAnnualService(_id: $_id) {
      _id
    }
  }
`;

export const DELETE_SERVICE = gql`
  mutation deleteService($_id: ID!) {
    deleteService(_id: $_id) {
      _id
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

export const DELETE_TOWER_SERVICE = gql`
  mutation DeleteTowerService($_id: ID!) {
    deleteTowerService(_id: $_id) {
      _id
    }
  }
`;

export const ADD_SUMMER_TASK = gql`
  mutation AddSummerTask($name: String!) {
    addSummerTask(name: $name) {
      _id
      name
      completed
    }
  }
`;

export const TOGGLE_SUMMER_TASK = gql`
  mutation ToggleSummerTask($_id: ID!, $initials: String!, $dateCompleted: String!) {
    toggleSummerTask(_id: $_id, initials: $initials, dateCompleted: $dateCompleted) {
      _id
      name
      completed
    }
  }
`;

export const UNCHECK_ALL_SUMMER_TASKS = gql`
  mutation UncheckAllSummerTasks {
    uncheckAllSummerTasks {
      _id
      name
      completed
    }
  }
`;

export const DELETE_SUMMER_TASK = gql`
  mutation DeleteSummerTask($_id: ID!) {
    deleteSummerTask(_id: $_id) {
      _id
    }
  }
`;

export const GET_SUMMER_TASKS = gql`
  query GetSummerTasks {
    summerTasks {
      _id
      name
      completed
      initials
      dateCompleted
    }
  }
`;

export const GET_FALL_TASKS = gql`
  query GetFallTasks {
    fallTasks {
      _id
      name
      completed
      initials
      dateCompleted
    }
  }
`;

export const ADD_FALL_TASK = gql`
  mutation AddFallTask($name: String!) {
    addFallTask(name: $name) {
      _id
      name
      completed
    }
  }
`;

export const TOGGLE_FALL_TASK = gql`
  mutation ToggleFallTask($_id: ID!, $initials: String!, $dateCompleted: String!) {
    toggleFallTask(_id: $_id, initials: $initials, dateCompleted: $dateCompleted) {
      _id
      name
      completed
    }
  }
`;

export const UNCHECK_ALL_FALL_TASKS = gql`
  mutation UncheckAllFallTasks {
    uncheckAllFallTasks {
      _id
      name
      completed
    }
  }
`;

export const DELETE_FALL_TASK = gql`
  mutation DeleteFallTask($_id: ID!) {
    deleteFallTask(_id: $_id) {
      _id
    }
  }
`;