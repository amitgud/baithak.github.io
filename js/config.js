// Configuration management
const config = {
    SPREADSHEET_ID: process.env.SPREADSHEET_ID || '',
    API_KEY: process.env.GOOGLE_SHEETS_API_KEY || '',
    SHEET_RANGE: 'Sheet1!A2:K'
};

export default config;
