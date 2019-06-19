const searchForm = document.getElementById("search-form");
const movies = document.getElementById("movies");

function apiSearch(event) {
	event.preventDefault();

	const searchText = document.getElementById("search-text").value,
		server = "https://api.themoviedb.org/3/search/multi?api_key=57c852ff879035f79066cb8a16f7e4cb&language=ru&query=" +
		searchText; //+ "&include_adult=true";

	console.log(requestApi("GET", server));
}

searchForm.addEventListener("submit", apiSearch);

function requestApi(method, url) {
	const request = new XMLHttpRequest();
	request.open(method, url);
	request.send();
	
	request.addEventListener("readystatechange", () => {
		if (request.readyState !== 4) return;
		if (request.status !== 200) {
			console.log("error: " + request.status);
			return;
		}

		const outPut = JSON.parse(request.responseText);

		let inner = "";

		outPut.results.forEach(item => {
			let nameItem = item.title || item.name,
				firstDate = item.release_date || item.first_air_date;

			inner += `<div class='col-12 p-3 mb-3 border bg-white rounded d-flex flex-row flex-wrap'>
			<div class='col-6'>${nameItem}</div><div class='col-6'>Дата выхода: ${firstDate}</div>
			<div class='col-12 mt-3'>${item.overview}</div></div>`;
		});

		movies.innerHTML = inner;

		console.log(outPut);
	});
}