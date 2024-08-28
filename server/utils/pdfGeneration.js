const { generatePDF } = require('./pdfGenerator');
const { fetchDataForPDF } = require('./dataFetcher');
const { sendEmailWithAttachment } = require('./emailService'); // Importing the email function

async function generateAndSendMonthlyReport(month, year) {
  try {
      const fetchedData = await fetchDataForPDF(month, year);
      const pdfPath = await generatePDF(fetchedData, month, year);

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
        annualServices: filteredAnnualServices,
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
        services: filteredTowerServices,
      };
    });

    return {
      ...lift,
      components: filteredComponents,
      towers: filteredTowers,
    };
  });
}


module.exports = { generateAndSendMonthlyReport };
