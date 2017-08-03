$(document).ready(function() {
    "use strict";
    //localStorage.clear();

    /* Routes form */
    $(".matInput").focus(function(){
        $(this).parent().addClass("isActive isCompleted");
      });

      $(".matInput").focusout(function(){
        if($(this).val() === "")
          $(this).parent().removeClass("isCompleted");
        $(this).parent().removeClass("isActive");
      });


    for(var i=0, len=localStorage.length; i<len; i++) {
        if ((localStorage.key(i) % 2) != 1) {
            var key = localStorage.key(i);
            var value = localStorage[key];
            $('#listWrapper').append('<form id="contactFormList'+key+'" class="contactForm" method="get" action="http://maps.google.com/maps" target="_blank"><input id="'+key+'" class="savedSaddr" type="text" name="saddr" value="'+value+'"/><input id="submit" type="submit" value="Get directions"></form>');
        } else {
            var key1 = localStorage.key(i);
            var value = localStorage[key1];
            $('#contactFormList'+key+'').append('<input id="'+key1+'" class="savedDaddr" type="text" name="daddr" value="'+value+'"/><a href="#" id="'+key1+'" class="remove_field">Remove</a>');
        }
    }

        /*add routes to page*/
        
        $('#submitRoute').click(function(){
            var k = localStorage.length;
            var kk = k+1;
            var saddr = $('#saddr').val();
            var daddr = $('#daddr').val();

            if (saddr!='' && daddr!='') {
                $('#listWrapper').append('<form id="contactForm" class="contactForm" method="get" action="http://maps.google.com/maps" target="_blank"><input id="'+k+'" class="savedSaddr" type="text" name="saddr" value="'+saddr+'"/><input id="submit" type="submit" value="Get directions"><input id="'+kk+'" class="savedDaddr" type="text" name="daddr" value="'+daddr+'"/><a href="#" id="'+kk+'" class="remove_field">Remove</a></form>');
                /*for(var i=0, len=localStorage.length; i<len; i++) {
                    if (localStorage.key(i) != k) {
                        localStorage.setItem(k, saddr);
                        localStorage.setItem(kk, daddr);
                    } else {
                        localStorage.setItem(k+2, saddr);
                        localStorage.setItem(kk+2, daddr);
                    }
                }*/
                localStorage.setItem(k, saddr);
                localStorage.setItem(kk, daddr);
                
            } else {
                alert('Please, enter your destination.');
            }
            setTimeout(function() {
              $('#saddr').val('');
              $('#daddr').val('');
            }, 1000);
        });
        
        $('#listWrapper').on("click",".remove_field", function(){ //user click on remove text
            var idButtona = $(this).attr('id');
            var idButtonaMinus1 = idButtona-1;
            localStorage.removeItem(idButtona);
            localStorage.removeItem(idButtonaMinus1);
            /*$(this).parent().children('#'+idButtonaMinus1+'').remove();
            $(this).parent().children('#'+idButtona+'').remove();*/
            $(this).parent().remove();

        })

});/* end of document.ready */


/***** code for google map *****/
var x = document.getElementById("location");
function getLocation() {
    if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(showPosition, showError);
    } else { 
        x.innerHTML = "Geolocation is not supported by this browser.";
    }
}

function showPosition(position) {
    lat = position.coords.latitude;
    lon = position.coords.longitude;
    latlon = new google.maps.LatLng(lat, lon)
    mapholder = document.getElementById('mapholder')
    mapholder.style.height = '250px';
    //mapholder.style.width = '700px';

    var myOptions = {
    center:latlon,zoom:14,
    mapTypeId:google.maps.MapTypeId.ROADMAP,
    mapTypeControl:false,
    navigationControlOptions:{style:google.maps.NavigationControlStyle.SMALL}
    }
    
    var map = new google.maps.Map(document.getElementById("mapholder"), myOptions);
    var marker = new google.maps.Marker({position:latlon,map:map,title:"You are here!"});
}

function showError(error) {
    switch(error.code) {
        case error.PERMISSION_DENIED:
            x.innerHTML = "User denied the request for Geolocation."
            break;
        case error.POSITION_UNAVAILABLE:
            x.innerHTML = "Location information is unavailable."
            break;
        case error.TIMEOUT:
            x.innerHTML = "The request to get user location timed out."
            break;
        case error.UNKNOWN_ERROR:
            x.innerHTML = "An unknown error occurred."
            break;
    }
}

        /* JQ za scroll to top */

            $(window).scroll(function(){
            if ($(this).scrollTop() > 100) {
              $('.scrollToTop').fadeIn();
            } else {
              $('.scrollToTop').fadeOut(100);
            }
          });
          
          //Click event to scroll to top
          $('.scrollToTop').click(function(){
            $('html, body').animate({scrollTop : 0},800);
            return false;
          });









/***** code for getting formatted address from coordinates*****/
/*var geocoder;

if (navigator.geolocation) {
  navigator.geolocation.getCurrentPosition(successFunction, errorFunction);
} 
function successFunction(position) {
    var lat = position.coords.latitude;
    var lng = position.coords.longitude;
    codeLatLng(lat, lng)
}

function errorFunction(){
    alert("Geocoder failed");
}

function initialize() {
  geocoder = new google.maps.Geocoder();
}

function codeLatLng(lat, lng) {

  var latlng = new google.maps.LatLng(lat, lng);

  geocoder.geocode({'latLng': latlng}, function(results, status) {
    if (status == google.maps.GeocoderStatus.OK) {
      console.log(results)
      if (results[1]) {
       //formatted address
        $('#saddr').val(results[0].formatted_address);
        alert(results[0].formatted_address)
        } else {
          alert("No results found");
          }
    } else {
      alert("Geocoder failed due to: " + status);
      }
  });
}*/
/***** END of code for getting formatted address from coordinates*****/