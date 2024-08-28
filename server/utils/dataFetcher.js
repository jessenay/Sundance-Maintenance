const gql = require('graphql-tag');
const client = require('./apolloClient');

async function fetchDataForPDF(month, year) {
  try {
    const servicesQuery = gql`
      query FetchServices {
        lifts {
          name
          components {
            name
            services {
              dateCompleted
              reason
              workDescription
              partsUsed
              completedBy
            }
            annualServices {
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
            services {
              dateCompleted
              uphillOrDownhill
              workDescription
              partsUsed
              completedBy
            }
          }
          workOrders {
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
      query: servicesQuery,
    });

    return data.lifts;
  } catch (error) {
    console.error('Error fetching data:', error);
    throw error;
  }
}

module.exports = { fetchDataForPDF };
