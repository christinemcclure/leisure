// work with smaller file for now
var testing=false;
var dataFile;
if (testing)
  dataFile = 'leisureBooks-sample.json';
else
  dataFile = 'leisureBooks.json';

var howMany = 3;


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

function loadRandomBooks(){
    var debug=false;
    var debug2=false;
    var truncLen = 300;
    var bookSummaryTxt;
    var truncArr = [];

    $.getJSON(dataFile, function(json) {
        $('#bookList tbody').empty();
        $('#headingLine').html('Here are '+ howMany + ' random books');
        var numBooks = json.leisureBooks.length;
        Books = json.leisureBooks;
        var numArr=generateRandomNumbers(howMany, numBooks);
          for (var i=0; i<numArr.length; i++){
            var setDesc=false;
            var thisBook=Books[numArr[i]];
            var bookURL = 'https://vufind.carli.illinois.edu/vf-iit/Search/Home?lookfor=' + thisBook.isbn + '&type=all&start_over=1&submit=Find&search=new';
            if (!thisBook.title) // unlikely, but handle anyway
                thisBook.author="[untitled]";
            if (!thisBook.author)
                thisBook.author="(no author supplied)";
            if (!thisBook.summary)
                bookSummaryTxt = "No description available.";
            else
                bookSummaryTxt = thisBook.summary;

            var row = '<tr id=\"'+i+'\">';
            row += '<td class=\"title\">' + thisBook.title +'</td>';
            row += '<td>' + thisBook.author + '</td>';

            // handle summary
            if (bookSummaryTxt.length > truncLen) {
              setDesc=true;
              bookSummaryTxt = bookSummaryTxt.substring(0,truncLen) + "..."; 
              truncArr.push(thisBook.summary); // store full desc in array
              var len = truncArr.length;
              console.log ('i = '+i +' len is '+len);
              console.log ('full desc for \"' + thisBook.title + '\" is: '+ truncArr[len-1]);
              row += '<td class=\'desc\'>' + bookSummaryTxt + ' <a id=\'moreLink' + i + '\'>more</a>' + '</td>'; // create more link
            }
            else {
              row += '<td class=\'desc\'>' + bookSummaryTxt + '</td>';
            }  

            row += '<td><p class=\"button\"><a target=\"_blank\"href=\"'+ bookURL +'\">Checked out?</a></p></td>';
            row += '</tr>';
            
            $('#bookList').append(row);        
      }// end for

      console.log('ending length=' + truncArr.length);   
//      console.log(JSON.stringify(truncArr));
//        $('#bookList').delegate('#moreLink'+i, 'click', function() {alert("That tickles, "+i)});     
  
    });
    
        
       


}
