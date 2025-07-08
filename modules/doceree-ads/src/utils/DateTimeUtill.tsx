
const getCurrentDate=()=>{

      var date = new Date().getDate();
      var month = new Date().getMonth() + 1;
      var year = new Date().getFullYear();

      //Alert.alert(date + '-' + month + '-' + year);
      // You can turn it in to your desired format
      return date + '-' + month + '-' + year;//format: d-m-y;
}

const getCurrentTimestamp = () => {
  return new Date().getTime();
}


export const getFormatCurrentDate = () => {
  // EEE, d MMM yyyy HH:mm:ss

  var today = new Date();
  // console.log("Day, getFullYear ", today, today.getMonth(), today.getFullYear());
  var date = new Date(today).toLocaleDateString('en-gb', {
    weekday: 'long',
    year: 'numeric',
    month: 'long',
    day: 'numeric',
    hour: 'numeric',
    minute: 'numeric',
    second: 'numeric',
    timeZone: 'utc'
  });
  console.log('New Date: ', date);
  // console.log('currentDate: ', currentDate[0]+ " " + currentDate[1].replace(/Z/g, ''));
  // return currentDate[0]+ " " + currentDate[1].replace(/Z/g, '');

  var d = new Date();
  var customFormat = d.toString().slice(0,3) + ', ' +              //Day
                    d.getDate() + ' ' +                          //Day number
                    d.toString().slice(4,7) + ' ' +            // Month
                    d.getFullYear() + ' ' +
                    d.toTimeString().slice(0,8) + " IST";      //HH:MM:SS

  console.log('customFormat: ', customFormat);

  return customFormat;
}
