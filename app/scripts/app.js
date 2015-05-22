(function (document) {
  'use strict';

  // Grab a reference to our auto-binding template
  // and give it some initial binding values
  // Learn more about auto-binding templates at http://goo.gl/Dx1u2g
  var app = document.querySelector('#app');
  app.appName = 'Yo, Polymer App!';
  app.tabid = 1;

var data = [];
data.push({
    name:'Acid Spash',
    duration:'Instantaneous'
  });

  data.push({
    name:'Blade Ward',
    duration:'1 Round'
  });



  var oldData = [
  {
    'name': 'Acid Spash',
    'level': 0,
    'Casting Time': '1 Action',
    'source': 'PHB',
    'range': '60 feet',
    'components': 'V S',
    'duration': 'Instantaneous',
    'description': '',
    'classes': [
      'Sorcerer',
      'Wizard'
    ]
  },
  {
    'name': 'Blade Ward',
    'level': 0,
    'casting Time': '1 Action',
    'source': 'PHB',
    'range': 'Self',
    'components': 'V S',
    'duration': '1 Round',
    'description': '',
    'classes': [
      'Bard',
      'Sorcerer',
      'Warlock',
      'Wizard'
    ]
  }
];
app.data = oldData;

  // Listen for template bound event to know when bindings
  // have resolved and content has been stamped to the page
  app.addEventListener('template-bound', function() {
    console.log('Our app is ready to rock!');
    var sheet = document.querySelector('google-sheets');
    sheet.addEventListener('google-sheet-data', function(e) {

          // this.spreadsheets - list of the user's spreadsheets
     // this.tab - information on the tab that was fetched
  //   console.log(this.rows);// - cell row information for the tab that was fetched
    // console.log(e.detail.type);
     if(e.detail.type==='rows'){
    //   var GoogleSheetsRows = this.rows;
       //var il = document.querySelector('#infoList');
      // il.setAttribute('data',JSON.stringify( GoogleSheetsRows));
       //app.GoogleSheetsRows = JSON.stringify(GoogleSheetsRows);

      // console.log(GoogleSheetsRows);
       //this.rows.forEach(function(item,i){
        // console.log(item.feed.entry[i]);
       //var hu = document.querySelector(".hero-unit");

         //hu.innerHTML = hu.innerHTML + "<core-item>"+item.content.$t+"</core-item>";

       //});
     }

    });

    //sheet.addEventListener('core-error', function(e) {
     // e.detail.response
    //});
  });

// wrap document so it plays nice with other libraries
// http://www.polymer-project.org/platform/shadow-dom.html#wrappers
})(wrap(document));
