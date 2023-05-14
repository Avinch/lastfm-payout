export default interface Artist {
  name: string;
  playcount: number;
  url: string;
  image: ArtistImage[];
  "@attr": ArtistAttributes;
}

interface ArtistImage {
  size: "small" | "medium" | "large" | "extralarge" | "mega";
  "#text": string;
}

interface ArtistAttributes {
  rank: number;
}
