function dateStraightener(timestampsString) {
  return(
  timestampsString(8,10) +
  timestampsString(6,8) +
  timestampsString(0,5)
  );
}

export default dateStraightener;