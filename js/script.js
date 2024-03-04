document.addEventListener("DOMContentLoaded", function() {
    const charactersDiv = document.getElementById("characters");
    const previousPageButton = document.getElementById("previous-page");
    const nextPageButton = document.getElementById("next-page");
    const searchInput = document.getElementById("search-input");
    const searchButton = document.getElementById("search-button");

    let currentPage = 1;

    async function fetchCharacters(page, query) {
        try {
            let url = `https://api.disneyapi.dev/character?page=${page}`;
            if (query) {
                url += `&name=${query}`;
            }
            const response = await fetch(url);
            const data = await response.json();

           
            charactersDiv.innerHTML = "";

            data.data.forEach(character => {
                const characterElement = document.createElement("div");
                characterElement.classList.add("character");

                const img = document.createElement("img");
                img.src = character.imageUrl;
                const characterInfo = document.createElement("div");
                characterInfo.classList.add("character-info");
                characterInfo.innerHTML = `
                    <h2>${character.name}</h2>
                    <p>Films: ${character.films.join(", ")}</p>
                    <p>TV Shows: ${character.tvShows.join(", ")}</p>
                    <p>Video Games: ${character.videoGames.join(", ")}</p>
                    <a href="${character.url}" target="_blank">More Info</a>
                `;
                characterElement.appendChild(img);
                characterElement.appendChild(characterInfo);
                charactersDiv.appendChild(characterElement);
            });
            currentPage = page;

            previousPageButton.disabled = !data.info.previousPage;
            nextPageButton.disabled = !data.info.nextPage;
        } catch (error) {
            console.error("Error fetching characters:", error);
        }
    }

    previousPageButton.addEventListener("click", () => {
        if (currentPage > 1) {
            fetchCharacters(currentPage - 1, searchInput.value);
        }
    });
    nextPageButton.addEventListener("click", () => {
        fetchCharacters(currentPage + 1, searchInput.value);
    });
    searchButton.addEventListener("click", () => {
        fetchCharacters(1, searchInput.value);
    });
    fetchCharacters(currentPage);
});
