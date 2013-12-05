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

            $.getJSON(dataFile, function(json) {
                var numBooks = json.leisureBooks.length;
//                if (debug) alert('There are '+ numBooks + ' books in the file.');
                Books = json.leisureBooks;
                //if (debug) alert('number is '+ randomNum);
//                if (debug) alert('Book is '+ Books[randomNum].title);
                var numArr=generateRandomNumbers(howMany, numBooks);
//                if (debug2) console.log(JSON.stringify(numArr));
                  for (var i=0; i<=numArr.length; i++){
                      var thisBook=Books[numArr[i]];
//                      alert(JSON.stringify(thisBook));
                      var bookURL = 'https://vufind.carli.illinois.edu/vf-iit/Search/Home?lookfor=' + thisBook.isbn + '&type=all&start_over=1&submit=Find&search=new';
                      if (!thisBook.summary)
                          randomBookDescText = "No description available.";
                      else
                          randomBookDescText = thisBook.summary;
                      if (randomBookDescText.length > truncLen) {
                         var descTrunc = randomBookDescText.substring(0,truncLen) + "...";
                      }

                        var row = '<tr id=\"'+i+'\">';
                        row += '<td>' + thisBook.title + '</td>';
                        row += '<td>' + thisBook.author + '</td>';
                        row += '<td>' +  randomBookDescText + '</td>';
                        row += '<td></td>'
                        row += '</tr>';
                        
                        $('#bookList').append(row);
                
                  }
//                $('#1').append($('<p>').html(book.title));
//                $('#bookAuthor').append($('<p>').html(book.author));
//
//                if (descTrunc){
//                  $('#bookDescText').html('<p>'+descTrunc+'<button id=\'showFull\' class=\"btn btn-info btn-xs\">Show full description</button></p>');
//                }
//                else {
//                  $('#bookDescText').append($('<p>').html(randomBookDescText));
//                }
//
//                $('#showOPACbtn').html('<button class="btn btn-success">Checked out?</a></button>');
//                $('#newBookBtn').html( '<button class="btn btn-danger">No, thanks. Show me another book</button>');
//
//                $( "#showFull" ).bind( "click", function( ) { // add click event for dynamically-created element
//                   $('#bookDescText').empty();
//                   $('#bookDescText').append($('<p>').html(randomBookDescText));
//                });
//                $( "#showOPACbtn" ).bind( "click", function( ) { // add click event for dynamically-created element
//                  window.open(bookURL,'_blank');
//                });
//

            });




        }
