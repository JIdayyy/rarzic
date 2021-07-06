const secondsToHms = (d) => {
  d = Number(d);
  let m = Math.floor((d % 3600) / 60);
  let s = Math.floor((d % 3600) % 60);
  return "0" + m + ":" + s;
};
export default secondsToHms;
