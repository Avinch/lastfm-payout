interface ArtistLineItemProps {
  name: string;
  rank: number;
  plays: number;
  image: string;
}

export default function ArtistLineItem(props: ArtistLineItemProps) {
  return (
    <li>
      #{props.rank} | {props.name} | {props.plays}
    </li>
  );
}
