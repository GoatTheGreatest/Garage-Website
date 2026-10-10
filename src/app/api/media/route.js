import { NextResponse } from "next/server";

export async function GET(request) {
  const timeout = AbortSignal.timeout(5000);
  const query = new URL(request.url).searchParams.get("q")?.trim().slice(0, 80);
  if (!query)
    return NextResponse.json({ photos: [], videos: [] }, { status: 400 });

  const photoTasks = [];
  if (process.env.UNSPLASH_ACCESS_KEY) {
    const url = new URL("https://api.unsplash.com/search/photos");
    url.searchParams.set("query", `${query} vehicle`);
    url.searchParams.set("per_page", "8");
    url.searchParams.set("orientation", "landscape");
    photoTasks.push(
      fetch(url, {
        headers: {
          Authorization: `Client-ID ${process.env.UNSPLASH_ACCESS_KEY}`,
        },
        next: { revalidate: 3600 },
        signal: timeout,
      })
        .then(async (response) => {
          if (!response.ok) return [];
          const data = await response.json();
          return (data.results ?? []).map((item) => ({
            src: item.urls.regular,
            alt: item.alt_description || `${query} vehicle`,
            author: item.user.name,
            creditUrl: item.links.html,
            source: "Unsplash",
          }));
        })
        .catch(() => []),
    );
  }
  if (process.env.PIXABAY_API_KEY) {
    const photosUrl = new URL("https://pixabay.com/api/");
    photosUrl.searchParams.set("key", process.env.PIXABAY_API_KEY);
    photosUrl.searchParams.set("q", `${query} vehicle`);
    photosUrl.searchParams.set("image_type", "photo");
    photosUrl.searchParams.set("safesearch", "true");
    photosUrl.searchParams.set("per_page", "8");
    photoTasks.push(
      fetch(photosUrl, { next: { revalidate: 3600 }, signal: timeout })
        .then(async (response) => {
          if (!response.ok) return [];
          const data = await response.json();
          return (data.hits ?? []).map((item) => ({
            src: item.largeImageURL,
            alt: item.tags || `${query} vehicle`,
            author: item.user,
            creditUrl: item.pageURL,
            source: "Pixabay",
          }));
        })
        .catch(() => []),
    );
  }

  const videosTask = process.env.PIXABAY_API_KEY
    ? (() => {
        const url = new URL("https://pixabay.com/api/videos/");
        url.searchParams.set("key", process.env.PIXABAY_API_KEY);
        url.searchParams.set("q", query);
        url.searchParams.set("safesearch", "true");
        url.searchParams.set("per_page", "5");
        return fetch(url, { next: { revalidate: 3600 }, signal: timeout })
          .then(async (response) => {
            if (!response.ok) return [];
            const data = await response.json();
            return (data.hits ?? [])
              .map((item) => ({
                src: item.videos?.medium?.url || item.videos?.small?.url,
                poster: item.userImageURL,
                author: item.user,
                creditUrl: item.pageURL,
              }))
              .filter((item) => item.src);
          })
          .catch(() => []);
      })()
    : Promise.resolve([]);

  const [photoResults, videos] = await Promise.all([
    Promise.all(photoTasks),
    videosTask,
  ]);
  const photos = photoResults
    .flat()
    .filter(
      (item, index, all) =>
        all.findIndex((match) => match.src === item.src) === index,
    )
    .slice(0, 12);
  return NextResponse.json(
    {
      photos,
      videos,
      notice:
        photos.length || videos.length
          ? null
          : "No extra media found. The vehicle's editorial gallery is still available.",
    },
    { headers: { "Cache-Control": "private, max-age=300" } },
  );
}
