export function DateTimeParser(datetime: string) {
  // Split timestamp into [ Y, M, D, h, m, s ]
  // var cleanedString = datetime.replace("T", " ");
  // cleanedString = cleanedString.replace("Z", " ");
  // cleanedString = cleanedString.replace("/-/g", " ");
  // cleanedString = cleanedString.replace("/:/g", " ");
  // console.log(cleanedString);
  // // var t = datetime.split(/[- :]/);
  // var t = cleanedString.split(" ");

  console.log(datetime)

var t = datetime.split(/[- :TZ]/);

  console.log(t);
  // Apply each element to the Date function
  var d = new Date(
    Date.UTC(
      Number(t[0]),
      Number(t[1]) - 1,
      Number(t[2]),
      Number(t[3]),
      Number(t[4]),
      Number(t[5])
    )
  );

  //("2024-11-26T01:08:28.000Z");

  return d;
}
