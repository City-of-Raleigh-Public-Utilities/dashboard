//Radar
//***************************************************************************************
//Range Selector
//*****************************************************************
//Gets the current date to set as the end date for the range selector
function getCurrentDate(){
  var today = new Date();
  var dd = today.getDate();
  var mm = today.getMonth()+1; //January is 0!
  var yyyy = today.getFullYear();
  return mm + '/' + dd + '/'+  yyyy;

}


$("#date").append(getCurrentDate());




//*****************************************************************

  var sindex = [1,4,7,10]; //sewer
  var windex = [3,4,6,10,12]; //water
  var rindex = [4,1,9,6] //array where query dates will be stored

//*********************************************************************************
function createUrl(index, type){
  var url = "http://gis.raleighnc.gov/arcgis/rest/services/PublicUtility/"+ type + "/MapServer/" + index;
  return url;
}
//***********************************************************************************************
//Designates output statistics from server
function createOutStat(index, type){
  if (type == 'WaterDistribution' ){
  if (index == 6 || index == 4 ){
    var statisticDefinition = new esri.tasks.StatisticDefinition();
      statisticDefinition.statisticType = "count";
      statisticDefinition.onStatisticField = "FACILITYID";
      statisticDefinition.outStatisticFieldName = "COUNT";
    var outStats = [statisticDefinition];
    //var outStats = "[{statisticType: count, onStatisticField: EDITEDBY, outStatisticFieldName: EDITED }, {statisticType: count, onStatisticField: CREATEDBY, outStatisticFieldName: CREATED}]";
    return outStats;
  }
  else if (index == 12 ){
    var statisticDefinition = new esri.tasks.StatisticDefinition();
      statisticDefinition.statisticType = "sum";
      statisticDefinition.onStatisticField = "SHAPE.LEN";
      statisticDefinition.outStatisticFieldName = "SHAPELEN";

    var outStats = [statisticDefinition];
    //var outStats = "[{statisticType:  sum, onStatisticField: SHAPE.LEN, outStatisticFieldName: SHAPELEN }, {statisticType: count , onStatisticField: EDITEDBY, outStatisticFieldName: EDITED }, {statisticType: count , onStatisticField: CREATEDBY, outStatisticFieldName: CREATED }]"

return outStats;
  }
  else if (index == 10 ){
    var statisticDefinition = new esri.tasks.StatisticDefinition();
      statisticDefinition.statisticType = "count";
      statisticDefinition.onStatisticField = "STRUCTTYPE";
      statisticDefinition.outStatisticFieldName = "TYPE";

    var outStats = [statisticDefinition];

return outStats;
  }
  else if (index == 3 ){
    var statisticDefinition = new esri.tasks.StatisticDefinition();
      statisticDefinition.statisticType = "count";
      statisticDefinition.onStatisticField = "OWNEDBY";
      statisticDefinition.outStatisticFieldName = "TYPE";

    var outStats = [statisticDefinition];

return outStats;
  }
}
 if (type == 'SewerCollection' ){
  if (index == 4 || index == 7){
    var statisticDefinition = new esri.tasks.StatisticDefinition();
      statisticDefinition.statisticType = "count";
      statisticDefinition.onStatisticField = "FACILITYID";
      statisticDefinition.outStatisticFieldName = "COUNT";
    var outStats = [statisticDefinition];
    //var outStats = "[{statisticType: count, onStatisticField: EDITEDBY, outStatisticFieldName: EDITED }, {statisticType: count, onStatisticField: CREATEDBY, outStatisticFieldName: CREATED}]";
    return outStats;
  }
  else if (index == 10){
    var statisticDefinition = new esri.tasks.StatisticDefinition();
      statisticDefinition.statisticType = "sum";
      statisticDefinition.onStatisticField = "SHAPE.LEN";
      statisticDefinition.outStatisticFieldName = "SHAPELEN";

    var outStats = [statisticDefinition];
    //var outStats = "[{statisticType:  sum, onStatisticField: SHAPE.LEN, outStatisticFieldName: SHAPELEN }, {statisticType: count , onStatisticField: EDITEDBY, outStatisticFieldName: EDITED }, {statisticType: count , onStatisticField: CREATEDBY, outStatisticFieldName: CREATED }]"

return outStats;
  }
  else if (index == 1){
    var statisticDefinition = new esri.tasks.StatisticDefinition();
      statisticDefinition.statisticType = "count";
      statisticDefinition.onStatisticField = "STRUCTTYPE";
      statisticDefinition.outStatisticFieldName = "COUNT";

    var outStats = [statisticDefinition];

return outStats;
  }

}
if (type == 'ReclaimedDistribution' ){
  if (index == 1 || index == 6){
    var statisticDefinition = new esri.tasks.StatisticDefinition();
      statisticDefinition.statisticType = "count";
      statisticDefinition.onStatisticField = "FACILITYID";
      statisticDefinition.outStatisticFieldName = "COUNT";
    var outStats = [statisticDefinition];
    //var outStats = "[{statisticType: count, onStatisticField: EDITEDBY, outStatisticFieldName: EDITED }, {statisticType: count, onStatisticField: CREATEDBY, outStatisticFieldName: CREATED}]";
    return outStats;
  }
  else if (index == 9){
    var statisticDefinition = new esri.tasks.StatisticDefinition();
      statisticDefinition.statisticType = "sum";
      statisticDefinition.onStatisticField = "SHAPE.LEN";
      statisticDefinition.outStatisticFieldName = "SHAPELEN";

    var outStats = [statisticDefinition];
    //var outStats = "[{statisticType:  sum, onStatisticField: SHAPE.LEN, outStatisticFieldName: SHAPELEN }, {statisticType: count , onStatisticField: EDITEDBY, outStatisticFieldName: EDITED }, {statisticType: count , onStatisticField: CREATEDBY, outStatisticFieldName: CREATED }]"

return outStats;
  }
  else if (index == 4){
    var statisticDefinition = new esri.tasks.StatisticDefinition();
      statisticDefinition.statisticType = "count";
      statisticDefinition.onStatisticField = "STRUCTTYPE";
      statisticDefinition.outStatisticFieldName = "COUNT";

    var outStats = [statisticDefinition];

return outStats;
  }


}

}
//*********************************************************************************
function groupField(index, type){
  if (index == 10 && type == 'WaterDistribution' ){
    return  ["STRUCTTYPE"];
  }
  else if (index == 1 && type == 'SewerCollection' ){
    return  ["STRUCTTYPE"];
  }
  else if (index == 4 && type == 'ReclaimedDistribution'){
    return ["STRUCTTYPE"];
  }
  else if (index == 3 && type == 'WaterDistribution'){
    return ["OWNEDBY"];
  }
  else{
    return
  }

}


//******************************************************************************
function clearArray(array){
  while (array.length > 0) {
    array.pop();
  }

}

function numberWithCommas(x) {
    return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
}
//***************************************************************************



function calling(index, type){

require([
   "dojo/on", "esri/tasks/query", "esri/tasks/QueryTask",  "dojo/dom", "esri/tasks/StatisticDefinition", "dojo/domReady!"
], function(on, Query, QueryTask, dom, StatisticDefinition) {
  var query = new Query();
  var queryTask = new QueryTask(createUrl(index, type));
  query.returnGeometry = false;
  query.f = 'json';
  query.outStatistics = createOutStat(index, type);

  query.groupByFieldsForStatistics = groupField(index, type)

  //on(dom.byId("execute"), "click", execute);

  function execute(){
    queryTask.execute(query, showResults);
  }


  ///////////////////////////////////////////////////////////////////////////////////////
  if (type == 'WaterDistribution'){



    function showResults(response) {

      for (each in response.features){
//Water Stats
          if (index == 12){
          miles = new Number(response.features[each].attributes["SUM(SHAPE.LEN) AS SHAPELEN"] /5280);
          rounded = parseFloat(miles.toPrecision(5));
          document.getElementById("pressuremains").innerHTML="Miles of Pressure Mains: " + numberWithCommas(rounded);
        }

        if (index == 4 ){
         var total = response.features[each].attributes.COUNT;
          document.getElementById("systemvalves").innerHTML="Number of System Valves: " + numberWithCommas(total);
        }
        if (index == 6){
         var total = response.features[each].attributes.COUNT;
          document.getElementById("waterserviceconnection").innerHTML="Number of Service Connections: " + numberWithCommas(total);
        }
        if (index == 3){
         var type = response.features[each].attributes.OWNEDBY;
         var total = response.features[each].attributes.TYPE;
         //console.log(response.features)
        if (type == 0){
          type = 'COR';
        }
        else if (type == 1){
          type = 'Private';
        }
        else if (type == 2){
          type = 'Other Jurisdiction';
        }
        var li = "<li class='list-group-item' style='background-color:#EFF3FF'>";
        $("#hydrants").append(li.concat('<span class="badge">'+ numberWithCommas(total) + '</span>' + type ));
        }
        if (index == 10 ){
         var total = response.features[each].attributes.TYPE;
         var type = response.features[each].attributes.STRUCTTYPE;
        var li = "<li class='list-group-item' style='background-color:#EFF3FF'>";
        $("#WNS").append(li.concat('<span class="badge">'+ numberWithCommas(total) + '</span>' + type));
        }

    }
    }
    }
    else if (type == 'SewerCollection'){

      function showResults(response) {
      for (each in response.features){


//Sewer Stats
        if (index === 10){
          miles = new Number(response.features[each].attributes["SUM(SHAPE.LEN) AS SHAPELEN"] /5280);
          rounded = parseFloat(miles.toPrecision(5));
          document.getElementById("gravityMains").innerHTML="Miles of Gravity Mains: " + numberWithCommas(rounded);
        }
        if (index === 7){
          var total = response.features[each].attributes.COUNT;
          document.getElementById("cleanouts").innerHTML="Number of Cleanouts: " + numberWithCommas(total);
        }
        if (index === 4){
         var total = response.features[each].attributes.COUNT;
          document.getElementById("manholes").innerHTML="Number of Manholes: " + numberWithCommas(total);
        }
        if (index === 1){
         var total = response.features[each].attributes.COUNT;
         var type = response.features[each].attributes.STRUCTTYPE;
          var li = "<li class='list-group-item' style='background-color:#F0F8EE'>";
        $("#SNS").append(li.concat('<span class="badge">'+ numberWithCommas(total) + '</span>' + type));
        }

      } //end for loop

    }//end Show Results
    } //end if sewer

     else if (type == 'ReclaimedDistribution'){
      function showResults(response) {

      for (each in response.features){


//Reuse Stats
        if (index == 9 ){
          miles = new Number(response.features[each].attributes["SUM(SHAPE.LEN) AS SHAPELEN"] /5280);
          rounded = parseFloat(miles.toPrecision(5));
          document.getElementById("reusepressuremains").innerHTML="Miles of Pressure Mains: " + numberWithCommas(rounded);
        }
        if (index == 1 ){
          var total = response.features[each].attributes.COUNT;
          document.getElementById("reusesystemvalves").innerHTML="Number of System Valves: " + numberWithCommas(total);
        }
        if (index == 6 ){
         var total = response.features[each].attributes.COUNT;
          document.getElementById("reuseserviceconnections").innerHTML="Number of Service Connections: " + numberWithCommas(total);
        }
        if (index == 4 ){
         var total = response.features[each].attributes.COUNT;
         var type = response.features[each].attributes.STRUCTTYPE;
         var li = "<li class='list-group-item' style='background-color:#fcfae8'>";
         $("#RNS").append(li.concat('<span class="badge">'+ numberWithCommas(total) + '</span>' + type));
        }

      } //end for loop

    }//end Show Results
    } //end if sewer


    //end of results function
  execute();
  });


} //end of calling()

for (i in sindex){
    calling(sindex[i],'SewerCollection');
    }//end of for loop
for (i in windex){
  calling(windex[i], 'WaterDistribution');
}
for (i in rindex){
  calling(rindex[i], 'ReclaimedDistribution');
}
