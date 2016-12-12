
<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Strict//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-strict.dtd">
<html xmlns="http://www.w3.org/1999/xhtml" xml:lang="en" lang="en">
<head>
	<script type="text/javascript" src="http://code.jquery.com/jquery-latest.min.js"></script>
	<title>USGS Water Services AJAX Example</title>
</head>
<body>
	<h1>USGS Water Services AJAX Example</h1>
	<p>This example shows how the USGS Instantaneous Values web service can be invoked using Asynchronous Javascript and XML (AJAX) technology. The jQuery framework is used.</p>
	<form id="form1" method="post" action="">
        <table width="100%" border="0">
          <tr>
            <td><label for="site"><strong>USGS Site No.</strong></label>              <input name="site" type="text" id="site" value="01646500" size="8" maxlength="15" />
              <a href="http://wdr.water.usgs.gov/nwisgmap/index.html">Find sites </a></td>
          </tr>
          <tr>
            <td><label for="sitedesc"><strong>Site Description</strong></label></td>
          </tr>
          <tr>
            <td><textarea name="sitedesc" cols="25" rows="2" readonly="readonly" id="sitedesc"></textarea></td>
          </tr>
          <tr>
            <td><label for="discharge"><strong>Latest Streamflow ft.<sup>3</sup>/sec</strong></label></td>
          </tr>
          <tr>
            <td><input id="discharge" size="7" readonly="readonly" /></td>
          </tr>
          <tr>
            <td><label for="date"><strong>Date</strong></label></td>
          </tr>
          <tr>
            <td><input id="date" size="10" readonly="readonly" /></td>
          </tr>
          <tr>
            <td><label for="time"><strong>Time</strong></label></td>
          </tr>
          <tr>
            <td><input id="time" size="5" readonly="readonly" /></td>
          </tr>
          <tr>
            <td><label for="tz"><strong>Time Zone</strong></label></td>
          </tr>
          <tr>
            <td><input id="tz" size="6" readonly="readonly" /></td>
          </tr>
        </table>
      <p>
            <input type="button" name="query" id="query" value="Get Latest Streamflow" />
            <input type="reset" name="reset" id="reset" value="Reset" />
      </p>
	</form>
<script type="text/javascript">
	//<![CDATA[
	// Proof of concept for AJAX usage with instantaneous values service
	$('#query').click(function() {
		site = $('#site').attr("value");
		$.ajax({
		  url: "http://waterservices.usgs.gov/nwis/iv/?format=json&sites=" + site + "&parameterCd=00060",
		  dataType: 'json',
		  data: '',
		  success: function(json){
			   $('#sitedesc').text(json.value.timeSeries[0].sourceInfo.siteName);
			   $('#discharge').val(json.value.timeSeries[0].values[0].value[0].value);
			   datetime = json.value.timeSeries[0].values[0].value[0].dateTime;
			   // Get date
			   myDate = datetime.substr(5,2) + '/' + datetime.substr(8,2) + '/' + datetime.substr(0,4);
			   $('#date').val(myDate);
			   // Get time
			   myTime = datetime.substr(11,5);
			   $('#time').val(myTime);
			   // Get timezone
			   myTZ = datetime.substr(23);
			   $('#tz').val(myTZ);
			 },
		  error : function(XMLHttpRequest, textStatus, errorThrown) {
			   $('#sitedesc').text('Error. Site Number was probably invalid or not a real-time site.');
			   $('#discharge').val('');
			   $('#date').val('');
			   $('#time').val('');
			   $('#tz').val('');
		  }
		});
	});
//]]>
</script>
</body>
</html>