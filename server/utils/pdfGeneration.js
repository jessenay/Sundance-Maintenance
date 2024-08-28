const { generatePDF } = require('./pdfGenerator');
const { fetchDataForPDF } = require('./dataFetcher');
const { sendEmailWithAttachment } = require('./emailService');

// Define the generateAndSendMonthlyReport function
async function generateAndSendMonthlyReport(month, year) {
  try {
      const fetchedData = await fetchDataForPDF(month, year);
      
      // Apply filtering on the client side
      const filteredData = filterByMonthAndYear(fetchedData, month, year);
      
      // Generate the PDF with filtered data
      const pdfPath = await generatePDF(filteredData, month, year);

      // Send the PDF via email
      await sendEmailWithAttachment({
          to: 'jessenay26@gmail.com',
          subject: `Monthly Maintenance Report for ${month}/${year}`,
          body: 'Please find attached the monthly maintenance report.',
          attachments: [
              {
                  filename: `MaintenanceReport-${month}-${year}.pdf`,
                  path: pdfPath,
              },
          ],
      });

      console.log(`Monthly report for ${month}/${year} generated and sent successfully.`);
  } catch (error) {
      console.error('Error in generating or sending the monthly report:', error);
  }
}

// Filtering function to filter services by month and year
function filterByMonthAndYear(data, month, year) {
  return data.map(lift => {
      const filteredComponents = lift.components.map(component => {
          const filteredServices = component.services.filter(service => {
              const serviceDate = new Date(service.dateCompleted);
              return (
                  serviceDate.getMonth() + 1 === month && 
                  serviceDate.getFullYear() === year
              );
          });

          const filteredAnnualServices = component.annualServices.filter(annualService => {
              const serviceDate = new Date(annualService.dateCompleted);
              return (
                  serviceDate.getMonth() + 1 === month && 
                  serviceDate.getFullYear() === year
              );
          });

          return {
              ...component,
              services: filteredServices,
              annualServices: filteredAnnualServices
          };
      });

      const filteredTowers = lift.towers.map(tower => {
          const filteredTowerServices = tower.services.filter(service => {
              const serviceDate = new Date(service.dateCompleted);
              return (
                  serviceDate.getMonth() + 1 === month && 
                  serviceDate.getFullYear() === year
              );
          });

          return {
              ...tower,
              services: filteredTowerServices
          };
      });

      return {
          ...lift,
          components: filteredComponents,
          towers: filteredTowers
      };
  });
}

// Export the functions for use in other files
module.exports = { 
  generateAndSendMonthlyReport,
  filterByMonthAndYear
};
