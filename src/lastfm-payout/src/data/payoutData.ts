export default abstract class PayoutData {
  // todo: confirm if below source is legit
  // https://www.headphonesty.com/2021/11/how-much-does-spotify-pay-per-stream/
  public static spotify = 0.0033 as number;
  public static appleMusic = 0.01 as number;

  // todo: find actual source for this - after royalties, mgmt etc
  public static artistRealCutPercentage = 0.1 as number;
}
