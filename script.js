const accessKey = "fK9BKn1zgvbeqI-2ia9WxDQJYAXwtISHT6GiiDVzHBc";

const sf = document.getElementById("sf");
const sb = document.getElementById("sb");
const sr = document.getElementById("sr");
const sm = document.getElementById("sm");

let keyword = "";
let page = 1;

async function sImages() {
    keyword = sb.value; // get value from input field
    const url = `https://api.unsplash.com/search/photos?page=${page}&query=${keyword}&client_id=${accessKey};` // Use backticks and correct variable name
    const response = await fetch(url); // Await the fetch
    const data = await response.json(); // Await the response data

    if (page == 1) {
        sr.innerHTML = ""; // Clear previous results on new search
    }

    const results = data.results;
    results.map((result) => {
        const image = document.createElement("img");
        image.src = result.urls.small;
        const imageLink = document.createElement("a");
        imageLink.href = result.links.html;
        imageLink.target = "_blank";

        imageLink.appendChild(image);
        sr.appendChild(imageLink);
    });

    sm.style.display = 'block'; // Show the "Load More" button after results
}

// Handle form submit
sf.addEventListener("submit", (e) => {
    e.preventDefault(); // Prevent page refresh
    page = 1; // Reset to first page on new search
    sImages(); // Fetch images
});

// Handle "Load More" button click
sm.addEventListener("click", () => {
    page++; // Increment page for pagination
    sImages(); // Fetch more images
});