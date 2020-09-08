function getNumberOfDaysInMonth(monthIndex) {
  let year = new Date().getYear();

  switch (monthIndex) {
    case 0:
    case 2:
    case 4:
    case 6:
    case 7:
    case 9:
    case 11:
      return 31;
    break;
    case 1:
      return (((year % 4 == 0) && (year % 100 != 0)) || (year % 400 == 0)) ? 29 : 28;
    break;
    case 3:
    case 5:
    case 8:
    case 10:
      return 30;
    break;
    default:
      return 31;
  }
}

export default getNumberOfDaysInMonth;