function convert(UNIX_timestamp) {
    var a = new Date(UNIX_timestamp);
    var months = [
      "Jan",
      "Feb",
      "Mar",
      "Apr",
      "May",
      "Jun",
      "Jul",
      "Aug",
      "Sep",
      "Oct",
      "Nov",
      "Dec"
    ];
    var year = a.getFullYear();
    var month = months[a.getMonth()];
    var date = a.getDate();
    // var hour = a.getHours();
    // var min = a.getMinutes();
    var sec = a.getSeconds();
    if (sec < 10) {
      sec = ("0" + sec).slice(-2);
    }
    var time = `${date} ${month} ${year}`;
    return time;
  }
  export {convert};