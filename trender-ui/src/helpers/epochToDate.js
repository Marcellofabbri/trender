function epochToDate(epoch) {
  var seconds = parseInt(epoch);

  var date = new Date(seconds * 1000);

  var year = date.getFullYear();
  var month = date.getMonth() + 1;
  var day = date.getDate();
  var hours = date.getHours();
  var minutes = date.getMinutes();
  var seconds = date.getSeconds();

  var string = day + '/' + month + '/' + year;

  return string;
}

export default epochToDate;