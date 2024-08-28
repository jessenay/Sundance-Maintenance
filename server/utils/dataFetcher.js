const gql = require('graphql-tag');
const client = require('./apolloClient');

async function fetchDataForPDF(month, year) {
  try {
    console.log(`Running query with month: ${month}, year: ${year}`);
    
    const query = gql`
      query FetchData($month: Int!, $year: Int!) {
        lifts {
          name
          components {
            name
            services(month: $month, year: $year) {
              dateCompleted
              reason
              workDescription
              partsUsed
              completedBy
            }
            annualServices(month: $month, year: $year) {
              task
              dateCompleted
              completedBy
              testValues
              notes
              procedureLocations
            }
          }
          towers {
            name
            services(month: $month, year: $year) {
              dateCompleted
              uphillOrDownhill
              workDescription
              partsUsed
              completedBy
            }
          }
          workOrders(month: $month, year: $year) {
            job
            dateCompleted
            personnel
            toolsRequired
            partsUsed {
              name
              cost
            }
            timeWorked
          }
        }
      }
    `;

    const { data } = await client.query({
      query,
      variables: { month, year }, // Ensure month and year are passed correctly
    });

    console.log('Query successful:', data);
    return data.lifts;
  } catch (error) {
    console.error('Error fetching data:', error.networkError ? error.networkError.result : error.message);
    throw error;
  }
}

module.exports = { fetchDataForPDF };
