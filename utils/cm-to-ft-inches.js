export default (value) => {
  let num = +value;
  const ft = num * 0.0328084;
  const remainder = ft % 1;
  const inches = remainder * 12;
  return `${Math.trunc(ft)}ft and ${inches.toFixed(3)}inches`;
};
