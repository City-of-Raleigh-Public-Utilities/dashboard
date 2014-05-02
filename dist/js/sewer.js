//Radar
//***************************************************************************************
//Range Selector
//*****************************************************************
//Gets the current date to set as the end date for the range selector
function getCurrentDate(type){
  var today = new Date();
  var dd = today.getDate();
  var mm = today.getMonth()+1; //January is 0!
  var yyyy = today.getFullYear();

  
if (type == 'slide'){
today = yyyy+','+mm+','+dd + ',' + '00,00,00';

return Date(today);
}
else if (type == 'sqlEnd'){
  if(dd<10) {
    dd='0'+dd
  } 

  if(mm<10) {
    mm='0'+mm
  } 
  today = yyyy+'-'+mm+'-'+dd + ' ' + '00:00:00';
  return today;
}
else if (type == "sqlBegin"){
  if(dd<10) {
    dd='0'+dd
  } 

  if(mm<10) {
    mm='0'+mm
  } 
    if (mm == 1){
      today = (yyyy - 1) +'-'+ '12' +'-'+dd + ' ' + '00:00:00';
      return today;
    }
    else{
      today = yyyy+'-'+(mm - 1)+'-'+dd + ' ' + '00:00:00';
      return today;
    }
  }
else if (type == "slideBegin"){
    if (mm == 1){
       //today = (yyyy - 1) +','+ '12' +','+ 1 + ',' + '00,00,00';
      today.setDate(1);
      today.setMonth(12);
      today.setFullYear(yyyy - 1)
      return today;
    }
    else{
      //today = yyyy+','+(mm - 1)+','+ 1 + ',' + '00,00,00';
      today.setDate(1);
      today.setMonth(mm - 1);
      today.setFullYear(yyyy)
      return today;
    }
  }
  



}



//*****************************************************************
  
  var index = [5, 6, 8, 11, 12, 14]; //server indexes
  var whereDates = [] //array where query dates will be stored

//*********************************************************************************
function createUrl(index){
  var url = "http://gis.raleighnc.gov/arcgis/rest/services/PublicUtility/SewerCollection/MapServer/" + index;
  return url;
}
//***********************************************************************************************
function createOutStat(index){
  if (index == 5 || index == 6 || index == 8 ){
    var statisticDefinition = new esri.tasks.StatisticDefinition();
      statisticDefinition.statisticType = "count";
      statisticDefinition.onStatisticField = "EDITEDBY";
      statisticDefinition.outStatisticFieldName = "EDITED";
    var createdStat =  new esri.tasks.StatisticDefinition();
      createdStat.statisticType = "count";
      createdStat.onStatisticField = "CREATEDBY";
      createdStat.outStatisticFieldName = "Created"; 
    var outStats = [statisticDefinition, createdStat];
    //var outStats = "[{statisticType: count, onStatisticField: EDITEDBY, outStatisticFieldName: EDITED }, {statisticType: count, onStatisticField: CREATEDBY, outStatisticFieldName: CREATED}]";
    return outStats;
  }
  else if (index == 11 || index == 12 || index == 14){
    var statisticDefinition = new esri.tasks.StatisticDefinition();
      statisticDefinition.statisticType = "sum";
      statisticDefinition.onStatisticField = "SHAPE.LEN";
      statisticDefinition.outStatisticFieldName = "SHAPELEN";
    var createdStat =  new esri.tasks.StatisticDefinition();
      createdStat.statisticType = "count";
      createdStat.onStatisticField = "EDITEDBY";
      createdStat.outStatisticFieldName = "EDITED"; 
    var editedStat =  new esri.tasks.StatisticDefinition();
      editedStat.statisticType = "count";
      editedStat.onStatisticField = "CREATEDBY";
      editedStat.outStatisticFieldName = "CREATED";
    var outStats = [statisticDefinition, createdStat, editedStat];
    //var outStats = "[{statisticType:  sum, onStatisticField: SHAPE.LEN, outStatisticFieldName: SHAPELEN }, {statisticType: count , onStatisticField: EDITEDBY, outStatisticFieldName: EDITED }, {statisticType: count , onStatisticField: CREATEDBY, outStatisticFieldName: CREATED }]"

return outStats;
  }
  
}
//*********************************************************************************
function where(dates){
  var editors = "EDITEDBY = 'WHITEC' or EDITEDBY = 'kellerj' or EDITEDBY = 'rickerl' or EDITEDBY = 'stearnsc' or EDITEDBY = 'mazanekm' ";
  
  if (dates.length == 0){
    var dateRange = "EDITEDON >= TO_DATE('" + getCurrentDate('sqlBegin' ) + "', 'YYYY-MM-DD HH24:MI:SS') and EDITEDON <= TO_DATE('" + getCurrentDate('sqlEnd') + "', 'YYYY-MM-DD HH24:MI:SS')" ;
    return dateRange;
  }
  else{
  var fromDate = dates[(dates.length - 2)]
  var toDate = dates[(dates.length - 1)]
  var dateRange = "EDITEDON >= TO_DATE('" + fromDate + "', 'YYYY-MM-DD HH24:MI:SS') and EDITEDON <= TO_DATE('" + toDate + "', 'YYYY-MM-DD HH24:MI:SS')" ;//and CREATEDON >= TO_DATE('" + fromDate + "', 'YYYY-MM-DD HH24:MI:SS') and CREATEDON <= TO_DATE('" + toDate + "', 'YYYY-MM-DD HH24:MI:SS')"
  var sql =  dateRange;
  
  return sql;
}

  }
  

//******************************************************************************
function clearArray(array){
  while (array.length > 0) {
    array.pop();
  }
  
}


//***************************************************************************



function calling(index){
require([
   "dojo/on", "esri/tasks/query", "esri/tasks/QueryTask",  "dojo/dom", "dojo/domReady!", "esri/tasks/StatisticDefinition"
], function(on, Query, QueryTask, dom, StatisticDefinition) {

  var query = new Query();
  var queryTask = new QueryTask(createUrl(index));
  
  query.outFields = ["EDITEDBY"];
  query.returnGeometry = false;
  query.f = 'json';
  query.groupByFieldsForStatistics = ["EDITEDBY"],
  query.outStatistics = createOutStat(index);

  //on(dom.byId("execute"), "click", execute);

  function execute(){
    query.where = where(whereDates);
    queryTask.execute(query, showResults);
  }


  // var layersRequest = esriRequest({
  //   url: createUrl(index),
  //   content: { 
  //   returnGeometry: false,
  //   where: where(whereDates),
  //   outFields: ["EDITEDBY"],
  //   groupByFieldsForStatistics: ["EDITEDBY"],
  //   outStatistics: createOutStat(index),
  //   f: "pjson"
  //    },
    
  //   handleAs: "pjson",
  //   callbackParamName: "callback"
  // });

  //Response to server call
// $('input:radio[name="sewer"]').change(
//     function(){

        


  ///////////////////////////////////////////////////////////////////////////////////////
  
    function showResults(response) {
      var gravmainData = [];
      var lateralData = [];
      var mainsData = [];
      var fittingsData = [];
      var forcemainData = [];
      var cleanoutData = [];
      var manholeDate = [];
      var fittingsTotal = {'edited': 0, 'created':0};
      var cleanoutTotal = {'edited': 0, 'created':0};
      var manholeTotal = {'edited': 0, 'created':0};
      var lateralTotal = {'miles': 0, 'edited': 0, 'created':0};
      var forceMainTotal = {'miles': 0, 'edited': 0, 'created':0};
      var gravMaintotal = {'miles': 0, 'edited': 0, 'created':0};
      for (each in response.features){
        
        input = response.features[each].attributes;
        if (index == 6){
          fittingsData.push(input);
          var fittingsOptions = barOptions('Fittings', fittingsData, 'EDITEDBY', 'EDITED', 'CREATED');
          $("#fittingChart").dxChart(fittingsOptions);
          fittingsTotal.edited+=response.features[each].attributes.EDITED;
          fittingsTotal.created+=response.features[each].attributes.CREATED;
          document.getElementById('fittings').innerHTML='Total Edites: ' + fittingsTotal.edited + ' Features' + '<br>Total Creates: ' + fittingsTotal.created + ' Features'; 
          
          
        }
        else if (index == 14){
          miles = new Number(response.features[each].attributes["SUM(SHAPE.LEN) AS SHAPELEN"] /5280);
          input["SUM(SHAPE.LEN) AS SHAPELEN"] = parseFloat(miles.toFixed(2));
          lateralData.push(input);
          var lateralOptions = pieOptions('Water Laterals', lateralData, 'EDITEDBY', 'SUM(SHAPE.LEN) AS SHAPELEN');
          piechange("#lateralPieChartContainer", lateralOptions);
          window.lateralOptions = lateralOptions;
          lateralTotal.edited+=response.features[each].attributes['COUNT(EDITEDBY) AS EDITED'];
          lateralTotal.miles+=response.features[each].attributes["SUM(SHAPE.LEN) AS SHAPELEN"];
          lateralTotal.created+=response.features[each].attributes['COUNT(CREATEDBY) AS CREATED'];
          lateralTotal.miles = Math.round(lateralTotal.miles);
          document.getElementById('laterals').innerHTML='Total Miles: ' + lateralTotal.miles; 
          window.lateralTotal = lateralTotal;
        }
        else if (index == 11){
          miles = new Number(response.features[each].attributes["SUM(SHAPE.LEN) AS SHAPELEN"] /5280);
          input["SUM(SHAPE.LEN) AS SHAPELEN"] = parseFloat(miles.toFixed(2));
          gravmainData.push(input);
          var gravmainsOptions = pieOptions('Gravity Mains', gravmainData, 'EDITEDBY', 'SUM(SHAPE.LEN) AS SHAPELEN' );
          piechange("#gravmainsPieChartContainer", gravmainsOptions);
          window.gravmainsOptions = gravmainsOptions;
          gravMaintotal.edited+=response.features[each].attributes['COUNT(EDITEDBY) AS EDITED'];
          gravMaintotal.miles+=response.features[each].attributes["SUM(SHAPE.LEN) AS SHAPELEN"];
          gravMaintotal.created+=response.features[each].attributes['COUNT(CREATEDBY) AS CREATED'];
          gravMaintotal.miles = Math.round(gravMaintotal.miles);
          document.getElementById('gravityMains').innerHTML='Total Miles: ' + gravMaintotal.miles; 
          window.gravMaintotal = gravMaintotal;
        }  
        else if (index == 12){
          miles = new Number(response.features[each].attributes["SUM(SHAPE.LEN) AS SHAPELEN"] /5280);
          input["SUM(SHAPE.LEN) AS SHAPELEN"] = parseFloat(miles.toFixed(2));
          forcemainData.push(input);
          var forcemainOptions = pieOptions('Force Mains', forcemainData, 'EDITEDBY', 'SUM(SHAPE.LEN) AS SHAPELEN' );
          piechange("#forcemainPieChartContainer", forcemainOptions);
          window.forcemainOptions = forcemainOptions;
          forceMainTotal.edited+=response.features[each].attributes['COUNT(EDITEDBY) AS EDITED'];
          forceMainTotal.miles+=response.features[each].attributes["SUM(SHAPE.LEN) AS SHAPELEN"];
          forceMainTotal.created+=response.features[each].attributes['COUNT(CREATEDBY) AS CREATED'];
          forceMainTotal.miles = Math.round(forceMainTotal.miles);
          document.getElementById('forcemains').innerHTML='Total Miles: ' + forceMainTotal.miles; 
          window.forceMainTotal = forceMainTotal;
        }  
        else if (index == 8){
          cleanoutData.push(input);
          var cleanoutOptions =  pieOptions('Cleanouts', cleanoutData, 'EDITEDBY', 'EDITED' );
          piechange("#cleanoutPieChartContainer", cleanoutOptions);
          window.cleanoutOptions = cleanoutOptions;
          cleanoutTotal.edited+=response.features[each].attributes.EDITED;
          cleanoutTotal.created+=response.features[each].attributes.CREATED;
          document.getElementById('cleanouts').innerHTML='Total Edits: ' + cleanoutTotal.edited + ' Features'; 
          window.cleanoutTotal = cleanoutTotal;
        }  
         else if (index == 5){
          manholeDate.push(input);
          var manholeOptions =  pieOptions('Manholes', manholeDate, 'EDITEDBY', 'EDITED' );
          piechange("#manholesPieChartContainer", manholeOptions);
          window.manholeOptions = manholeOptions;
          //Populates object with totals for DOM
          manholeTotal.edited+=response.features[each].attributes.EDITED;
          manholeTotal.created+=response.features[each].attributes.CREATED;
          document.getElementById('manholes').innerHTML='Total Edits: ' + manholeTotal.edited + ' Features'; 
          window.manholeTotal = manholeTotal;
        }  

      } //end for loop
      
      
    } //end of results function
  execute();
  });
  
      
} //end of calling()
for (i in index){
    calling(index[i]);
    }//end of for loop
$("#rangeSelectorContainer").dxRangeSelector({
    background: {
            color: '#eaebeb'
        },
     scale: {
      startValue: new Date(2013, 8, 1, 00,00,00),
      endValue: getCurrentDate('slide'), 
      majorTickInterval: 'month',
      minorTickInterval: 'month',
      showMinorTicks: true,
      marker: { visible: false },
      label: {format: 'monthAndYear'},
    },
      sliderMarker: {format: 'monthAndYear'},
      selectedRange : {
      startValue: getCurrentDate('slideBegin'),
      endValue: getCurrentDate('slide'),
    },
     behavior: {
     snapToTicks: true,
     allowSlidersSwap: false,
     callSelectedRangeChanged: 'onMovingComplete'
},
     selectedRangeChanged: function (e) {
      var sd = e.startValue.getDate();
      var sm = e.startValue.getMonth()+1;
      var sy = e.startValue.getFullYear();
      var ed = e.endValue.getDate();
      var em = e.endValue.getMonth()+1;
      var ey = e.endValue.getFullYear();
      if(sd<10){ 
      sd='0'+sd
    }
    if ( ed<10){
      ed='0'+ed
      } 

      if(sm<10){
      sm='0'+sm
    }
      if (em<10) {
      em='0'+em
      } 

    var start = sy+'-'+sm+'-'+sd + ' ' + '00:00:00';
    var end = ey+'-'+em+'-'+ed + ' ' + '00:00:00';
   
    whereDates.push(start, end);
    for (i in index){
    calling(index[i]);
    }//end of for loop
      
}
    });


//put back here

//***************************************************************************************************
function pieOptions(name, data, arg, val){
     var options = { dataSource: data,
          series: {
          type: 'doughnut',
          argumentField: arg,
          valueField: val,
          label: {
          visible: true,
          connector: {
          visible: true
          }
          }
        },
          
      tooltip: {
        enabled: true,
        percentPrecision: 2,
        customizeText: function (value) {
          return value.percentText;
        }
      },
    title: {
    text: name
    },
    legend: {
    horizontalAlignment: 'center',
    verticalAlignment: 'bottom'
    }

        }
        return options;
      }
 // var valveOptions = pieOptions('Water Valves', valveData, 'EDITEDBY', 'EDITED' );
 // var mainsOptions = pieOptions('Water Mains', mainsData, 'EDITEDBY', 'SUM(SHAPE.LEN) AS SHAPELEN' );
 // var lateralOptions = pieOptions('Water Laterals', lateralData, 'EDITEDBY', 'SUM(SHAPE.LEN) AS SHAPELEN');

////////////////////////////////////////////////////////////////////////////////////////////
//Fittings

function barOptions(name, data, arg, val1, val2){
var  options =  {dataSource: data,
            commonSeriesSettings: {
                      argumentField: arg,
                               type: 'stackedBar'
                                  },
                          series: [
                        { valueField: val1, name: val1 },
                        { valueField: val2, name: val2 }
                        
                                  ],
                          legend: {
                  verticalAlignment: 'bottom',
                horizontalAlignment: 'center'
                                  },
                              title: {
                              text: name
                                  }
                                }
                              return options;
}
 // var fittingsOptions = barOptions('Fittings', fittingsData, 'EDITEDBY', 'EDITED', 'CREATED');

//valvesPieChartContainer
function piechange(name, options){
  $(name).dxPieChart(options);
}


function check(value, id, options, val1, val2, val3, div, message, object){
  if(value == 1){
    options.series.valueField = val1; 
    piechange(id, options);
    document.getElementById(div).innerHTML=message + object;
    }
  else if(value == 2){
    options.series.valueField = val2;
    piechange(id, options);
    document.getElementById(div).innerHTML=message + object; 
    }
   else if(value == 3){
    options.series.valueField = val3;
    piechange(id, options);
    document.getElementById(div).innerHTML=message + object;  
    }
  } 