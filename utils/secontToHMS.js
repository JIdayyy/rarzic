const secondsToHms = (d) => {
  d = Number(d);
  let m = Math.floor((d % 3600) / 60);
  let s = Math.floor((d % 3600) % 60);
  return m + ":" + s;
};
export default secondsToHms;
