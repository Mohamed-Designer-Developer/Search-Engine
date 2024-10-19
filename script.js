// DOM Selecting
const searchBox = document.getElementById("search-box"),
  searchArea = document.getElementById("search-result"),
  showMore = document.getElementById("show-more-btn"),
  searchForm = document.getElementById("form-search");

// APIkey 
const accesKey = "WrDKrTmQQxzrhf8HzgsZO02Ybbq_324_Mw7KbQwFmBc";

// what we write 
let keyword = "";

// pages to show to us 
let page = 1;

// image search Function 
const imageSearch = async () => {

    // input value 
    keyword = searchBox.value;
    
    // API request URL
    const url = `https://api.unsplash.com/search/photos?page=${page}&query=${keyword}&client_id=${accesKey}&per_page=20`;
    const request = await fetch(url);
    const response = await request.json();

    // if results got clear input
    if (page === 1) {
        searchArea.innerHTML = "";
    }

    //get desired results
    const results = response.results;

    // generate image 
    results.map((result) => {
        //<div id="results"> ... <a href="" target="_blank"><img src="image" /></a></div>
        const image =document.createElement('img');
        image.src = result.urls.small;
        const imageLink = document.createElement('a');
        imageLink.href= result.links.html;
        imageLink.target ="_blank";
        imageLink.appendChild(image);
        searchArea.appendChild(imageLink);
    })

    // if results show more button for pagination
    showMore.style.display = 'block';
}

// Search Form 
searchForm.addEventListener('submit' , (e) => {
    e.preventDefault();
    page= 1;
    imageSearch();
})

// Search More Button
showMore.addEventListener('click', () => {
    page++;
    imageSearch();
})
