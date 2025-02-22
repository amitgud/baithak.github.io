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

        // Read config.js
        const configPath = join(__dirname, '..', 'js', 'config.js');
        let configContent = await readFile(configPath, 'utf8');

        // Replace placeholders with actual values
        configContent = configContent.replace('__SPREADSHEET_ID__', process.env.SPREADSHEET_ID || '');
        configContent = configContent.replace('__GOOGLE_API_KEY__', process.env.GOOGLE_API_KEY || '');

        // Write back to config.js
        await writeFile(configPath, configContent);

        console.log('Successfully updated config.js with environment variables');
    } catch (error) {
        console.error('Error updating config.js:', error);
        process.exit(1);
    }
}

main();
