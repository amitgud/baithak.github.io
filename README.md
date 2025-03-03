# Baithak - Indian Classical Music Concerts

A website to discover and explore upcoming Indian classical music concerts.

## Features
- View upcoming and past concerts
- Filter concerts by genre (Hindustani, Carnatic, Bollywood, etc.)
- Filter concerts by month and year
- Responsive design for all devices
- Integration with Google Sheets for easy content management

## Development Setup

1. Install dependencies:
   ```bash
   npm install
   ```

2. Configure environment variables:
   - Copy `.env.example` to `.env`
   - Update `SPREADSHEET_ID` with your Google Sheet ID
   - Update `GOOGLE_API_KEY` with your Google API Key
   - Update `RECAPTCHA_SITE_KEY` with your reCAPTCHA v2 site key

3. Start the development server:
   ```bash
   npm run dev
   ```
   This will build the project and start a local server.

## Environment Variables

Copy `.env.example` to `.env` and fill in the following values:

- `SPREADSHEET_ID`: ID of your Google Sheet containing concert data
- `GOOGLE_API_KEY`: Your Google API key for accessing Sheets API
- `RECAPTCHA_SITE_KEY`: Your reCAPTCHA v2 site key

### Setting up reCAPTCHA

1. Go to [Google reCAPTCHA Admin](https://www.google.com/recaptcha/admin)
2. Register a new site
3. Choose reCAPTCHA v2 ("I'm not a robot" checkbox)
4. Add your domain(s) to the allowed domains list
5. Copy the Site Key to your `.env` file

## Deployment

The website is automatically deployed to GitHub Pages when changes are pushed to the main branch.

### Setting up GitHub Secrets

1. Go to your repository's Settings > Secrets and Variables > Actions
2. Add the following secrets:
   - `SPREADSHEET_ID`: Your Google Sheet ID
   - `GOOGLE_API_KEY`: Your Google API Key
   - `RECAPTCHA_SITE_KEY`: Your reCAPTCHA v2 site key

## Google Sheets Setup

1. Create a Google Sheet with the following columns:
   - Date
   - Time
   - Title
   - Description
   - Artist
   - Genre
   - Venue
   - City
   - Cost
   - Ticket Link
   - Poster Link

2. Set up Google Sheets API:
   1. Go to [Google Cloud Console](https://console.cloud.google.com/)
   2. Create a new project
   3. Enable Google Sheets API
   4. Create API credentials
   5. Make your sheet public or set appropriate sharing permissions

## Available Scripts

- `npm run dev`: Builds the project and starts a development server
- `npm run build`: Builds the project by injecting environment variables
- `npm test`: Runs test suite (not configured yet)

## Development
- The website uses vanilla JavaScript with Bootstrap 5 for styling
- Data is fetched from Google Sheets API
- Concerts are automatically sorted into upcoming and past based on current date
- Environment variables are injected during build time
