// Set relevant tables
let reportsTable = base.getTable("Reports");
let grantsTable = base.getTable("Grants");

// Set relevant fields from the Reports table
let submissionDateField = "Submission date"; // The date when the report was submitted
let grantLinkField = "Grant reference"; // The linked grant in the report

// Set relevant fields from the Grants table
let grantEndDateField = "End date"; // The grant end date field in the Grants table
let grantStatusField = "Status"; // The status field in the Grants table

// Get the report records that need to be processed
let queryResult = await reportsTable.selectRecordsAsync({
    fields: [submissionDateField, grantLinkField], // Just fetch the required fields
});

// Loop through items in the reports table
for (let report of queryResult.records) {
    let submissionDate = report.getCellValue(submissionDateField);
    let linkedGrant = report.getCellValue(grantLinkField);

    // Check if the report has a submission date and linked grant
    if (submissionDate && linkedGrant) {
        let grantId = linkedGrant[0].id; // Assuming only one linked grant per report
        let grantRecord = grantId ? await grantsTable.selectRecordAsync(grantId) : null;

        if (grantId && grantRecord) {
            // Get the corresponding grant record
            let grantEndDate = grantRecord.getCellValue(grantEndDateField);

            // Check if the grant has an end date
            if (grantEndDate) {
                let newStatus;

                // Compare submission date with grant end date
                if (new Date(submissionDate) <= new Date(grantEndDate)) {
                    newStatus = "Active"; // Report submitted on time
                } else {
                    newStatus = "Delayed"; // Report submitted late
                }

                // Update the grant status if necessary
                await grantsTable.updateRecordAsync(grantId, {
                    [grantStatusField]: newStatus
                });
            }
        }
    }
}