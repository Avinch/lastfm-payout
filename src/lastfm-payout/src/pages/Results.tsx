import { useEffect, useState } from "react";
import lastFmService from "../services/lastFmService";
import { Container, Grid, Loading, Text } from "@nextui-org/react";

import { useParams } from "react-router-dom";
import Artist from "../models/Artist";
import ArtistLineItem from "../component/ArtistLineItem";
import ArtistTotalPayout from "../models/ArtistTotalPayout";
import { ArtistRealPayout } from "../models/ArtistRealPayout";
import PayoutData from "../data/payoutData";

interface ResultDetails {
  totalPaid: number;
  artists: ArtistResult[];
  totalPlays: number;
}

interface ArtistResult {
  name: string;
  thumbImage: string;
  playCount: number;
  paidAmount: number;
  rank: number;
  totalPay: ArtistTotalPayout;
  realPay: ArtistRealPayout;
}

export default function Results() {
  const [results, setResults] = useState({} as ResultDetails);

  const [loading, setLoading] = useState(true);
  const { username } = useParams();

  useEffect(() => {
    const getData = async () => {
      if (username) {
        setLoading(true);
        const service = new lastFmService();
        var data = await service.GetRankings(username);

        if (data) {
          mapResults(data.topartists.artist);
        }

        setLoading(false);
      }
    };

    const calcTotal = (playCount: number, perPlay: number) => {
      return Number((playCount * perPlay).toFixed(2));
    };

    const calcRealTotal = (playCount: number, perPlay: number) => {
      return Number(
        (playCount * perPlay * PayoutData.artistRealCutPercentage).toFixed(2)
      );
    };

    const mapResults = (data: Artist[]) => {
      let artistList = data.map((a) => {
        const playCount = Number(a.playcount);
        return {
          name: a.name,
          playCount: playCount,
          thumbImage: a.image.filter((x) => x.size === "small")[0]["#text"],
          rank: a["@attr"].rank,
          totalPay: {
            spotify: calcTotal(playCount, PayoutData.spotify),
            appleMusic: calcTotal(playCount, PayoutData.appleMusic),
          } as ArtistTotalPayout,
          realPay: {
            spotify: calcRealTotal(playCount, PayoutData.spotify),
            appleMusic: calcRealTotal(playCount, PayoutData.appleMusic),
          } as ArtistRealPayout,
        } as ArtistResult;
      });

      const totalPlays = artistList.reduce((part, a) => part + a.playCount, 0);

      let results = {
        artists: artistList,
        //totalPaid: calcTotal(totalPlays),
        totalPlays: totalPlays,
      } as ResultDetails;

      setResults(results);
    };

    getData();
  }, []);

  return (
    <>
      {loading ? (
        <Loading>Loading data from last.fm</Loading>
      ) : (
        <>
          <Text h3>Results for {username}</Text>
          <Text h4>
            {results.totalPlays} plays for {results.artists.length} artists
          </Text>
          {results && (
            <Grid.Container gap={1} xs={12} css={{ width: "50%" }}>
              {results.artists.map((x) => {
                return (
                  <Grid>
                    <ArtistLineItem
                      name={x.name}
                      rank={x.rank}
                      plays={x.playCount}
                      image={x.thumbImage}
                      totalPay={x.totalPay}
                      realPay={x.realPay}
                    />
                  </Grid>
                );
              })}
            </Grid.Container>
          )}
        </>
      )}
    </>
  );
}
