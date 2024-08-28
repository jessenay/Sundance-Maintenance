const { fetchDataForPDF } = require('./utils/dataFetcher');
const { generatePDF } = require('./utils/pdfGenerator');
const { sendEmailWithAttachment } = require('./utils/emailService');
const { filterByMonthAndYear } = require('./utils/pdfGeneration');
require('dotenv').config();

(async () => {
  try {
    const month = 8; // Example: August
    const year = 2024; // Example: Year 2024

    console.log(`Running query with month: ${month}, year: ${year}`);
    
    // Fetch the data
    const data = await fetchDataForPDF(month, year);
    
    console.log('Data fetched:', JSON.stringify(data, null, 2));
    
    // Apply filtering
    const filteredData = filterByMonthAndYear(data, month, year);
    
    // Generate the PDF
    const pdfPath = await generatePDF(filteredData, month, year);
    
    console.log('PDF generated at:', pdfPath);

    // Send the email with the generated PDF attached
    await sendEmailWithAttachment({
      to: 'jessenay26@gmail.com', // Replace with the actual recipient email
      subject: `Monthly Maintenance Report for ${month}/${year}`,
      body: 'Please find attached the monthly maintenance report.',
      attachments: [
        {
          filename: `MaintenanceReport-${month}-${year}.pdf`,
          path: pdfPath, // Path to the generated PDF
        },
      ],
    });

    console.log('Test report generated and sent successfully.');
  } catch (error) {
    console.error('Error in generating or sending the monthly report:', error);
  }
})();
