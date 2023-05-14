import { Card, Grid } from "@nextui-org/react";
import ArtistTotalPayout from "../models/ArtistTotalPayout";
import { ArtistRealPayout } from "../models/ArtistRealPayout";

interface ArtistLineItemProps {
  name: string;
  rank: number;
  plays: number;
  image: string;
  totalPay: ArtistTotalPayout;
  realPay: ArtistRealPayout;
}

export default function ArtistLineItem(props: ArtistLineItemProps) {
  return (
    <Card>
      <Card.Body>
        <Grid.Container>
          <Grid xs={0}>
            <img src={props.image}></img>
          </Grid>
          <Grid xs={3}>{props.name}</Grid>
          <Grid xs={1}>{props.plays}</Grid>
          <Grid xs={2}>
            ${props.totalPay.spotify} (${props.realPay.spotify})
          </Grid>
          <Grid xs={2}>
            ${props.totalPay.appleMusic} (${props.realPay.appleMusic})
          </Grid>
        </Grid.Container>
      </Card.Body>
    </Card>
  );
}
