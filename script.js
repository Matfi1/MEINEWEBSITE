document.addEventListener('DOMContentLoaded', () => {
    const themeToggleButton = document.getElementById('theme-toggle');
    const contactForm = document.getElementById('contact-form');
    const serviceCards = document.querySelectorAll('.service-card');
    const serviceDetails = document.getElementById('service-details');
    const newsFeed = document.getElementById('news-feed');

    // Load saved theme
    const savedTheme = localStorage.getItem('theme');
    if (savedTheme) {
        document.body.classList.add(savedTheme);
        if (savedTheme === 'dark-theme') {
            themeToggleButton.classList.add('dark');
        }
    }

    themeToggleButton.addEventListener('click', () => {
        const isDarkTheme = document.body.classList.toggle('dark-theme');
        localStorage.setItem('theme', isDarkTheme ? 'dark-theme' : 'light-theme');
        themeToggleButton.classList.toggle('dark', isDarkTheme);
    });

    serviceCards.forEach(card => {
        card.addEventListener('click', () => {
            const service = card.dataset.service;
            fetch(`/api/services/${service}`)
                .then(response => response.json())
                .then(data => {
                    serviceDetails.innerHTML = `
                        <h3>${data.title}</h3>
                        <p>${data.description}</p>
                        <p>Preis: ${data.price} EUR</p>
                    `;
                })
                .catch(error => {
                    serviceDetails.innerHTML = `<p>Fehler beim Laden der Details.</p>`;
                    console.error('Fehler beim Laden der Details:', error);
                });
        });
    });

    // Load news feed from external API
    fetch('https://api.example.com/news') // Replace with a real API endpoint
        .then(response => response.json())
        .then(data => {
            newsFeed.innerHTML = data.articles.map(article => `
                <div class="news-item">
                    <h3>${article.title}</h3>
                    <p>${article.summary}</p>
                    <a href="${article.url}" target="_blank">Weiterlesen</a>
                </div>
            `).join('');
        })
        .catch(error => {
            newsFeed.innerHTML = `<p>Fehler beim Laden der Nachrichten.</p>`;
            console.error('Fehler beim Laden der Nachrichten:', error);
        });

    contactForm.addEventListener('submit', (event) => {
        event.preventDefault(); // Prevent default form submission
        const formData = new FormData(contactForm);
        const formObject = Object.fromEntries(formData.entries());

        // Log form data to the console (simulating form submission)
        console.log('Form submitted with:', formObject);
        
        alert('Vielen Dank für Ihre Nachricht! Wir werden uns bald bei Ihnen melden.');
        contactForm.reset(); // Reset form
    });
});
