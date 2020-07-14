
$(function() {

  mui('.mui-scroll-wrapper').scroll({
    deceleration: 0.0005, 
    indicators: false 
  });

  var gallery = mui('.mui-slider');
  gallery.slider({
    interval: 5000 
  });

});


function getSearch( name ) {
  var search = location.search; 
  search = decodeURI( search ); 

  search = search.slice(1); 
  var arr = search.split( "&" );  
  var obj = {};
  arr.forEach(function( v, i ) { 
    var key = v.split("=")[0];
    var value = v.split("=")[1];
    obj[key] = value;
  });
  return obj[name];
}


