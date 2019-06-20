const searchForm = document.getElementById("search-form");
const movies = document.getElementById("movies");
const urlPoster = "http://image.tmdb.org/t/p/w500";

function apiSearch(event) {
	event.preventDefault();

	const searchText = document.getElementById("search-text").value,
		server = "https://api.themoviedb.org/3/search/multi?api_key=57c852ff879035f79066cb8a16f7e4cb&language=ru&query=" +
		searchText;// "&include_adult=true";

	fetch(server)
		.then(function (value) {
			if (value.status !== 200) return Promise.reject(value);
			return value.json();
		})
		.then(function (outPut) {
			let inner = "";

			outPut.results.forEach(item => {
				let nameItem = item.title || item.name;
				let firstDate = item.release_date || item.first_air_date;

				let poster;
				if (item.poster_path == null){
					poster = `<div class="col-12"><div class="poster"></div></div>`;
				} else{
					poster = `<div class="col-12"><img src="${urlPoster + item.poster_path}" alt="${nameItem}"></img></div>`;
				}

				inner += `<div class="col-4"><div class='col-12 mb-3 p-3 border bg-white rounded'>
				<div class='col-12'>${nameItem}</div>
				<div class='col-12 mb-3'>Дата выхода: ${firstDate}</div>
				${poster}</div></div>`;

				movies.innerHTML = inner;
			});

			console.log(outPut);
		})
		.catch(function (reason) {
			movies.innerHTML = "Упс, что то пошло не так:(";
			console.error("error: " + reason.status);
		});
}

searchForm.addEventListener("submit", apiSearch);