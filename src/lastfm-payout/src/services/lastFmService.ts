import axios from "axios";
import ArtistList from "../models/ArtistList";

export default class lastFmService {
  baseUrl = "http://ws.audioscrobbler.com/2.0/?";
  apiKey = "ce878b703a51ae341129c5360f586790";
  limit = 20;

  async GetRankings(username: string): Promise<ArtistList | undefined> {
    return await this.get<ArtistList>(
      `method=user.gettopartists&user=${username}&api_key=${this.apiKey}&format=json&limit=${this.limit}`
    );
  }

  async get<T>(endpoint: string) {
    try {
      const { data, status } = await axios.get<T>(`${this.baseUrl}${endpoint}`);

      if (status === 200) {
        return data;
      }
    } catch (err) {}
  }
}
