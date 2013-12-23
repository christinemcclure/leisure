// work with smaller file for now
var testing=false;
var dataFile;
if (testing)
  dataFile = 'leisureBooks-sample.json';
else
  dataFile = 'leisureBooks.json';

var howMany = 3;
var descriptions = []; // for an array of bookDesc objects;


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
    var truncLen = 200;
    var bookSummaryTxt;
    var truncArr = [];

    $.getJSON(dataFile, function(json) {
        $('#bookList tbody').empty();
        $('#headingLine').html('Here are '+ howMany + ' random books');
        var numBooks = json.leisureBooks.length;
        Books = json.leisureBooks;
        var numArr=generateRandomNumbers(howMany, numBooks);
          for (var i=0; i<numArr.length; i++){
            var bookDesc = {};
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

            var row = '<tr id=\"row'+i+'\">';
            row += '<td class=\"title\">' + thisBook.title +'</td>';
            row += '<td>' + thisBook.author + '</td>';

            // handle summary
            if (bookSummaryTxt.length > truncLen) {
              bookSummaryTxt = bookSummaryTxt.substring(0,truncLen) + "..."; 
             var moreLinkID = 'MoreLink'+i.toString();
             bookDesc.id = moreLinkID;
             bookDesc.summary = thisBook.summary;
             console.log('LOOP i = ' + i + ' ' +JSON.stringify(bookDesc));
             descriptions.push(bookDesc);
//             console.log('*** item ' + moreLinkID + '\n' + bookDesc[moreLinkID]);
              row += '<td id=\"text'+moreLinkID+'\" class=\'desc\'>' + bookSummaryTxt + ' <a id=\'' + moreLinkID + '\'>more</a>' + '</td>'; // create more link
            }
            
            else {          
              row += '<td class=\'desc\'>' + bookSummaryTxt + '</td>';
            }  

            row += '<td><p class=\"button\"><a target=\"_blank\"href=\"'+ bookURL +'\">Checked out?</a></p></td>';
            row += '</tr>';
            
            $('#bookList').append(row); 
//            $( "#bookList td#cell"+i+' #moreLink'+i ).on( "click", function() {
//              alert('i is '+i+' and title is "'+ thisBook.title);
//            });


//            $('#row'+i).on('click', '#'+moreLinkID, function(){
//                 alert(JSON.stringify(bookDesc[i])); 
//            });

      }// end for
      
      

        // Use event delegation
//        document.getElementById("bookList").addEventListener("click",function(e) {
//          // e.target is the clicked element!
//          // If it was a list item
//          if(e.target && e.target.nodeName === "A") {
//            // List item found!  Output the ID!
//            var thisDesc;
//            thisDesc=findDesc(e.target.id);
//            console.log("anchor tag ",e.target.id," was clicked. Here is the summary:\n"+ thisDesc);
//          }
//        });      
      function changeDesc() {
        console.log( event.target.id + " clicked" );
        var thisDesc;
        thisDesc=findDesc(event.target.id);
        $('#text'+event.target.id).html(thisDesc);
      }
      
      $( "#bookList" ).on( "click", changeDesc );

      for ( var ele in descriptions){         
         console.log('ele: '+ ele + ' item: '+ JSON.stringify(descriptions[ele])+'\n');
      }

      

      
    });
    
        
      function findDesc(idToFind){
        for (var i in descriptions){
          if (descriptions[i].id===idToFind){
            return descriptions[i].summary;
          }
          else {
            continue;
          }
        }
      }       


}
