export async function searchItem(e) {
  const response = await fetch(
    ` http://www.omdbapi.com/?s=${e}&apikey=13ea4fc3 `
  );
  const body = await response.json();
  return body;
}
export async function getList(id) {
  const response = await fetch(
    `https://acb-api.algoritmika.org/api/movies/list/${id}`
  );
  const body = await response.json();
  return body;
}

export async function registerList(nameList, arrKey) {
  const response = await fetch(
    "https://acb-api.algoritmika.org/api/movies/list",
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json; charset=utf-8",
      },
      body: JSON.stringify({
        title: nameList,
        movies: arrKey,
      }),
    }
  );

  const responseBody = await response.json();

  return responseBody;
}

export async function searchFilmInList(e) {
  const response = await fetch(
    ` http://www.omdbapi.com/?i=${e}&apikey=13ea4fc3 `
  );
  const body = await response.json();
  return body;
}
