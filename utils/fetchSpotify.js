import axios from "axios";

export const fetchSpotify = async (accessToken) => {
  if (!accessToken) return;

  try {
    const { data: json } = await axios.get(
      "https://api.spotify.com/v1/me/player/recently-played",
      {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      }
    );
    const items = json.items;

    const spotifyData = items
      .map((item) => ({
        playedAt: item.played_at,
        songName: item.track.name,
        songUrl: item.track.external_urls.spotify,
        previewUrl: item.track.preview_url,
        artists: item.track.artists.map((artist) => artist.name),
        albumName: item.track.album.name,
        albumUrl: item.track.album.external_urls.spotify,
        albumImage: item.track.album.images[0].url,
      }))
      .filter((v, i, a) => a.findIndex((t) => t.songName === v.songName) === i)
      .sort((a, b) => (a.playedAt < b.playedAt ? 1 : -1));

    return spotifyData;
  } catch {
    return;
  }
};
