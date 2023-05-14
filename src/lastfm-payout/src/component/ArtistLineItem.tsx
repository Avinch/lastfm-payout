import { Card, Grid } from "@nextui-org/react";

interface ArtistLineItemProps {
  name: string;
  rank: number;
  plays: number;
  image: string;
  paidAmount: number;
}

export default function ArtistLineItem(props: ArtistLineItemProps) {
  return (
    <Card>
      <Card.Body>
        <Grid.Container>
          <Grid xs={1}>
            <img src={props.image}></img>
          </Grid>
          <Grid xs={2}>{props.name}</Grid>
          <Grid xs={1}>{props.plays}</Grid>
          <Grid xs={1}>${props.paidAmount}</Grid>
        </Grid.Container>
      </Card.Body>
    </Card>
  );
}
