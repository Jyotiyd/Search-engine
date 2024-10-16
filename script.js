document.addEventListener('DOMContentLoaded', () => {
    const accessKey = "3dq69sCdZHih7kYZBREPzQpo_2wRKDc1PLaGGK6DtXk";
    const searchForm = document.getElementById("search-form");
    const searchBox = document.getElementById("search-box");
    const searchResult = document.getElementById("search-result");
    const searchBackBtn = document.getElementById("back-to-home-btn");
    const searchMoreBtn = document.getElementById("show-more-btn");
    let keyword = "";
    let page = 1;
    async function searchImages() {
        keyword = searchBox.value;
        const url = `https://api.unsplash.com/search/photos?page=${page}&query=${keyword}&client_id=${accessKey}&per_page=12`;
        const response = await fetch(url);
        const data = await response.json();
        if (page === 1) {
            searchResult.innerHTML = "";
        }
        const results = data.results;
        results.forEach((result) => {
            const image = document.createElement('img');
            image.src = result.urls.small;
            const imageLink = document.createElement("a");
            imageLink.href = result.links.html;
            imageLink.target = "_blank";
            imageLink.appendChild(image);
            searchResult.appendChild(imageLink);
        });
        searchBackBtn.style.display = "block";
        searchMoreBtn.style.display = "block";
    }
    searchForm.addEventListener("submit", (e) => {
        e.preventDefault();
        page = 1;
        searchImages();
    });
    searchBackBtn.addEventListener("click", () => {
        page--;
        searchImages();
    });
    searchMoreBtn.addEventListener("click", () => {
        page++;
        searchImages();
    });
});
