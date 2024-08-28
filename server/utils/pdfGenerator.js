const PDFDocument = require('pdfkit');
const fs = require('fs');
const path = require('path');

function formatDate(dateString) {
    if (!dateString) return 'N/A';
    const date = new Date(dateString);
    if (isNaN(date.getTime())) return 'N/A'; 
    return `${date.getMonth() + 1}/${date.getDate()}/${date.getFullYear()}`;
}

function generatePDF(liftData, month, year) {
    const doc = new PDFDocument({ margin: 50 });
    const filePath = path.join(__dirname, 'pdfs', `MaintenanceReport-${month}-${year}.pdf`);
    doc.pipe(fs.createWriteStream(filePath));

    const primaryColor = '#003366';
    const secondaryColor = '#0066CC';
    const textColor = '#333333';
    const headerFont = 'Helvetica-Bold';
    const normalFont = 'Helvetica';

    doc.font(headerFont)
        .fontSize(24)
        .fillColor(primaryColor)
        .text(`Maintenance Report - ${month}/${year}`, { align: 'center', underline: true });
    doc.moveDown(2);

    liftData.forEach(lift => {
        doc.font(headerFont)
            .fontSize(18)
            .fillColor(secondaryColor)
            .text(`Lift: ${lift.name}`, { underline: true });
        doc.moveDown();

        lift.components.forEach(component => {
            doc.font(headerFont)
                .fontSize(14)
                .fillColor(primaryColor)
                .text(`Component: ${component.name}`);
            doc.moveDown(0.5);

            if (component.services.length > 0) {
                component.services.forEach(service => {
                    doc.font(normalFont)
                        .fontSize(12)
                        .fillColor(textColor)
                        .text(`- Date Completed: ${formatDate(service.dateCompleted)}`);
                    doc.text(`  Reason: ${service.reason || 'N/A'}`);
                    doc.text(`  Work Description: ${service.workDescription || 'N/A'}`);
                    doc.text(`  Parts Used: ${service.partsUsed || 'N/A'}`);
                    doc.text(`  Completed By: ${service.completedBy || 'N/A'}`);
                    doc.moveDown(0.5);
                });
            } else {
                doc.text('No services recorded for this component.', { font: normalFont, fontSize: 12, fillColor: textColor });
                doc.moveDown(0.5);
            }

            if (component.annualServices && component.annualServices.length > 0) {
                doc.font(headerFont)
                    .fontSize(12)
                    .fillColor(secondaryColor)
                    .text(`  Annual Services:`, { underline: true });
                component.annualServices.forEach(service => {
                    doc.font(normalFont)
                        .fontSize(12)
                        .fillColor(textColor)
                        .text(`- Task: ${service.task || 'N/A'}`);
                    doc.text(`  Date Completed: ${formatDate(service.dateCompleted)}`);
                    doc.text(`  Completed By: ${service.completedBy || 'N/A'}`);
                    doc.text(`  Test Values: ${service.testValues || 'N/A'}`);
                    doc.text(`  Notes: ${service.notes || 'N/A'}`);
                    doc.text(`  Procedure Locations: ${service.procedureLocations || 'N/A'}`);
                    doc.moveDown(0.5);
                });
            }
            doc.moveDown(1);
        });

        lift.towers.forEach(tower => {
            doc.font(headerFont)
                .fontSize(14)
                .fillColor(primaryColor)
                .text(`Tower: ${tower.name}`);
            doc.moveDown(0.5);

            if (tower.services.length > 0) {
                tower.services.forEach(service => {
                    doc.font(normalFont)
                        .fontSize(12)
                        .fillColor(textColor)
                        .text(`- Date Completed: ${formatDate(service.dateCompleted)}`);
                    doc.text(`  Uphill or Downhill: ${service.uphillOrDownhill || 'N/A'}`);
                    doc.text(`  Work Description: ${service.workDescription || 'N/A'}`);
                    doc.text(`  Parts Used: ${service.partsUsed || 'N/A'}`);
                    doc.text(`  Completed By: ${service.completedBy || 'N/A'}`);
                    doc.moveDown(0.5);
                });
            } else {
                doc.text('No services recorded for this tower.', { font: normalFont, fontSize: 12, fillColor: textColor });
                doc.moveDown(0.5);
            }
            doc.moveDown(1);
        });
        doc.addPage();
    });

    doc.end();
    return filePath;
}

module.exports = { generatePDF };
