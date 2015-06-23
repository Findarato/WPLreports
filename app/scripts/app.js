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
  //$().


  //Setup database use on front page







})(document);


$( document ).ready(function(){

var totalOnlineContent = {};
jQuery.ajax({
    url: '/php/getOnlineContent.php',
    dataType:'json',
    context: document.body,
//    data:{'sheet':'Sheet1','headers':'1','q':'SELECT A, D, E, F, G, H OFFSET 1'},
    //headers:
  }).done(function(json){
    totalOnlineContent = json;
    console.log(json.Overdrive[0]);
  });







  $('#database-use').highcharts({
        chart: {
            type: 'area'
        },
        title: {
            text: 'Historic and Estimated Worldwide Population Growth by Region'
        },
        subtitle: {
            text: 'Source: Wikipedia.org'
        },
        xAxis: {
            categories: totalOnlineContent.dates,
            tickmarkPlacement: 'on',
            title: {
                enabled: false
            }
        },
        yAxis: {
            title: {
                text: 'Billions'
            },
            labels: {
                formatter: function () {
                    return this.value / 1000;
                }
            }
        },
        tooltip: {
            shared: true,
            valueSuffix: ' millions'
        },
        plotOptions: {
            area: {
                stacking: 'normal',
                lineColor: '#666666',
                lineWidth: 1,
                marker: {
                    lineWidth: 1,
                    lineColor: '#666666'
                }
            }
        },

        series:totalOnlineContent.data
        /*
        series: [{
            name: 'Asia',
            data: [502, 635, 809, 947, 1402, 3634, 5268]
        }, {
            name: 'Africa',
            data: [106, 107, 111, 133, 221, 767, 1766]
        }, {
            name: 'Europe',
            data: [163, 203, 276, 408, 547, 729, 628]
        }, {
            name: 'America',
            data: [18, 31, 54, 156, 339, 818, 1201]
        }, {
            name: 'Oceania',
            data: [2, 2, 2, 6, 13, 30, 46]
        }]
        */
    });

});




// TODO: Decide if we still want to suggest wrapping as it requires
// using webcomponents.min.js.
// wrap document so it plays nice with other libraries
// http://www.polymer-project.org/platform/shadow-dom.html#wrappers
// )(wrap(document));
