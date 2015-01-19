/**
* Main javascript file to create and display the montly reports.
*
*/
var month = ["January","February","March","April","May","June","July","August","September","October","November","December"];
function numberWithCommas(x) {
    return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
}
$(document).ready(function(){
  var MCRdata = [];
  $("#monthlyCirculationReports").on("click",function(){
    postDate = new Date();
	var postMonth = 0;
	var postYear = 0;

	if(postDate.getMonth()==0){
		postMonth = 13;
		postYear = postDate.getFullYear() - 1;
	}else{
		postMonth = postDate.getMonth()+1;
		postYear = postDate.getFullYear();
	}
    console.log({"month":postMonth,"year":postYear});
    $.post("../php/mcr.php",{"month":postMonth,"year":postYear},function(data){
      MCRdata = $.parseJSON(data);
      console.log(MCRdata);
      $.get("CirculationStats.html",function(data){
        //console.log(MCRdata);
        $("#body").html(data);
        var template = $("#statsTemplate");
        //console.log(template.html());
        $("#monthLabel").html(MCRdata["month"]);
        var dt = new Date(MCRdata["month"]);
        $("#monthLabel").html(month[dt.getMonth()]+" "+dt.getFullYear());

        var curTotalSystem = 0;
        var prevTotalSystem = 0;
        var curTotalSystemYTD = 0;
        var prevTotalSystemYTD = 0;

        for(a in MCRdata["branches"]){
          var curTotal = 0;
          var prevTotal = 0;
          var curTotalYTD = 0;
          var prevTotalYTD = 0;



          var tableTemplate = template.clone();
          tableTemplate.attr({"id":tableTemplate.attr("id")+a}).css("width","100%").show();
          tableTemplate.find("#libraryName").html(MCRdata["branches"][a]);
          tableTemplate.find("#prevMonth").html(month[dt.getMonth()]+" "+(dt.getFullYear()-1));
          tableTemplate.find("#curMonth").html(month[dt.getMonth()]+" "+dt.getFullYear());
          tableTemplate.find("#curYTD").html(dt.getFullYear()+" YTD");
          tableTemplate.find("#prevYTD").html((dt.getFullYear()-1)+" YTD");
          var values = tableTemplate.find("#circStats");
          var val = MCRdata[MCRdata["branches"][a]];
          var totals = tableTemplate.find("#totals");
          for(b in val){
            var socChange = ((val[b]["SOC1"]/val[b]["SOC2"])-1)*100;
            socChange = Math.round(socChange * 100) / 100

            var socChangeYTD = ((val[b]["YTD2"]/val[b]["YTD1"])-1)*100;
            socChangeYTD = Math.round(socChangeYTD * 100) / 100;

            if(val[b]["SOC2"] && val[b]["SOC1"]){
              curTotal = parseInt(val[b]["SOC2"])+curTotal;
              curTotalSystem = parseInt(val[b]["SOC2"])+curTotalSystem;

              prevTotal = parseInt(val[b]["SOC1"])+prevTotal;
              prevTotalSystem = parseInt(val[b]["SOC1"])+prevTotalSystem;

              curTotalYTD = parseInt(val[b]["YTD2"])+curTotalYTD;
              curTotalSystemYTD = parseInt(val[b]["YTD2"])+curTotalSystemYTD;

              prevTotalYTD = parseInt(val[b]["YTD1"])+prevTotalYTD;
              prevTotalSystemYTD = parseInt(val[b]["YTD1"])+prevTotalSystemYTD;

              $("<tr/>")
                .append(
                  $("<td/>",{html:b})
                 )
                .append(
                  $("<td/>",{html:numberWithCommas(val[b]["SOC2"])})
                )
                .append(
                  $("<td/>",{html:numberWithCommas(val[b]["SOC1"])})
                )
                .append(
                  $("<td/>",{html:socChange+"%"})
                )
                .append(
                  $("<td/>",{html:numberWithCommas(val[b]["YTD1"])})
                )
                .append(
                  $("<td/>",{html:numberWithCommas(val[b]["YTD2"])})
                )
                .append(
                  $("<td/>",{html:socChangeYTD+"%"})
                )
                .insertBefore(totals)
            }
          }

          //Total values
          tableTemplate.find("#totalLibraryName").html(MCRdata["branches"][a]+" Totals");
          tableTemplate.find("#totalPrevMonth").html(numberWithCommas(curTotal));
          tableTemplate.find("#totalCurMonth").html(numberWithCommas(prevTotal));

          tableTemplate.find("#totalPrevMonthYTD").html(numberWithCommas(prevTotalYTD));
          tableTemplate.find("#totalCurMonthYTD").html(numberWithCommas(curTotalYTD));


          var delta = ((prevTotal/curTotal)-1)*100;
          delta = Math.round(delta * 100) / 100;
          var deltaYTD = ((curTotalYTD/prevTotalYTD)-1)*100;
          deltaYTD = Math.round(deltaYTD * 100) / 100;
          tableTemplate.find("#totalDelta").html(delta+"%");
          tableTemplate.find("#totalDeltaYTD").html(deltaYTD+"%");

          tableTemplate.appendTo("#body");

        }
        var deltaSystem = ((prevTotalSystem/curTotalSystem)-1)*100;
        deltaSystem = Math.round(deltaSystem * 100) / 100;

        var deltaSystemYTD = ((curTotalSystemYTD/prevTotalSystemYTD)-1)*100;
        deltaSystemYTD = Math.round(deltaSystemYTD * 100) / 100;

        $("<tr/>")
          .append(
            $("<td/>")
              .html(
                $("<div/>")
                  .html("WPL System Totals")
                  .css({"text-align":"right","margin-right":"1em"})
              )
          )
          .append(
            $("<td/>",{html:numberWithCommas(curTotalSystem)})
          )
          .append(
            $("<td/>",{html:numberWithCommas(prevTotalSystem)})
          )
          .append(
            $("<td/>",{html:deltaSystem+"%"})
          )
          .append(
            $("<td/>",{html:numberWithCommas(prevTotalSystemYTD)})
          )
          .append(
            $("<td/>",{html:numberWithCommas(curTotalSystemYTD)})
          )
          .append(
            $("<td/>",{html:deltaSystemYTD+"%"})
          )
          .insertAfter(totals)
        $("#printable").html($("#body").html());

      },"html");
    });
  });
});
