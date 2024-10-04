const fs = require('fs');
const { exec } = require('child_process');
const path = require('path');
const { google } = require('googleapis');

const config = require('./config/settings.json');
const REPORT_DIR = 'allure-report';

// Function to  Authentication with Google
async function authenticate() {
    const auth = new google.auth.GoogleAuth({
        keyFile: 'config/GoogleAPI.json',
        scopes: [
            'https://www.googleapis.com/auth/drive.file',
            'https://www.googleapis.com/auth/gmail.send',
            'https://www.googleapis.com/auth/gmail.compose'
        ],
    });

    const authClient = await auth.getClient();
    return authClient;
}

// Function to generate a single html Allure report file
async function generateAllureReport() {
    return new Promise((resolve, reject) => {
        exec('allure generate allure-results --clean -o allure-report --single-file', (error, stdout, stderr) => {
            if (error) {
                console.error(`Error generating Allure report: ${stderr}`);
                return reject(error);
            }
            console.log(`Report generated successfully: ${stdout}`);
            resolve();
        });
    });
}

// Function to upload the html file to google Drive
async function uploadFile(auth, filePath) {
    const drive = google.drive({ version: 'v3', auth });
    const fileMetadata = {
        name: 'index.html', // Change the file name as needed
        mimeType: 'text/html',
    };
    const media = {
        mimeType: 'text/html',
        body: fs.createReadStream(filePath),
    };

    try {
        const response = await drive.files.create({
            resource: fileMetadata,
            media: media,
            fields: 'id',
        });
        console.log('File Uploaded with ID:', response.data.id);
        return response.data.id;
    } catch (error) {
        console.error('Error uploading file:', error.message);
    }
}

// Function to give read permission to the google Drive file
async function shareFile(auth, fileId) {
    const drive = google.drive({ version: 'v3', auth });

    try {
        await drive.permissions.create({
            fileId: fileId,
            requestBody: {
                role: 'reader', // Read permission
                type: 'user', // Share with a specific user
                emailAddress: config.reportRecepientEmail,
            },
        });

        console.log('File shared successfully.');
    } catch (error) {
        console.error('Error sharing the file:', error);
    }
}

//TODO
// Function to Send the email
async function sendEmail(auth) {
    const gmail = google.gmail({ version: 'v1', auth });

    const email = [
        `From: "'${config.reportSenderName}'" <'${config.reportSenderEmail}'>`,
        `To: '${config.reportRecepientEmail}'`,
        `Subject: Test Email`,
        `Content-Type: text/plain; charset="UTF-8"`,
        ``,
        `This is a test email.`,
    ].join('\n');

    const base64EncodedEmail = Buffer.from(email).toString('base64url');

    console.log('Base64 Encoded Email:', base64EncodedEmail); 

    try {
        const res = await gmail.users.messages.send({
            userId: 'me',
            requestBody: {
                raw: base64EncodedEmail,
            },
        });
        console.log('Email sent:', res.data);
    } catch (error) {
        console.error('Error sending email:', error);
    }
}

// Main function
(async () => {
    try {
        await generateAllureReport(); // Generate the report before uploading
        const auth = await authenticate();
        const fileId = await uploadFile(auth, path.join(REPORT_DIR, 'index.html'));

        // Share the file
        await shareFile(auth, fileId);

        //TODO
        // await sendEmail(auth, fileId); // Send email with the report link

        console.log('Report uploaded and email sent successfully!');
    } catch (error) {
        console.error('Error:', error);
    }
})();