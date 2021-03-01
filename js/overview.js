google.charts.load('current', {'packages':["corechart"]});
google.charts.setOnLoadCallback(drawAllSheets);

function drawAllSheets(){
   drawSheetName('spendings in gdp','SELECT A,B,C,D,E,F,G', OverviewSpendingsResponseHandler)
   drawSheetName('spendings in gdp','SELECT A,K,L,M,N,O,P', healthpendingsResponseHandler)
   drawSheetName('spendings in gdp','SELECT A,R,S,T,U,V,W', milipendingsResponseHandler)
   drawSheetName('health vs military','SELECT A,B,C,D,E,F,G,H,I,J,K,L,M,N,O', HealthVsMiliResponseHandler)
   drawSheetName('education vs military','SELECT A,B,C,D,E,F,G,H,I,J,K,L,M,N,O', EduVsMiliResponseHandler)
	} //drawAllSheets
	
	function drawSheetName(sheetName,query, responseHandler){
	  var queryString = encodeURIComponent(query);
	  var query = new google.visualization.Query(
	     'https://docs.google.com/spreadsheets/d/1hC78CtqU19utcugSkQodPVoVJ85clU05F2rZmgYsjMg/gviz/tq?sheet='
	     + sheetName +'&headers=1&tq=' + queryString);

	     query.send(responseHandler);
	}//drawSheetName
	
	function OverviewSpendingsResponseHandler(response){
	  var data = response.getDataTable();
    data.sort({column:0, desc:true});
	  var options = {
      legend: {position:'bottom', maxlines:3},
      bar:{groupWidth:'90%'},
      isStacked:true,
      width: 600,
      height: 400,
      vAxis: {title:'Education Exp in GDP %'},
      hAxis:{title:'Country'},
    
    }
	
	  var chart = new google.visualization.ColumnChart(document.getElementById('OverviewSpendings_div'));
	  chart.draw(data,options)
	} //OverviewSpendingsResponseHandler


  function healthpendingsResponseHandler(response){
	  var data = response.getDataTable();
    data.sort({column:0, desc:true});
	  var options = {
      legend: {position:'bottom', maxlines:3},
      bar:{groupWidth:'90%'},
      isStacked:true,
      width: 600,
      height: 400,
      vAxis: {title:'Health Exp in GDP %'},
      hAxis:{title:'Country'},
    
    }
	
	  var chart = new google.visualization.ColumnChart(document.getElementById('healthingdp_div'));
	  chart.draw(data,options)
	} //healthpendingsResponseHandler

  function milipendingsResponseHandler(response){
	  var data = response.getDataTable();
    data.sort({column:0, desc:true});
	  var options = {
      legend: {position:'bottom', maxlines:3},
      bar:{groupWidth:'90%'},
      isStacked:true,
      width: 600,
      height: 400,
      vAxis: {title:'Military Exp in GDP %'},
      hAxis:{title:'Country'},
    
    }
	
	  var chart = new google.visualization.ColumnChart(document.getElementById('miliingdp_div'));
	  chart.draw(data,options)
	} //milipendingsResponseHandler



  function HealthVsMiliResponseHandler(response){
	  var data = response.getDataTable();
	  var options = {
      width: 600,
      height: 400,
      pointShape: 'star',
      pointSize:12,
      curveType: 'function',
      vAxis: {title:'Healthcare vs Military Spendings (Ratio)'},
      hAxis:{title:'Year'}
    }
	
	  var chart = new google.visualization.LineChart(document.getElementById('HealthvsMili_div'));
	  chart.draw(data,options)
	} //HealthVsMiliResponseHandler


  function EduVsMiliResponseHandler(response){
	  var data = response.getDataTable();
    var options = {
      width: 600,
      height: 400,
      pointShape: 'diamond',
      pointSize:12,
      curveType: 'function',
      vAxis: {title:'Education vs Military Spendings (Ratio)'},
      hAxis:{title:'Year'}
    }
	
	  var chart = new google.visualization.LineChart(document.getElementById('EduvsMili_div'));
	  chart.draw(data,options)
	} //EduVsMiliResponseHandler
