# Baithak - Indian Classical Music Concerts

A website to discover and explore upcoming Indian classical music concerts.

## Features
- View upcoming and past concerts
- Filter concerts by genre (Hindustani, Carnatic, Bollywood, etc.)
- Filter concerts by month
- Responsive design for all devices
- Integration with Google Sheets for easy content management

## Setup Instructions

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
   4. Create credentials (API key)

3. Configure environment variables:
   1. Copy `.env.example` to `.env`
   2. Update `SPREADSHEET_ID` with your Google Sheet ID
   3. Update `GOOGLE_SHEETS_API_KEY` with your API key
   4. For production, set these environment variables in your hosting platform

4. Make your Google Sheet public or set appropriate sharing permissions

5. Deploy the website:
   - The website is automatically deployed using GitHub Pages
   - Any changes pushed to the main branch will be reflected on the live site

## Development
- The website uses vanilla JavaScript with Bootstrap 5 for styling
- Data is fetched from Google Sheets API
- Concerts are automatically sorted into upcoming and past based on current date
- Environment variables are managed through config.js
