$(function() {

getData();


});

// Get the data from .JSON file
function getData() {
  $.ajax({
    url : '/homework/fishingReport/scripts/report.json',
    dataType : "json",
    success : function(data){
      console.log(data);
      
    }
  });
}