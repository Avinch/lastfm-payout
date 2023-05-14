import Artist from "./Artist";

export default interface ArtistList {
  topartists: SubArtistList;
}

interface SubArtistList {
  artist: Artist[];
}
