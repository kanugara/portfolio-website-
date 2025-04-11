document.addEventListener("DOMContentLoaded", () => {
    const rssFeedContainer = document.getElementById("rss-feed");
    const buttons = document.querySelectorAll(".rss-buttons button");

    // RSS feed URLs for different countries and languages
    const rssFeeds = {
        us: "https://rss.nytimes.com/services/xml/rss/nyt/World.xml", // US News
        uk: "https://feeds.bbci.co.uk/news/uk/rss.xml", // UK News
        fr: "https://www.lemonde.fr/rss/une.xml" // France News
    };

    // Add event listeners to buttons
    buttons.forEach(button => {
        button.addEventListener("click", () => {
            const country = button.dataset.country;
            const lang = button.dataset.lang;
            fetchRSSFeed(rssFeeds[country], lang);
        });
    });

    // Fetch and display RSS feed
    function fetchRSSFeed(url, lang) {
        rssFeedContainer.innerHTML = `<p>Loading news...</p>`;
        fetch(`https://api.allorigins.win/get?url=${encodeURIComponent(url)}`)
            .then(response => {
                if (!response.ok) {
                    throw new Error("Failed to fetch RSS feed");
                }
                return response.json();
            })
            .then(data => {
                const parser = new DOMParser();
                const xmlDoc = parser.parseFromString(data.contents, "application/xml");
                displayFeed(xmlDoc, lang);
            })
            .catch(error => {
                rssFeedContainer.innerHTML = `<p>Error loading feed: ${error.message}</p>`;
            });
    }

    // Display RSS feed
    function displayFeed(xmlDoc, lang) {
        const items = xmlDoc.querySelectorAll("item");
        rssFeedContainer.innerHTML = "";

        items.forEach(item => {
            const title = item.querySelector("title").textContent;
            const link = item.querySelector("link").textContent;
            const description = item.querySelector("description")?.textContent || "No description available.";

            const feedItem = document.createElement("div");
            feedItem.classList.add("rss-item");
            feedItem.innerHTML = `
                <h2><a href="${link}" target="_blank">${title}</a></h2>
                <p>${description}</p>
            `;
            rssFeedContainer.appendChild(feedItem);
        });

        // Add a language-specific message
        const langMessage = lang === "fr" ? "Actualités en français" : "News in English";
        const langNotice = document.createElement("p");
        langNotice.textContent = langMessage;
        langNotice.style.fontStyle = "italic";
        rssFeedContainer.prepend(langNotice);
    }
});