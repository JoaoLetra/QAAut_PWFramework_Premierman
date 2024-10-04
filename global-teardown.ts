import { exec } from 'child_process';

async function globalTeardown() {
    console.log('Executing uploadAndEmailReport script...');

    return new Promise<void>((resolve, reject) => {
        exec('node uploadAndEmailReport.js', (error, stdout, stderr) => {
            if (error) {
                console.error(`Error executing uploadAndEmailReport: ${stderr}`);
                return reject(error);
            }
            console.log(stdout);
            resolve();
        });
    });
}

export default globalTeardown;