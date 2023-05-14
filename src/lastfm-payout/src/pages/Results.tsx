import { useEffect, useState } from "react";
import lastFmService from "../services/lastFmService";
import { useParams } from "react-router-dom";
import Artist from "../models/Artist";
import ArtistLineItem from "../component/ArtistLineItem";

export default function Results() {
  const [results, setResults] = useState([] as Artist[]);
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
          setResults(data.topartists.artist);
        }

        setLoading(false);
      }
    };

    getData();
  }, []);

  return (
    <>
      {loading ? (
        <h1>loading</h1>
      ) : (
        <>
          <h1>Results for {username}</h1>

          {results && (
            <ul>
              {results.map((x) => {
                return (
                  <ArtistLineItem
                    name={x.name}
                    rank={x["@attr"].rank}
                    plays={x.playcount}
                    image={x.image.filter((x) => x.size === "mega")[0]["#text"]}
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
