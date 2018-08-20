var Connection = require('tedious').Connection;
var Request = require('tedious').Request;
var TYPES = require('tedious').TYPES;
var xlsx = require('xlsx');
var async = require('async');

// Create connection to database
var config = {
  userName: 'sa', // update me
  password: 'Tripleintegrals3', // update me
  server: 'localhost',
  options: {
      database: 'chocoholicsanonymous'
  }
}
var connection = new Connection(config);

function start(callback) {
  providerNumber = 3;
  callback(null, providerNumber)
}

function getProviderInfo(providerNumber, callback) {
  var results = [];

  request = new Request(
    'SELECT * FROM Provider WHERE ProviderNumber=@ProviderNumber',
    function(err, rowCount, rows) {
      if (err) console.log(err);
      console.log(rowCount + " row(s) read.")
      return callback(null, providerNumber, results);
    }
  );
  request.addParameter('ProviderNumber', TYPES.Numeric, providerNumber);

  request.on('row', function(columns) {
    columns.forEach(function(column) {
      results.push(column.value);
    });
  });
  
  connection.execSql(request);
}

function getProviderServices(providerNumber, providerInfo, callback) {
  var results = [];

  request = new Request(
    'SELECT Member.Name, ProvidedService.MemberNumber, ProvidedService.ServiceCode, Service.Fee, ProvidedService.DateProvided, ProvidedService.DateReceived FROM ProvidedService, Member, Service WHERE ProvidedService.MemberNumber=Member.MemberNumber AND ProvidedService.ServiceCode=Service.ServiceCode AND ProviderNumber=@ProviderNumber AND DATEDIFF(day, DateReceived, CURRENT_TIMESTAMP) < 7',
    function(err, rowCount, rows) {
      if (err) console.log(err);
      console.log(rowCount + " row(s) read.")
      return callback(null, providerInfo, results);
    }
  );
  request.addParameter('ProviderNumber', TYPES.Numeric, providerNumber);

  request.on('row', function(columns) {
    resultsrow = [];
    columns.forEach(function(column) {
      resultsrow.push(column.value);
    });
    results.push(resultsrow);
  });

  connection.execSql(request);
}

function createProviderReport(providerInfo, providerServices, callback) {
  var workbook = xlsx.readFile("ProviderReportTemplate.xlsx");
  var ws = workbook.Sheets[workbook.SheetNames[0]];
  ws['B3'] = {t:'s', v:providerInfo[2]};
  ws['B4'] = {t:'s', v:providerInfo[3]};
  ws['B5'] = {t:'s', v:providerInfo[4]};
  ws['B6'] = {t:'s', v:providerInfo[5]};
  ws['B7'] = {t:'s', v:providerInfo[1]};
  ws['B8'] = {t:'n', v:providerInfo[0]};
  ws['B9'] = {t:'s', v:providerInfo[6]};
  numServices = providerServices.length;
  totalFee = 0;
  providerServices.forEach(function(row) {
    totalFee += row[3];
  });
  xlsx.utils.sheet_add_aoa(ws, providerServices, {origin: "C12"});
  ws['J'+(12+numServices)] = {t:'n', v:numServices};
  ws['J'+(13+numServices)] = {t:'n', v:totalFee}
  xlsx.writeFile(workbook, 'ProviderReport_' + providerInfo[0] + '.xlsx');
  callback();
}

// Attempt to connect and execute queries if connection goes through
connection.on('connect', function(err) {
  if (err) {
    console.log(err);
  } else {
    console.log('Connected');
    async.waterfall([start,
      getProviderInfo, 
      getProviderServices, 
      createProviderReport],
    function(err) {
      if (err) console.log(err);
    });
    console.log('I did it')
  }
});

// var workbook = xlsx.utils.book_new();
// var ws = xlsx.utils.aoa_to_sheet([[1, 2, 3]]);
// xlsx.utils.book_append_sheet(workbook, ws, "Sheet1");
// xlsx.writeFile(workbook, "Report.xlsx");