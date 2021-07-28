function showOnPage(input){
    let movies = document.getElementById("movieDetails");
    movies.innerHTML = "";
    let name = input.Title;
    let date = input.Released;
    let img = input.Poster;
    let rating = input.imdbRating;
    let runtime = input.Runtime;
    let plot = input.Plot;
    let lang = input.Language;
    let genre = input.Genre;
    let actor = input.Actors;
    let writer = input.Writer;
    let div = document.createElement("div");
    div.className = "movie";
    div.innerHTML = `<div>
    <div  id="rec"></div>
        <img src="${img}" alt="Poster">
        </div>
        <div>
        <h1>Title : ${name}</h1>
        <h2>Released : ${date}</h2>
        <div><span>Runtime :</span> <span class="high">${runtime}</span></div>
        <div><span>Genre :</span> <span class="high">${genre}</span></div>
        <div><span>Rating :</span> <span class="high" id="rating">${rating}</span></div>
        <div><span>Actor :</span> <span class="high">${actor}</span></div>
        <div><span>Writer :</span> <span class="high">${writer}</span></div>
        <div><span>Story :</span> <span class="high">${plot}</span></div>
        <div><span>Language :</span> <span class="high">${lang}</span></div>
    </div>`;
    movies.append(div);
}

let btn = document.getElementById("youtube");
btn.style.visibility = "hidden";

async function movieFinder(){
    try{
        let movie = document.getElementById("movie").value;
        let res = await fetch(`http://www.omdbapi.com/?apikey=5f84c60b&t=${movie}`);
        let data = await res.json();
        if(data.Response == "False"){
            let movies = document.getElementById("movieDetails");
            movies.innerHTML = `<p>${data.Error}</p><img src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQ7zp-WcOvX4K6CL-QpflkUevb2ZZSEY9knEw&usqp=CAU">`;
        }else{
            showOnPage(data);
            let rec = document.getElementById("rec");
            if(data.imdbRating>8.5){
                let p = document.createElement("p");
                p.innerHTML = "Recommended";
                rec.append(p);
            }
            movie = movie.trim().split(" ");
            let text = "";
            movie.forEach(function(x){
                text+=x+"+";
            })
            text+="trailer";
            let btn = document.getElementById("youtube");
            btn.style.visibility = "visible";
            let myUrl = `https://www.youtube.com/results?search_query=${text}`;
            btn.addEventListener("click", function(){
                window.open(myUrl);
            })
        }
    }catch (err){
        console.log(err.message);
    }
}
