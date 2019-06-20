const searchForm = document.getElementById("search-form");
const movies = document.getElementById("movies");
const urlPoster = "http://image.tmdb.org/t/p/w500";

function apiSearch(event) {
	event.preventDefault();

	const searchText = document.getElementById("search-text").value,
		server = "https://api.themoviedb.org/3/search/multi?api_key=57c852ff879035f79066cb8a16f7e4cb&language=ru&query=" +
		searchText + "&include_adult=true";

	fetch(server)
		.then(function (value) {
			if (value.status !== 200) return Promise.reject(value);
			return value.json();
		})
		.then(function (outPut) {
			let inner = "";

			outPut.results.forEach(item => {
				let nameItem = item.title || item.name,
					firstDate = item.release_date || item.first_air_date;

				inner += `<div class='col-12 p-3 mb-3 border bg-white rounded d-flex flex-row flex-wrap'>
			<div class='col-12'>${nameItem}</div>
			<div class='col-12'>Дата выхода: ${firstDate}</div>
			<img src="${urlPoster + item.poster_path}" alt="${nameItem}" class="col-6"></img>
			<div class='col-12 mt-3'>${item.overview}</div></div>`;

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