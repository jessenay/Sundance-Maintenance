const cron = require('node-cron');
const { generateAndSendMonthlyReport } = require('./pdfGeneration');

// Schedule the cron job to run at 11:59 PM on the last day of each month
cron.schedule('59 23 28-31 * *', async () => {
  const date = new Date();
  const lastDay = new Date(date.getFullYear(), date.getMonth() + 1, 0).getDate(); // Get the last day of the current month

  if (date.getDate() === lastDay) {
    console.log('Running cron job to generate and send monthly report...');
    const month = date.getMonth() + 1; // Months are 0-based in JavaScript, so we add 1
    const year = date.getFullYear();
    await generateAndSendMonthlyReport(month, year);
  }
}, {
  timezone: "America/Denver" // Set timezone to Mountain Time (Utah)
});

console.log('Cron job scheduled to run on the last day of each month at 11:59 PM.');
