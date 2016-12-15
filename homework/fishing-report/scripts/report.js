$(function() {

getData();


});

// Get the data from .JSON file
function getData() {
  $.ajax({
    url : '/homework/fishing-report/scripts/report.json',
    dataType : "json",
    success : function(data){
      console.log(data);
        $('#northriver1').text(data["Northern Idaho"][0]);
        $('#northriver2').text(data["Northern Idaho"][1]);
        $('#northriver3').text(data["Northern Idaho"][2]);
        $('#northriver4').text(data["Northern Idaho"][3]);
        
        $('#westriver1').text(data["Western Idaho"][0]);
        $('#westriver2').text(data["Western Idaho"][1]);
        $('#westriver3').text(data["Western Idaho"][2]);
        $('#westriver4').text(data["Western Idaho"][3]);
        
        $('#eastriver1').text(data["Eastern Idaho"][0]);
        $('#eastriver2').text(data["Eastern Idaho"][1]);
        $('#eastriver3').text(data["Eastern Idaho"][2]);
        $('#eastriver4').text(data["Eastern Idaho"][3]);
        
        $('#centriver1').text(data["Centeral Idaho"][0]);
        $('#centriver2').text(data["Centeral Idaho"][1]);
        $('#centriver3').text(data["Centeral Idaho"][2]);
        $('#centriver4').text(data["Centeral Idaho"][3]);
        
        $('#nidahoreport1').text(data["nidahoreport"][0])
        $('#nidahoreport2').text(data["nidahoreport"][1])
        $('#nidahoreport3').text(data["nidahoreport"][2])
        $('#nidahoreport4').text(data["nidahoreport"][3])
    }
  });
}