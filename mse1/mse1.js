function showOnPage(input){
    let movies = document.getElementById("movies");
    movies.innerHTML = "";
    let data = input;
    for(let i=0;i<data.length;i++){
        let name = data[i].Title;
        let year = data[i].Year;
        let img = data[i].Poster;
        let div = document.createElement("div");
        div.class = "movie";
        div.innerHTML = `<img src="${img}" alt="Poster">
        <h1>${name}</h1>
        <h2>${year}</h2>`;
        movies.append(div);
    }
}


async function movieFinder(){
    let movie = document.getElementById("movie").value;
    let res = await fetch(`http://www.omdbapi.com/?apikey=5f84c60b&s=${movie}`);
    let data = await res.json();
    showOnPage(data.Search);
    console.log(data.Search);
}