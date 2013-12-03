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
        
        function loadRandomBook(){
            var debug=false;
            var truncLen = 200;

            $.getJSON("leisureBooksJSON.txt", function(json) {
                var numBooks = json.leisureBooks.length;
                if (debug) alert('There are '+ numBooks + ' books in the file.');
                Books = json.leisureBooks;
                var randomNum=0;
                randomNum=Math.floor(Math.random()*(numBooks));
                if (debug) alert('number is '+ randomNum);
                var book = json.leisureBooks[randomNum];
                if (debug) alert('Book is '+ Books[randomNum].title);

                var bookURL = 'https://vufind.carli.illinois.edu/vf-iit/Search/Home?lookfor=' + book.isbn + '&type=all&start_over=1&submit=Find&search=new';
                if (!book.summary)
                  var randomBookDescText = "No description available.";
                else
                  var randomBookDescText = book.summary;

                if (randomBookDescText.length > truncLen) {
                   var descTrunc = randomBookDescText.substring(0,truncLen) + "...";
                }

                emptyContainer();

                $('#bookTitle').append($('<p>').html(book.title));
                $('#bookAuthor').append($('<p>').html(book.author));

                if (descTrunc){
                  $('#bookDescText').html('<p>'+descTrunc+'<button id=\'showFull\' class=\"btn btn-info btn-xs\">Show full description</button></p>');
                }
                else {
                  $('#bookDescText').append($('<p>').html(randomBookDescText));
                }

                $('#showOPACbtn').html('<button class="btn btn-success">Interesting. Is it checked out?</a></button>');
                $('#newBookBtn').html( '<button class="btn btn-danger">No, thanks. Show me another book</button>');

                $( "#showFull" ).bind( "click", function( ) { // add click event for dynamically-created element
                   $('#bookDescText').empty();
                   $('#bookDescText').append($('<p>').html(randomBookDescText));
                });
                $( "#showOPACbtn" ).bind( "click", function( ) { // add click event for dynamically-created element
                  window.location.href=bookURL;
                });


            });




        }
