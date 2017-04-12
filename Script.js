 //<![CDATA[  
	//Javascript Code fo the Map
function showmarkers(url,choose)
{
	"use strict"; 
	 var heatmapdata = [];
  
	  var map = new google.maps.Map(document.getElementById("map"), 
	  {
		center: new google.maps.LatLng(38.52641, 23.16314),
		zoom: 6,
		mapTypeId: 'hybrid'
	  });    
	  var infoWindow = new google.maps.InfoWindow;
	  
	if (choose==1)
	{
	   //Change this depending on the name of your PHP file
	   downloadUrl(url, function(data) 
	  {
		var xml = data.responseXML;
		var markers = xml.documentElement.getElementsByTagName("stathmos");
		for (var i = 0; i < markers.length; i++) 
		{
		  var mesitimi = markers[i].getElementsByTagName("mesitimi")[0].childNodes[0].nodeValue;
		  var name = markers[i].getElementsByTagName("onoma")[0].childNodes[0].nodeValue;
		  var kodikos = markers[i].getElementsByTagName("kodikos")[0].childNodes[0].nodeValue;
		  var imerominia = markers[i].getElementsByTagName("imerominia")[0].childNodes[0].nodeValue;
		  var eidos = markers[i].getElementsByTagName("eidos_ripou")[0].childNodes[0].nodeValue;
		  var point = new google.maps.LatLng(
			  parseFloat(markers[i].getElementsByTagName("geogr_mikos")[0].childNodes[0].nodeValue),
			  parseFloat(markers[i].getElementsByTagName("geogr_platos")[0].childNodes[0].nodeValue));
			  
		  var html = "<b>" + name + "</b> <br/>Kodikos: "  + kodikos +"<br>" + " Mesi Timi Ripou: "  + mesitimi +"<br>" + " Imerominia: " + imerominia+ "<br>" +" Eidos ripou: " + eidos;
		  switch(eidos) //proetoimasia heatmap
		  {
			case 'CO':
				var latLng =
				{ 
				  location : new google.maps.LatLng(markers[i].getElementsByTagName("geogr_mikos")[0].childNodes[0].nodeValue, markers[i].getElementsByTagName("geogr_platos")[0].childNodes[0].nodeValue), weight: mesitimi*10,  gradient: 'rgba(0, 255, 255, 0)'
				};
				break;
			case 'NO':
				var latLng =
				{ 
				  location : new google.maps.LatLng(markers[i].getElementsByTagName("geogr_mikos")[0].childNodes[0].nodeValue, markers[i].getElementsByTagName("geogr_platos")[0].childNodes[0].nodeValue), weight: mesitimi/10,  gradient:  'rgba(0, 0, 255, 1)'
				};
				gradient= [ 'rgba(0, 255, 255, 1)',
			  'rgba(0, 191, 255, 1)',
			  'rgba(0, 127, 255, 1)',
			  'rgba(0, 63, 255, 1)',
			  'rgba(0, 0, 255, 1)',
			  'rgba(0, 0, 223, 1)',
			  'rgba(0, 0, 191, 1)',
			  'rgba(0, 0, 159, 1)',
			  'rgba(0, 0, 127, 1)',
			  'rgba(63, 0, 91, 1)',
			  'rgba(127, 0, 63, 1)',
			  'rgba(191, 0, 31, 1)',
			  'rgba(255, 0, 0, 1)'];

				break;
			case 'NO2':
				var latLng =
				{ 
				  location : new google.maps.LatLng(markers[i].getElementsByTagName("geogr_mikos")[0].childNodes[0].nodeValue, markers[i].getElementsByTagName("geogr_platos")[0].childNodes[0].nodeValue), weight: mesitimi					};
				break;
			case 'SO2':
				var latLng =
				{ 
				  location : new google.maps.LatLng(markers[i].getElementsByTagName("geogr_mikos")[0].childNodes[0].nodeValue, markers[i].getElementsByTagName("geogr_platos")[0].childNodes[0].nodeValue), weight: mesitimi
 
				};
				 gradient = [ 'rgba(102,255,0,0)', 
				 'rgba(147,255,0,1)', 
				 'rgba(193,255,0,1)', 
				 'rgba(238,255,0,1)', 
				 'rgba(244,227,0,1)', 
				 'rgba(244,227,0,1)', 
				 'rgba(249,198,0,1)', 
				 'rgba(255,170,0,1)', 
				 'rgba(255,113,0,1)', 
				 'rgba(255,57,0,1)', 
				 'rgba(255,0,0,1)'
			    ];
				break;
			case 'O3':
				var latLng =
				{ 
				  location : new google.maps.LatLng(markers[i].getElementsByTagName("geogr_mikos")[0].childNodes[0].nodeValue, markers[i].getElementsByTagName("geogr_platos")[0].childNodes[0].nodeValue), weight: mesitimi/10
				};
				 gradient = [ 'rgba(102,255,0,0)', 
				 'rgba(147,255,0,1)', 
				 'rgba(193,255,0,1)', 
				 'rgba(238,255,0,1)', 
				 'rgba(244,227,0,1)', 
				 'rgba(244,227,0,1)', 
				 'rgba(249,198,0,1)', 
				 'rgba(255,170,0,1)', 
				 'rgba(255,113,0,1)', 
				 'rgba(255,57,0,1)', 
				 'rgba(255,0,0,1)'
			    ];

		}
		  var marker = new google.maps.Marker(//dimiourgia heatmap
			{
			map: map,
			position: point
		  });
		  
		  var loc = {
		  location: latLng
		};
		  bindInfoWindow(marker, map, infoWindow, html);
		  heatmapdata.push(latLng);
		  heatmapdata.push(gradient);
		}
		var heatmap = new google.maps.visualization.HeatmapLayer({
		  map: map,
		  data: heatmapdata
		});
		heatmap.set('radius', 20);
	  });
	}
	else if(choose==2)
	{
	   //Change this depending on the name of your PHP file
	   downloadUrl(url, function(data) 
	  {
		var xml = data.responseXML;
		var markers = xml.documentElement.getElementsByTagName("stathmos");
		for (var i = 0; i < markers.length; i++) 
		{
		  var mesitimi = markers[i].getElementsByTagName("meshtimh")[0].childNodes[0].nodeValue;
		  var name = markers[i].getElementsByTagName("onoma")[0].childNodes[0].nodeValue;
		  var kodikos = markers[i].getElementsByTagName("kodikos")[0].childNodes[0].nodeValue;
		  var first = markers[i].getElementsByTagName("first")[0].childNodes[0].nodeValue;
		  var last = markers[i].getElementsByTagName("last")[0].childNodes[0].nodeValue;
		  var eidos = markers[i].getElementsByTagName("eidos_ripou")[0].childNodes[0].nodeValue;
		  var point = new google.maps.LatLng(
			  parseFloat(markers[i].getElementsByTagName("geogr_mikos")[0].childNodes[0].nodeValue),
			  parseFloat(markers[i].getElementsByTagName("geogr_platos")[0].childNodes[0].nodeValue));
			  
		  var html = "<b>" + name + "</b> <br/>Kodikos: "  + kodikos +"<br>" + " Mesi Timi Ripou: "  + mesitimi +"<br>" + " Imerominies: Apo " + first+ " Mexri " + last + "<br>" +" Eidos ripou: " + eidos;
		  switch(eidos) 
		  {
			case 'CO':
				var latLng =
				{ 
				  location : new google.maps.LatLng(markers[i].getElementsByTagName("geogr_mikos")[0].childNodes[0].nodeValue, markers[i].getElementsByTagName("geogr_platos")[0].childNodes[0].nodeValue), weight: mesitimi*10,  gradient: 'rgba(0, 255, 255, 0)'
				};
				break;
			case 'NO':
				var latLng =
				{ 
				  location : new google.maps.LatLng(markers[i].getElementsByTagName("geogr_mikos")[0].childNodes[0].nodeValue, markers[i].getElementsByTagName("geogr_platos")[0].childNodes[0].nodeValue), weight: mesitimi/10,  gradient:  'rgba(0, 0, 255, 1)'
				};
				break;
			case 'NO2':
				var latLng =
				{ 
				  location : new google.maps.LatLng(markers[i].getElementsByTagName("geogr_mikos")[0].childNodes[0].nodeValue, markers[i].getElementsByTagName("geogr_platos")[0].childNodes[0].nodeValue), weight: mesitimi,  gradient: 'rgba(0, 0, 127, 1)'
				};
				break;
			case 'SO2':
				var latLng =
				{ 
				  location : new google.maps.LatLng(markers[i].getElementsByTagName("geogr_mikos")[0].childNodes[0].nodeValue, markers[i].getElementsByTagName("geogr_platos")[0].childNodes[0].nodeValue), weight: mesitimi,  gradient: 'rgba(191, 0, 31, 1)'
				};
				break;
			case 'O3':
				var latLng =
				{ 
				  location : new google.maps.LatLng(markers[i].getElementsByTagName("geogr_mikos")[0].childNodes[0].nodeValue, markers[i].getElementsByTagName("geogr_platos")[0].childNodes[0].nodeValue), weight: mesitimi/10,  gradient: 'rgba(191, 0, 31, 1)'
				};
		}		  
		  var marker = new google.maps.Marker(
			{
			map: map,
			position: point
		  });
		  
		  var loc = {
		  location: latLng
		};
		  bindInfoWindow(marker, map, infoWindow, html);
		  heatmapdata.push(latLng);
		}
		var heatmap = new google.maps.visualization.HeatmapLayer({
		  map: map,
		  data: heatmapdata
		});
		heatmap.set('radius', 20);
	
	  });
	}
	

function bindInfoWindow(marker, map, infoWindow, html) 
{
  google.maps.event.addListener(marker, 'click', function() 
  {
    infoWindow.setContent(html);
    infoWindow.open(map, marker);
  });
}

function downloadUrl(url, callback) 
{
  var request = window.ActiveXObject ?
      new ActiveXObject('Microsoft.XMLHTTP') :
      new XMLHttpRequest;

  request.onreadystatechange = function() 
  {
    if (request.readyState == 4) {
      request.onreadystatechange = doNothing;
      callback(request, request.status);
    }
  };

  request.open('GET', url, true);
  request.send(null);
}

function doNothing() {}
}




//]]>

//Javscript Code For the Site
function showmain()
{
	
    window.location="index.php";
}
function showstations()
{
	document.getElementById("optionsbutton").style.display = "none";
    document.getElementById("showoptions").style.display = "block";
    document.getElementById("reset").scrollIntoView({behavior: "smooth"});
}
function selectshow()
{ 
	var php = document.getElementById("dropdowninfo").value;
    if (php==1)
    {
        
        document.getElementById("showone").style.display = "block";
        document.getElementById("showall").style.display = "none";
    }
    else if(php == 2)
    {
        
        document.getElementById("showall").style.display = "block";
        document.getElementById("showone").style.display = "none";
    }
	else
	{
	document.getElementById("showone").style.display = "none";
	document.getElementById("showall").style.display = "none";
	}
    window.scrollTo(0,500);
}
function selectshowstation(php)
{
    if (php == 1)
    {
         document.getElementById("radioshow").style.display = "block";
        
    }
    window.scrollTo(0,500);
}

function dateselect(value)
{   
    if (value == 1)
    {
        document.getElementById("singledate").style.display = "block";
        document.getElementById("multipledates").style.display = "none";
    }
    else if (value == 2)
    {
        document.getElementById("singledate").style.display = "none";
        document.getElementById("multipledates").style.display = "block";
    }
    window.scrollTo(0, 500);
}
function alldateselect(value)
{
    if (value == 1)
    {
        document.getElementById("allsingledate").style.display = "block";
        document.getElementById("allmultipledates").style.display = "none";
    }
    else if (value == 2)
    {
        document.getElementById("allsingledate").style.display = "none";
        document.getElementById("allmultipledates").style.display = "block";
    }
    window.scrollTo(0, 500);
    
}

function stationshowaction()
 {
        var onoma1 = document.getElementById("dropdownstation");
        var onoma = onoma1.options[onoma1.selectedIndex].value;
        showstations();
        selectshow(1);
        selectshowstation(1);
        req4loadXMLDoc(onoma);
        changeurl(onoma);
        
    }
    
     function changeurl(onoma)
	 {
      window.history.pushState(null,"", "index.php?kodikos="+onoma);
 	}
function fromtodate1change()
 {
         var onoma1 = document.getElementById("dropdownstation");
        var onoma = onoma1.options[onoma1.selectedIndex].value;
		var fromdate = document.getElementById("fromdate1").value;
		var todate = document.getElementById("todate1").value;
        
		changeurlftd1(onoma,fromdate,todate);
        fromtoreq5loadXMLDoc(onoma,fromdate,todate);
        
        
    }
function fromtodate2change()
 {
         var fromdate = document.getElementById("fromdate2").value;
		var todate = document.getElementById("todate2").value;
        
		changeurlftd2(fromdate,todate);
        fromtoallreq5loadXMLDoc(fromdate,todate);
                
    }
	function date1change()
 {
         var onoma1 = document.getElementById("dropdownstation");
        var onoma = onoma1.options[onoma1.selectedIndex].value;
		var date = document.getElementById("date1").value;
        
		changeurlftd1(onoma,date,date);
        req5loadXMLDoc(onoma,date,date);
        
        
    }
	
	function date2change()
 {
         var date = document.getElementById("date2").value;
        
		changeurlftd2(date,date);
        allreq5loadXMLDoc(date,date); 
    }
	
	
	   function changeurlftd1(onoma,fromdate,todate)
	 {
      window.history.pushState(null,"", "index.php?kodikos="+onoma+"&fromdate="+fromdate+"&todate="+todate);
 	}
	
	function changeurlftd2(fromdate,todate)
	 {
      window.history.pushState(null,"", "index.php?fromdate="+fromdate+"&todate="+todate);
 	}
	
    function req1loadXMLDoc() 
	{
       var xmlhttp = new XMLHttpRequest();
      xmlhttp.onreadystatechange = function() 
      {
        if (xmlhttp.readyState == 4 && xmlhttp.status == 200) 
        {
          req1func(xmlhttp);
        }
      };
      xmlhttp.open("GET", "webapi.php?apikey=b86ddef4e6f4347b2d7b343f22356ead&req=1", true);
      xmlhttp.send();
    }
    
    function req1func(xml) 
    {
      var i;
      var xmlDoc = xml.responseXML;
      var table="<tr><th>Κωδικός</th><th>Όνομα Σταθμού</th><th>Τοποθεσία</th></tr>";
      var x = xmlDoc.getElementsByTagName("stathmos");
      for (i = 0; i <x.length; i++) 
      { 
        table += "<tr><td>" +
        x[i].getElementsByTagName("kodikos")[0].childNodes[0].nodeValue +
        "</td><td>" +
        x[i].getElementsByTagName("onoma")[0].childNodes[0].nodeValue +
        "</td><td>" +
        x[i].getElementsByTagName("geogr_mikos")[0].childNodes[0].nodeValue +
        ", " +
        x[i].getElementsByTagName("geogr_platos")[0].childNodes[0].nodeValue +
        "</td></tr>";
       }
        document.getElementById("basictable").innerHTML = table;
        var select="";
        x = xmlDoc.getElementsByTagName("stathmos");
        select += '<option value="">Παρακαλώ επιλέξτε σταθμό</option>' ;
        for (i = 0; i <x.length; i++) 
        { 
         select += '<option value="' +
        x[i].getElementsByTagName("kodikos")[0].childNodes[0].nodeValue +
        '">' +
        x[i].getElementsByTagName("onoma")[0].childNodes[0].nodeValue +
        '</option></select>';
        }
        document.getElementById("dropdownstation").innerHTML = select;
}

function req2loadXMLDoc() {
  var date1 = document.getElementById("date1");
  var date = date1.value;
  var time1 = document.getElementById("time");
  var time = time1.options[time1.selectedIndex].value;
  var ripos1 = document.getElementById("ripos1");
  var ripos = ripos1.options[ripos1.selectedIndex].value;
  var kodikos1 = document.getElementById("dropdownstation");
  var kodikos = kodikos1.options[kodikos1.selectedIndex].value;
  var xmlhttp = new XMLHttpRequest();
  var ttime = time;
  showmarkers("webapi.php?apikey=b86ddef4e6f4347b2d7b343f22356ead&req=2&kodikos="+kodikos+"&date="+date+"&time="+time+"&ripos="+ripos,1);

}
function allreq2loadXMLDoc() {
  var date1 = document.getElementById("date2");
  var date = date1.value;
  var time1 = document.getElementById("alltime");
  var time = time1.options[time1.selectedIndex].value;
  var ripos1 = document.getElementById("ripos3");
  var ripos = ripos1.options[ripos1.selectedIndex].value;
  var xmlhttp = new XMLHttpRequest();
  var ttime = time;
  showmarkers("webapi.php?apikey=b86ddef4e6f4347b2d7b343f22356ead&req=2&date="+date+"&time="+time+"&ripos="+ripos,1);
 }

function req3loadXMLDoc() {
      var fromdate1 = document.getElementById("fromdate1");
      var fromdate = fromdate1.value;
	  var todate1 = document.getElementById("todate1");
      var todate = todate1.value;
	  var ripos1 = document.getElementById("ripos2");
      var ripos = ripos1.options[ripos1.selectedIndex].value;
	  var kodikos1 = document.getElementById("dropdownstation");
      var kodikos = kodikos1.options[kodikos1.selectedIndex].value;
	  var xmlhttp = new XMLHttpRequest();
	  showmarkers("webapi.php?apikey=b86ddef4e6f4347b2d7b343f22356ead&req=3&kodikos="+kodikos+"&fromdate="+fromdate+"&todate="+todate+"&ripos="+ripos,2);
    }

function allreq3loadXMLDoc() {
  var fromdate1 = document.getElementById("fromdate2");
  var fromdate = fromdate1.value;
  var todate1 = document.getElementById("todate2");
  var todate = todate1.value;
  var ripos1 = document.getElementById("ripos4");
  var ripos = ripos1.options[ripos1.selectedIndex].value;
   showmarkers("webapi.php?apikey=b86ddef4e6f4347b2d7b343f22356ead&req=3&fromdate="+fromdate+"&todate="+todate+"&ripos="+ripos,2);

}
     
function req4loadXMLDoc(kodikos) {
  var xmlhttp = new XMLHttpRequest();
  var kkodikos = kodikos;
  xmlhttp.onreadystatechange = function() 
  {
    if (xmlhttp.readyState == 4 && xmlhttp.status == 200) 
    {
      req4func(xmlhttp);
    }
  };
  xmlhttp.open("GET", "webapi.php?apikey=b86ddef4e6f4347b2d7b343f22356ead&req=4&kodikos="+kkodikos, true);
  xmlhttp.send();
}

  function allreq4loadXMLDoc() {
   var xmlhttp = new XMLHttpRequest();
  xmlhttp.onreadystatechange = function() 
  {
    if (xmlhttp.readyState == 4 && xmlhttp.status == 200) 
    {
      allreq4func(xmlhttp);
    }
  };
  xmlhttp.open("GET", "webapi.php?apikey=b86ddef4e6f4347b2d7b343f22356ead&req=4", true);
  xmlhttp.send();
}
    
function req4func(xml) 
{
     var i;
    var xmlDoc = xml.responseXML;
    var x = xmlDoc.getElementsByTagName("stathmos");
    for (i = 0; i <x.length; i++) 
    { 
        document.getElementById("date1").min = x[i].getElementsByTagName("first")[0].childNodes[0].nodeValue;
        document.getElementById("date1").max =x[i].getElementsByTagName("last")[0].childNodes[0].nodeValue;
        document.getElementById("fromdate1").min = x[i].getElementsByTagName("first")[0].childNodes[0].nodeValue;
        document.getElementById("fromdate1").max = x[i].getElementsByTagName("last")[0].childNodes[0].nodeValue;
        document.getElementById("todate1").min = x[i].getElementsByTagName("first")[0].childNodes[0].nodeValue;
        document.getElementById("todate1").max = x[i].getElementsByTagName("last")[0].childNodes[0].nodeValue;
    }
}         
function allreq4func(xml) 
{
     var i;
    var xmlDoc = xml.responseXML;
    var x = xmlDoc.getElementsByTagName("stathmos");
    for (i = 0; i <x.length; i++) 
    { 
        document.getElementById("date2").min = x[i].getElementsByTagName("first")[0].childNodes[0].nodeValue;
        document.getElementById("date2").max = x[i].getElementsByTagName("last")[0].childNodes[0].nodeValue;
        document.getElementById("fromdate2").min = x[i].getElementsByTagName("first")[0].childNodes[0].nodeValue;
        document.getElementById("fromdate2").max = x[i].getElementsByTagName("last")[0].childNodes[0].nodeValue;
        document.getElementById("todate2").min = x[i].getElementsByTagName("first")[0].childNodes[0].nodeValue;
        document.getElementById("todate2").max = x[i].getElementsByTagName("last")[0].childNodes[0].nodeValue;
    }
}                      

 function req5loadXMLDoc(kodikos,fromdate,todate) {
   var xmlhttp = new XMLHttpRequest();
  var kkodikos = kodikos;
  xmlhttp.onreadystatechange = function() 
  {
    if (xmlhttp.readyState == 4 && xmlhttp.status == 200) 
    {
      req5func2(xmlhttp,kkodikos);
    }
  };
  xmlhttp.open("GET", "webapi.php?apikey=b86ddef4e6f4347b2d7b343f22356ead&req=5&kodikos="+kkodikos+"&fromdate="+fromdate+"&todate="+todate, true);
  xmlhttp.send();
}
 function fromtoreq5loadXMLDoc(kodikos,fromdate,todate) {
   var xmlhttp = new XMLHttpRequest();
  var kkodikos = kodikos;
  xmlhttp.onreadystatechange = function() 
  {
    if (xmlhttp.readyState == 4 && xmlhttp.status == 200) 
    {
      req5func(xmlhttp,kkodikos);
    }
  };
  xmlhttp.open("GET", "webapi.php?apikey=b86ddef4e6f4347b2d7b343f22356ead&req=5&kodikos="+kkodikos+"&fromdate="+fromdate+"&todate="+todate, true);
  xmlhttp.send();
}
  function allreq5loadXMLDoc(fromdate,todate) {
   var xmlhttp = new XMLHttpRequest();
  xmlhttp.onreadystatechange = function() 
  {
    if (xmlhttp.readyState == 4 && xmlhttp.status == 200) 
    {
      allreq5func2(xmlhttp);
    }
  };
  xmlhttp.open("GET", "webapi.php?apikey=b86ddef4e6f4347b2d7b343f22356ead&req=5&fromdate="+fromdate+"&todate="+todate, true);
  xmlhttp.send();
}
	
function fromtoallreq5loadXMLDoc(fromdate,todate) {
   var xmlhttp = new XMLHttpRequest();
  xmlhttp.onreadystatechange = function() 
  {
    if (xmlhttp.readyState == 4 && xmlhttp.status == 200) 
    {
      allreq5func(xmlhttp);
    }
  };
  xmlhttp.open("GET", "webapi.php?apikey=b86ddef4e6f4347b2d7b343f22356ead&req=5&fromdate="+fromdate+"&todate="+todate, true);
  xmlhttp.send();
}
    
function req5func(xml,kodikos) 
{
 var i;
var xmlDoc = xml.responseXML;
var x = xmlDoc.getElementsByTagName('stathmos');
for (i = 0; i <x.length; i++) 
{ 
   switch(x[i].getElementsByTagName('eidos_ripou')[0].childNodes[0].nodeValue)
		{
        case "CO" :
        {
            document.getElementById("ripos2").options[1].disabled = false;
			break;
        }
        case "NO" :
        {
            document.getElementById("ripos2").options[2].disabled = false;
			break;
        }
        case "NO2" :
        {
            document.getElementById("ripos2").options[3].disabled = false;
			break;
        }
        case "SO2" :
        {
            document.getElementById("ripos2").options[4].disabled = false;
			break;
        }
         case "O3" :
        {
            document.getElementById("ripos2").options[5].disabled = false;
        }
		}
        
}
}         

 function req5func2(xml,kodikos) 
{
 var i;
var xmlDoc = xml.responseXML;
var x = xmlDoc.getElementsByTagName('stathmos');
for (i = 0; i <x.length; i++) 
{ 
   switch(x[i].getElementsByTagName('eidos_ripou')[0].childNodes[0].nodeValue)
		{
        case "CO" :
        {
            document.getElementById("ripos1").options[1].disabled = false;
			break;
        }
        case "NO" :
        {
            document.getElementById("ripos1").options[2].disabled = false;
			break;
        }
        case "NO2" :
        {
            document.getElementById("ripos1").options[3].disabled = false;
			break;
        }
        case "SO2" :
        {
            document.getElementById("ripos1").options[4].disabled = false;
			break;
        }
         case "O3" :
        {
            document.getElementById("ripos1").options[5].disabled = false;
        }
		}
        
}
}         
	
function allreq5func(xml) 
{
 var i;
var xmlDoc = xml.responseXML;
var x = xmlDoc.getElementsByTagName('stathmos');
for (i = 0; i <x.length; i++) 
{ 
		switch(x[i].getElementsByTagName('eidos_ripou')[0].childNodes[0].nodeValue)
		{
        case "CO" :
        {
            document.getElementById("ripos4").options[1].disabled = false;
			break;
        }
        case "NO" :
        {
            document.getElementById("ripos4").options[2].disabled = false;
			break;
        }
        case "NO2" :
        {
            document.getElementById("ripos4").options[3].disabled = false;
			break;
        }
        case "SO2" :
        {
            document.getElementById("ripos4").options[4].disabled = false;
			break;
        }
         case "O3" :
        {
            document.getElementById("ripos4").options[5].disabled = false;
        }
		}
}
        
}         
	
function allreq5func2(xml) 
{
 var i;
var xmlDoc = xml.responseXML;
var x = xmlDoc.getElementsByTagName('stathmos');
for (i = 0; i <x.length; i++) 
{ 
		switch(x[i].getElementsByTagName('eidos_ripou')[0].childNodes[0].nodeValue)
		{
        case "CO" :
        {
            document.getElementById("ripos3").options[1].disabled = false;
			break;
        }
        case "NO" :
        {
            document.getElementById("ripos3").options[2].disabled = false;
			break;
        }
        case "NO2" :
        {
            document.getElementById("ripos3").options[3].disabled = false;
			break;
        }
        case "SO2" :
        {
            document.getElementById("ripos3").options[4].disabled = false;
			break;
        }
         case "O3" :
        {
            document.getElementById("ripos3").options[5].disabled = false;
        }
		}
}
        
    
}                     
	             
    function signup()
{
      var xhttp = new XMLHttpRequest();
      xhttp.onreadystatechange = function() {
        if (xhttp.readyState == 4 && xhttp.status == 200) {
          document.getElementById("programmerdiv").innerHTML = xhttp.responseText;
        }
      };
      xhttp.open("GET", "signuptext.txt", true);
      xhttp.send();
}
function showapi()
{
     var mail = document.getElementById("signupform").username.value;
     var password = document.getElementById("signupform").password.value;
     var xhttp = new XMLHttpRequest();
      xhttp.onreadystatechange = function() {
        if (xhttp.readyState == 4 && xhttp.status == 200) {
        
        window.prompt("Message from server:",xhttp.responseText);
            
        }
      };
      xhttp.open("GET", "signup.php?mail="+mail+"&password="+password, true);
      xhttp.send();
      
}
function showlogin()
{
      var xhttp = new XMLHttpRequest();
      xhttp.onreadystatechange = function() {
        if (xhttp.readyState == 4 && xhttp.status == 200) {
          document.getElementById("programmerdiv").innerHTML = xhttp.responseText;
        }
      };
      xhttp.open("GET", "prlogintext.txt", true);
      xhttp.send();
      
}
 function proglogin()
{
     var mail = document.getElementById("prloginform").elements.username.value;
     var password = document.getElementById("prloginform").elements.password.value;
     var xhttp = new XMLHttpRequest();
      xhttp.onreadystatechange = function() {
        if (xhttp.readyState == 4 && xhttp.status == 200) {
        if (xhttp.responseText!=="1")
        {
        alert(xhttp.responseText);
        }
        else
        {
         window.location.assign("programmer.php");
        }
            
        }
      };
      xhttp.open("GET", "prlogin.php?mail="+mail+"&password="+password, true);
      xhttp.send();
      
}
  function adminlogin()
{
     var mail = document.getElementById("adminloginform").elements.username.value;
     var password = document.getElementById("adminloginform").elements.password.value;
     var xhttp = new XMLHttpRequest();
      xhttp.onreadystatechange = function() {
        if (xhttp.readyState == 4 && xhttp.status == 200) {
        if (xhttp.responseText!=="1")
        {
        alert(xhttp.responseText);
        }
        else
        {
         window.location.assign("admin.php");
        }
            
        }
      };
      xhttp.open("GET", "adminlogin.php?mail="+mail+"&password="+password, true);
      xhttp.send();
      
}
