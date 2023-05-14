import { useEffect, useState } from "react";
import lastFmService from "../services/lastFmService";
import { Text } from "@nextui-org/react";

import { useParams } from "react-router-dom";
import Artist from "../models/Artist";
import ArtistLineItem from "../component/ArtistLineItem";

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
        console.log(data);

        if (data) {
          mapResults(data.topartists.artist);
        }

        setLoading(false);
      }
    };

    const calcTotal = (playCount: number) => {
      return Number((playCount * 0.003).toFixed(2));
    };

    const mapResults = (data: Artist[]) => {
      let artistList = data.map((a) => {
        const playCount = Number(a.playcount);
        return {
          name: a.name,
          playCount: playCount,
          paidAmount: calcTotal(playCount),
          thumbImage: a.image.filter((x) => x.size === "small")[0]["#text"],
          rank: a["@attr"].rank,
        } as ArtistResult;
      });

      const totalPlays = artistList.reduce((part, a) => part + a.playCount, 0);

      let results = {
        artists: artistList,
        totalPaid: calcTotal(totalPlays),
        totalPlays: totalPlays,
      } as ResultDetails;

      console.log("fullResults", results);

      setResults(results);
    };

    getData();
  }, []);

  return (
    <>
      {loading ? (
        <h1>loading</h1>
      ) : (
        <>
          <Text h3>Results for {username}</Text>
          <Text h4>
            Total paid out to {results.artists.length} artists for{" "}
            {results.totalPlays} plays: ${results.totalPaid}
          </Text>
          {results && (
            <ul>
              {results.artists.map((x) => {
                return (
                  <ArtistLineItem
                    name={x.name}
                    rank={x.rank}
                    plays={x.playCount}
                    image={x.thumbImage}
                    paidAmount={x.paidAmount}
                  />
                );
              })}
            </ul>
          )}
        </>
      )}
    </>
  );
}
