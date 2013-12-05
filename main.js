// work with smaller file for now
var testing=false;
var dataFile;
if (testing)
  dataFile = 'leisureBooks-sample.json';
else
  dataFile = 'leisureBooks.json';

var howMany = 2;

        function emptyContainer(){
            var bookElements = new Array ("#bookTitle","#bookAuthor","#bookDescText","#showOPACbtn");
            bookElements.forEach(function(ele){
               $(ele).empty();
            });
        }

        function pad0(item){
            item += ''; //convert to string
            var len = item.length;
            if (item.length < 2)
                item = '0'+ item;
            return item;
        }

        function formatDateTime(){//obj is the element to write the date to
            var monthArr = new Array ('January', 'February','March','April','May','June','July','August','September','October','November','December');
            var monthNum = dateObj.getMonth();
            var day = dateObj.getDay();
            var meridian = "";
            var hour = dateObj.getHours();
                if (hour > 12){// sadly, we don't use military time in this country
                    hour = hour - 12;
                    meridian = 'pm';
                }
                else {
                    meridian = 'am';
                }
            var minutes = dateObj.getMinutes();
                minutes = pad0(minutes);

            var newDate = monthArr[monthNum] + ' ' + day + ', ' + dateObj.getFullYear() + ' ' + hour + ":" + minutes + meridian;
            return(newDate);
        }


// don't add duplicate numbers to the array
function checkIfInArray(arr, item){
  var flag = false;
  for (var i = 0; i < arr.length; i++){
    if (arr[i]==item){
      flag = true;
      break;
    }
  }
  return flag;
}

function generateRandomNumbers(howMany, numBooks){
    var debug=false;
          if (debug) numBooks = 5; // force more duplicates
    var numArr= new Array; //make sure to try with just 1
    var randomNum;
    var flag;
    for (var i=0; i<howMany; i++){
      flag=true;
      while (flag==true){
        randomNum=Math.floor(Math.random()*(numBooks));
        flag = checkIfInArray(numArr, randomNum);
        if (flag ==false){
          numArr[i]=randomNum;
        }
      }
    }
    if (debug) alert(JSON.stringify(numArr));
    return numArr;
}

function loadRandomBook(){
    var debug=false;
    var debug2=false;
    var truncLen = 200;
    var bookSummaryTxt;

    $.getJSON(dataFile, function(json) {
        $('#bookList tbody').empty();
        $('#heading').html('Here are '+ howMany + ' random books');
        var numBooks = json.leisureBooks.length;
        Books = json.leisureBooks;
        var numArr=generateRandomNumbers(howMany, numBooks);
          for (var i=0; i<=numArr.length; i++){
              var thisBook=Books[numArr[i]];
              var bookURL = 'https://vufind.carli.illinois.edu/vf-iit/Search/Home?lookfor=' + thisBook.isbn + '&type=all&start_over=1&submit=Find&search=new';
              if (!thisBook.summary)
                  bookSummaryTxt = "No description available.";
              else
                  bookSummaryTxt = thisBook.summary;
//                  if (bookSummaryTxt.length > truncLen) {
//                     var descTrunc = bookSummaryTxt.substring(0,truncLen) + "...";
//                  }                   
//                if (descTrunc){
//                  row += '<td>' + descTrunc + '<button id=\'showFull\' class=\"\">Show full description</button>' + '</td>';
//                }
//                else {
//                  row += '<td>' + bookSummaryTxt + '</td>';
//                }                      

                var row = '<tr id=\"'+i+'\">';
                row += '<td class=\"title\">' + thisBook.title + '</td>';
                row += '<td>' + thisBook.author + '</td>';
                row += '<td class=\"desc\">' + bookSummaryTxt + '</td>';
                row += '<td><button><a target=\"_blank\" href=\"'+ bookURL +'\">Is it checked out?</a></button></td>';
                row += '</tr>';

                $('#bookList').append(row);
          }
    });
}
