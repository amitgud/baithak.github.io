import config from './config.js';

// Initialize the application
document.addEventListener('DOMContentLoaded', function() {
    loadConcerts();
    populateMonthFilter();
});

// Load concerts from Google Sheets
async function loadConcerts() {
    try {
        const response = await fetch(
            `https://sheets.googleapis.com/v4/spreadsheets/${config.SPREADSHEET_ID}/values/${config.RANGE}?key=${config.API_KEY}`
        );
        const data = await response.json();
        const concerts = processConcertData(data.values);
        displayConcerts(concerts);
    } catch (error) {
        console.error('Error loading concerts:', error);
    }
}

// Process concert data
function processConcertData(values) {
    return values.map(row => ({
        date: new Date(row[0]),
        time: row[1],
        title: row[2],
        description: row[3],
        artist: row[4],
        genre: row[5],
        venue: row[6],
        city: row[7],
        cost: row[8],
        ticketLink: row[9],
        posterLink: row[10]
    }));
}

// Display concerts
function displayConcerts(concerts) {
    const currentDate = new Date();
    const upcoming = concerts.filter(concert => concert.date >= currentDate);
    const past = concerts.filter(concert => concert.date < currentDate);

    displayConcertSection(upcoming, 'upcomingConcerts');
    displayConcertSection(past, 'pastConcerts');
}

// Display concert section
function displayConcertSection(concerts, elementId) {
    const container = document.getElementById(elementId);
    container.innerHTML = concerts.map(concert => createConcertCard(concert)).join('');
}

// Create concert card HTML
function createConcertCard(concert) {
    return `
        <div class="col-md-4 concert-card" data-genre="${concert.genre}" data-month="${concert.date.getMonth()}">
            <div class="card">
                <img src="${concert.posterLink}" class="card-img-top concert-image" alt="${concert.title}">
                <div class="card-body concert-details">
                    <h5 class="card-title">${concert.title}</h5>
                    <p class="card-text concert-date">${formatDate(concert.date)} ${concert.time}</p>
                    <p class="card-text">${concert.artist}</p>
                    <p class="card-text concert-venue">${concert.venue}, ${concert.city}</p>
                    <p class="card-text concert-price">₹${concert.cost}</p>
                    <a href="${concert.ticketLink}" class="btn btn-primary" target="_blank">Book Tickets</a>
                </div>
            </div>
        </div>
    `;
}

// Format date
function formatDate(date) {
    return date.toLocaleDateString('en-US', {
        year: 'numeric',
        month: 'long',
        day: 'numeric'
    });
}

// Populate month filter
function populateMonthFilter() {
    const monthFilter = document.getElementById('monthFilter');
    const months = [
        'January', 'February', 'March', 'April', 'May', 'June',
        'July', 'August', 'September', 'October', 'November', 'December'
    ];
    months.forEach((month, index) => {
        const option = document.createElement('option');
        option.value = index;
        option.textContent = month;
        monthFilter.appendChild(option);
    });
}

// Filter events
function filterEvents() {
    const genre = document.getElementById('genreFilter').value;
    const month = document.getElementById('monthFilter').value;
    const cards = document.querySelectorAll('.concert-card');

    cards.forEach(card => {
        const cardGenre = card.dataset.genre;
        const cardMonth = card.dataset.month;
        const showGenre = genre === 'all' || cardGenre === genre;
        const showMonth = month === 'all' || cardMonth === month;
        card.style.display = showGenre && showMonth ? 'block' : 'none';
    });
}

// Add event listeners for filters
document.getElementById('genreFilter').addEventListener('change', filterEvents);
document.getElementById('monthFilter').addEventListener('change', filterEvents);
