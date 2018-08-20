var Connection = require('tedious').Connection;
var Request = require('tedious').Request;
var TYPES = require('tedious').TYPES;

// Create connection to database
var config = {
  userName: 'sa', // update me
  password: 'Tripleintegrals3', // update me
  server: 'localhost',
  options: {
      database: 'chocan'
  }
}
var connection = new Connection(config);

function addMember(memberNumber, name, address, email, status) {
  var splitAddress = str.split(', ');
  var street = splitAddress[0];
  var city = splitAddress[1];
  var state = splitAddress[2];
  var zipCode = splitAddress[3];
  request = new Request(
    'INSERT INTO Member (MemberNumber, Name, Street, City, State, ZipCode, Email, Status)',
    function(err, rowCount, rows) {
      if (err) console.log(err);
      console.log(rowCount + " row(s) written.")
    }
  );
  request.addParameter('MemberNumber', TYPES.Numeric, memberNumber);
  request.addParameter('Name', TYPES.NVarChar, name);
  request.addParameter('Street', TYPES.NVarChar, street);
  request.addParameter('City', TYPES.NVarChar, city);
  request.addParameter('State', TYPES.NChar, state);
  request.addParameter('ZipCode', TYPES.Numeric, zipCode);
  request.addParameter('Email', TYPES.NVarChar, email);
  request.addParameter('Status', TYPES.Numeric, status);

  connection.execSql(request);
}

function addProvider(providerNumber, name, address, email) {
  var splitAddress = str.split(', ');
  var street = splitAddress[0];
  var city = splitAddress[1];
  var state = splitAddress[2];
  var zipCode = splitAddress[3];
  request = new Request(
    'INSERT INTO Member (ProviderNumber, Name, Street, City, State, ZipCode, Email)',
    function(err, rowCount, rows) {
      if (err) console.log(err);
      console.log(rowCount + " row(s) written.")
    }
  );
  request.addParameter('ProviderNumber', TYPES.Numeric, providerNumber);
  request.addParameter('Name', TYPES.NVarChar, name);
  request.addParameter('Street', TYPES.NVarChar, street);
  request.addParameter('City', TYPES.NVarChar, city);
  request.addParameter('State', TYPES.NChar, state);
  request.addParameter('ZipCode', TYPES.Numeric, zipCode);
  request.addParameter('Email', TYPES.NVarChar, email);

  connection.execSql(request);
}

function addProvidedService(memberNumber, providerNumber, serviceCode, dateProvided, comment) {
  
}