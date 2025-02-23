import { readFile, writeFile } from 'fs/promises';
import { fileURLToPath } from 'url';
import { dirname, join } from 'path';
import dotenv from 'dotenv';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

async function main() {
    try {
        // Load environment variables
        dotenv.config();

        // Validate required environment variables
        const requiredEnvVars = [
            'SPREADSHEET_ID',
            'GOOGLE_API_KEY',
            'GOOGLE_SCRIPT_ID',
            'RECAPTCHA_SITE_KEY'
        ];

        const missingVars = requiredEnvVars.filter(varName => !process.env[varName]);
        if (missingVars.length > 0) {
            console.error('Error: Missing required environment variables:', missingVars.join(', '));
            process.exit(1);
        }

        // Read config.js
        const configPath = join(__dirname, '..', 'js', 'config.js');
        let configContent = await readFile(configPath, 'utf8');

        // Replace placeholders with actual values
        configContent = configContent
            .replace('__SPREADSHEET_ID__', process.env.SPREADSHEET_ID)
            .replace('__GOOGLE_API_KEY__', process.env.GOOGLE_API_KEY)
            .replace('__GOOGLE_SCRIPT_ID__', process.env.GOOGLE_SCRIPT_ID)
            .replace('__RECAPTCHA_SITE_KEY__', process.env.RECAPTCHA_SITE_KEY);

        // Write back to config.js
        await writeFile(configPath, configContent);

        console.log('Config file updated successfully with environment variables.');
    } catch (error) {
        console.error('Error updating config.js:', error);
        process.exit(1);
    }
}

main();
