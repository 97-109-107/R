var Nightmare = require('nightmare');
var fs = require('fs'); 
var parse = require('csv-parse');

var csvData=[];
fs.createReadStream("./hosty_wynik.csv")
    .pipe(parse({delimiter: ','}))
    .on('data', function(csvrow) {
        csvData.push(csvrow);        
    })
    .on('end',function() {
    		visit(1)
    });

    function visit(i){
    		var row = csvData[i]
			var url = row[1]
			var name = row[0]
			console.log('Visiting:', name, url)

			new Nightmare({waitTimeout: 3000})
			.viewport(1024, 768)
			.goto(url)
			.wait()
			.screenshot('./output/' + name + '-overview.png')
			.run(function( err, nightmare){
        			if (err) console.log(err);
        			visit(i+1)
			}).end();
    }
// var _ = require('lodash')
//
// var imei = ''; 
// var driver = 1;
//
// new Nightmare()
//   .viewport(1280, 900)
//   .goto('http://127.0.0.1:6399/?driver=' + driver)
//   .click('#sidebarMenuRender > li:nth-child(1) > a:nth-child(1)')
//   .wait()
//   .evaluate(function () {
//     return document.querySelector('#deviceid').innerText;
//   },function (value) {
//
//     new Nightmare()
//     .viewport(1280, 900)
//     .goto('http://127.0.0.1:6399/?driver=' + driver)
//       .click('#sidebarMenuRender > li:nth-child(1) > a:nth-child(1)')
//       .wait()
//       .screenshot('./shots/driver-' + driver + '-' + value +'-overview.png')
//       .click('#sidebarMenuRender > li:nth-child(2) > a:nth-child(1)')
//       .wait()
//       .select('#tourSelect',1)
//       .wait()
//       .screenshot('./shots/driver-' + driver + '-' + value +'-trip-'+ 1 +'.png')
//       .select('#tourSelect',2)
//       .wait()
//       .screenshot('./shots/driver-' + driver + '-' + value +'-trip-'+ 2 +'.png')
//       .select('#tourSelect',3)
//       .wait()
//       .screenshot('./shots/driver-' + driver + '-' + value +'-trip-'+ 3 +'.png')
//
//       .click('li.treeview:nth-child(4) > a:nth-child(1)')
//       .click('li.treeview:nth-child(4) > a:nth-child(1) > li:nth-child(1)')
//       .wait()
//       .screenshot('./shots/driver-' + driver + '-' + value +'-speed.png')
//
//       .click('.menu-open > li:nth-child(2)')
//       .wait()
//       .screenshot('./shots/driver-' + driver + '-' + value +'-distance.png')
//
//       .run(function( err, nightmare){
//         if (err) return console.log(err);
//         console.log("Overview done -", driver, imei);
//       });
//
//   })
//   .run(function( err, nightmare){
//     if (err) return console.log(err);
//     console.log("Done -", driver, imei);
//   });
//
