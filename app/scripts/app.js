/*
Copyright (c) 2015 The Polymer Project Authors. All rights reserved.
This code may only be used under the BSD style license found at http://polymer.github.io/LICENSE.txt
The complete set of authors may be found at http://polymer.github.io/AUTHORS.txt
The complete set of contributors may be found at http://polymer.github.io/CONTRIBUTORS.txt
Code distributed by Google as part of the polymer project is also
subject to an additional IP rights grant found at http://polymer.github.io/PATENTS.txt
*/


(function (document) {
  'use strict';

  // Grab a reference to our auto-binding template
  // and give it some initial binding values
  // Learn more about auto-binding templates at http://goo.gl/Dx1u2g
  var app = document.querySelector('#app');

  app.displayInstalledToast = function() {
    document.querySelector('#caching-complete').show();
  };

  // Listen for template bound event to know when bindings
  // have resolved and content has been stamped to the page
  app.addEventListener('template-bound', function() {

  });

  // See https://github.com/Polymer/polymer/issues/1381
  window.addEventListener('WebComponentsReady', function() {
    document.querySelector('body').removeAttribute('unresolved');
  });
})(document);


$( document ).ready(function(){
/*
  $('#totalOnlineContent').highcharts({
    global:{ },
    credits:{enabled:false},
    exporting:{enabled:false},
    chart: {
      type: 'area'
    },
    xAxis:{type:'datetime'},
    plotOptions: {
      area: {
        stacking: 'normal',
        lineColor: '#666666',
        lineWidth: 1,
        marker: {
          lineWidth: 1,
          lineColor: '#666666'
        },
        series:{
          pointStart: Date.UTC(2014, 8, 1),
          pointIntervalUnit: 'month'
        }
      }
    },
    title: {
        text: 'Database Use'
    },
    data: {
      googleSpreadsheetKey: '1PxSpzQZTRsT3U3J93NKZo52e4j7nqjBD5sseQhB79GY',
      parsed:function(columns){
        //console.log(columns);
        $.each(columns, function () {
          if(this[0]=='Website Hits'){
            return this;
            this.complete()
          }else{ return "cool"}
        });
      },
      complete:function(options){

      }
    }
  });


  $('#totalTechHelp').highcharts({
    chart: {
      type: 'area'
    },
    credits:{enabled:false},
    exporting:{enabled:false},
    xAxis:{type:'datetime'},
    plotOptions: {
      area: {
        stacking: 'normal',
        lineColor: '#666666',
        lineWidth: 1,
        marker: {
          lineWidth: 1,
          lineColor: '#666666'
        },
        series:{
          pointStart: Date.UTC(2014, 8, 1),
          pointIntervalUnit: 'month',
          events:{

          }
        }
      }
    },
    title: {
      text: 'Tech Help'
    },
    data: {
      googleSpreadsheetWorksheet:'default',
      googleSpreadsheetKey: '1jz1IWYOv5k2-3tWaxSJTqmcaZkcnCVojjgyGk8fK8i0'
    }
  });
  */
  //$('fab-icon:')





});
