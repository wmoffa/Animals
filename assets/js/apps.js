//Bill Moffa

        // initial buttons
        var buttonArray = ["dogs","cats","birds","elephants"];

        // initial pix slextio
        var selectName = "cats";

        // initial display of pictures
        displayPix(buttonArray[0]);

        // initial build buttons
        buildButtons();


        $(document).ready(function() {


             // this function form input
             $("#select-search").on("click", function(event) {
                  event.preventDefault();
                  var animal = $("#search-input").val();
                  var animalFound = buttonArray.indexOf(animal);
                  console.log(animalFound)
                  if(animalFound >= 0) {
                    alert("The animal was previously selected");
                    return
                  }
                  buttonArray.push(animal)
                  buildButtons();
                  displayPix(animal);
                  $("#search-form").trigger("reset");
             });

             // this handles button function
             $("body").on("click","BUTTON", function() {
                 var buttonValue = $(this).attr("name");
                 displayPix(buttonValue);
             });

             // pix click for still or animate
             $("body").on("click","img", function() {
                 currentState = $(this).attr("data-currentstate");
                 pixStill = $(this).attr("data-src");
                 pixAnimate = $(this).attr("data-swap");
                if(currentState == "still") {
                    $(this).attr("src", pixAnimate);
                    $(this).attr("data-currentstate" , "animate");
                } else {
                    $(this).attr("src", pixStill);
                    $(this).attr("data-currentstate" , "still");   
                }
             });
        }); 

        // displays pix of select animal
        function displayPix(selectName) {
              var queryURL = "https://api.giphy.com/v1/gifs/search?q=" + selectName + "&api_key=dc6zaTOxFJmzC&limit=10";
              $.ajax({
                   url: queryURL,
                   method: 'GET'
              })
                   .done(function(response) {
                       dataCount = response.data.length;

                       $("#pixBox").empty();

                       for(i = 0; i < 10; i++) {

                               // the following will display ther rating
                               var pixStill = response.data[i].images.fixed_height_small_still.url;
                               var pixAnimate = response.data[i].images.fixed_height_small.url;
                               var rating = response.data[i].rating.toUpperCase();;
                               pixbanner = "";
                               pixbanner = $("<div>");
                               pixbanner.attr('id', 'pix'+i);
                               pixbanner.css('text-align','center')
                               pixbanner.css('font','courier')
                               pixbanner.css('float', 'left');
                               pixbanner.html(' Rating '+rating+'<br>');
                               $('#pixBox').append(pixbanner);

                               // the following will display the pictures
                               pixHolder = $('<img>');
                               pixHolder.attr("class","pixImage");
                               pixHolder.text('rating');
                               pixHolder.attr("src",pixStill);
                               pixHolder.attr("data-swap",pixAnimate);
                               pixHolder.attr("data-src",pixStill);
                               pixHolder.attr("data-alt","Missing Image");
                               pixHolder.attr("data-rating",rating);
                               pixHolder.attr("data-currentstate","still");
                               pixHolder.attr("pixNo",i);

                               $('#pix'+i).append(pixHolder);
                       }
                   }
                   )
         };

         // builds and displays buttons
         function buildButtons() {
              $("#buttonBox").empty();
              for(b=0; b < buttonArray.length; b++) {
                   newButton = "";
                   newButton = $("<BUTTON>");
                   newButton.attr("id","buttons");
                   newButton.attr("name",buttonArray[b]);
                   newButton.text(buttonArray[b]);
                   $("#buttonBox").append(newButton);
              }
         }

