/*-------------------------
This file will process the users input and send as an AJAX request.
--------------------------*/

/*-------------------------
Waits for page to load before script becomes active.
--------------------------*/
$(document).ready(function (){

  function search(keywords,light,minPrice,maxPrice){
    //console.log(light);
    $.post({
      url: 'http://www.deakin.edu.au/~cschafer/ass2/php/search.php',
      data: {keywords:keywords, light:light, minPrice:minPrice, maxPrice:maxPrice}
    }).done(function(response){
      $('form').after(response);
    });
    /*-------------------------
    Value checks for keywords, light, minPrice and maxPrice.
    --------------------------*/
    //console.log("keywords = " + keywords);
    //console.log("light level = " + light);
    //console.log("min = " + minPrice);
    //console.log("max = " + maxPrice);
  }

  $('body').on('click','.form_submit',function (){
    /*-------------------------
    Sets default variable values.
    --------------------------*/
    var keywords = "";
    var light = "";
    var minPrice = 0;
    var maxPrice = 0;
    var keyError = "<span class='error' color:'red' >keywords cannot contain only spaces</span>";

    keywords = $('#searchKeywords').val();
    //console.log("keywords = " + keywords);
    light = $('#searchLightLevel').val();
    //console.log("light level = " + light);
    minPrice = $('#searchMinPrice').val();
    //console.log("min = " + minPrice);
    maxPrice = $('#searchMaxPrice').val();
    //console.log("max = " + maxPrice);

    $('.feat_prod_box').remove(); //Clears any previously searched plants.
    $('.error').remove();   //Clears the error if has been set.

    if(keywords != ""){
      /*-------------------------
      Checking if keywords contains only spaces.
      --------------------------*/
      keywords = $.trim(keywords);
      if(keywords != ""){
        //if minPrice is negative or empty, set to 0.
        if(minPrice < 0 || minPrice == ""){
          minPrice = 0;
        }
        //if maxPrice is negative or empty, set to 0.
        if(maxPrice < 0 || maxPrice == ""){
          maxPrice = 0;
        }
        //trims light of extra whitespaces.
        light = $.trim(light);
        //Calls the search function with the search values.
        search(keywords,light,minPrice,maxPrice);
      }else{
        $('#searchKeywords').after(keyError); //Error message if keywords contains only spaces.
      }
    }
  });
});

/*-------------------------
Comment layout
--------------------------*/
