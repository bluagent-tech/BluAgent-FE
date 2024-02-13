const dateConvertTables = (data, monthYear) => {
  if ((data !== undefined) && (data !== null)) {
    var info = data.split("-");
    if (monthYear) {
      var date = info[1] + "/" + info[0];
    } else {
        if (info[2].substring(8, 3) === "00:00") {  date = info[1] + "/" + info[2] + "/" + info[0]; }
        else {  date = info[1] + "/" + info[2].substring(0, 2) + "/" + info[0] + " " + info[2].substring(8, 3); }      
    }
    return date.replace("T00:00:00", "");
  } else {
    return "";
  }
};
export default dateConvertTables;
