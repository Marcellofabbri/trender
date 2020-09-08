function getDateNumber(epochSeconds) {
  let date = new Date(epochSeconds*1000);
  return date.getDate();
}

export default getDateNumber;