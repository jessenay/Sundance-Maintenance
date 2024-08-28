const cron = require('node-cron');
const { generateAndSendMonthlyReport } = require('./pdfGeneration'); // Adjust the path as necessary

// Schedule the task to run at 11:59 PM on the last day of every month
cron.schedule('59 23 28-31 * *', async () => {
    const now = new Date();
    const lastDayOfMonth = new Date(now.getFullYear(), now.getMonth() + 1, 0).getDate();

    if (now.getDate() === lastDayOfMonth) {
        console.log('Running the monthly report generation task...');
        
        const month = now.getMonth() + 1; // Get the current month (1-12)
        const year = now.getFullYear();   // Get the current year

        console.log(`Generating report for month: ${month}, year: ${year}`);

        try {
            await generateAndSendMonthlyReport(month, year);
            console.log('Report generation and email sending complete.');
        } catch (err) {
            console.error('Error during report generation or email sending:', err);
        }
    }
});

console.log('Cron job scheduled: report generation on the last day of every month at 11:59 PM.');
