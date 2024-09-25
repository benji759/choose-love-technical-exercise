// Collect data from record
let grantReference = input.config().grantReference;
let submissionDate = input.config().submissionDate;

// API endpoint
let apiUrl = "https://webhook.site/adb7ea35-a9e8-48f6-ac4e-2421792915bc";

// Construct the payload
let payload = {
    "report_id": grantReference,
    "submission_date": submissionDate
};

// Make the API request
let response = await fetch(apiUrl, {
    method: "POST",
    headers: {
        "Content-Type": "application/json"
    },
    body: JSON.stringify(payload)
});

// Log the request was successful
if (response.ok) {
    console.log("API call successful.");
} else {
    console.error("API call failed: " + response.statusText);
}