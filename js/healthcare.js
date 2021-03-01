 google.charts.load('current', {'packages':["corechart"]});
 google.charts.load('current', {'packages':['treemap']});
 google.charts.setOnLoadCallback(drawAllSheets);
 
 function drawAllSheets(){
    //drawSheetName('HEALTHCARE','SELECT A,B,C,D,E,F,G', HealthcareResponseHandler)
    drawSheetName('Data','SELECT A,H,J,R,S', HealthPerCapitaGDPResponseHandler)
    drawSheetName('new healthcare','SELECT A,B,C', NewHealthcareResponseHandler)
    drawSheetName('grow rate','SELECT A,B,C', GrowRateResponseHandler)

 } //drawAllSheets

 function drawSheetName(sheetName,query, responseHandler){
   var queryString = encodeURIComponent(query);
   var query = new google.visualization.Query(
      'https://docs.google.com/spreadsheets/d/1hC78CtqU19utcugSkQodPVoVJ85clU05F2rZmgYsjMg/gviz/tq?sheet='
      + sheetName +'&headers=1&tq=' + queryString);

      query.send(responseHandler);
 }//drawSheetName



 function HealthPerCapitaGDPResponseHandler(response){
   var data = response.getDataTable();
   var options = {
      height: 400,
		width: 600,
      vAxis:{title:'GDP Per Capita ($)'},
      hAxis:{title:'Healthcare Per Capita ($)'},
      bubble: {textStyle: {fontSize: 5}},
		legend:{
			 position: "bottom"
			},

   };

   var chart = new google.visualization.BubbleChart(document.getElementById('HealthGDPPerCapita_div'));
   chart.draw(data,options)
 } //HealthcareResponseHandler


 function NewHealthcareResponseHandler(response){
   var data = response.getDataTable();
   var options = {
      height: 400,
		width: 600,
      vAxis:{title:'GDP Per Capita ($)'},
      hAxis:{title:'Healthcare Per Capita ($)'},
      minHighlightColor: '#8c6bb1',
      midHighlightColor: '#9ebcda',
      maxHighlightColor: '#edf8fb',
      minColor: '#009688',
      midColor: '#f7f7f7',
      maxColor: '#ee8100',
      headerHeight: 15,
      fontColor: 'black',
      showScale: true,
      generateTooltip: showFullTooltip
      }
   

      function showFullTooltip(row, size, value) {
         return '<div style="background:#fd9; padding:10px; border-style:solid">' +
                '<span style="font-family:Courier"><b>' + data.getValue(row, 0) +
                '</b>, ' + data.getValue(row, 1) + ', ' + data.getValue(row, 2) +
               '</span><br>' + data.getColumnLabel(2) + ': ' + value + ' </div>';
       }
  
  
   var chart = new google.visualization.TreeMap(document.getElementById('NewHealthGDPPerCapita_div'));
   chart.draw(data,options)
 } //NewHealthcareResponseHandler



 function GrowRateResponseHandler(response){
	var data = response.getDataTable();

   var options = {
      width:600,
      height: 400,
     
      series:{
        0: {targetAxisIndex:0},
        1: {targetAxisIndex:1}
      },

      vAxes:{
         0:{title:'Grow Fixed Value (Billion）', viewWindow: {max:760,min: -760}},
         1:{title:'Grow Rate %' , viewWindow: {max:0.6,min: -0.6}}
      }

 

   }
		var chart = new google.visualization.ColumnChart(document.getElementById('Health_growth_div'));
		chart.draw(data, options);
}//GrowRateResponseHandler