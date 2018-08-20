var Connection = require('tedious').Connection;
var Request = require('tedious').Request;
var TYPES = require('tedious').TYPES;
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

function addMember(memberNumber, name, address, email, status) {
  var splitAddress = address.split(', ');
  var street = splitAddress[0];
  var city = splitAddress[1];
  var state = splitAddress[2];
  var zipCode = splitAddress[3];
  request = new Request(
    'INSERT INTO Member (MemberNumber, Name, Street, City, State, ZipCode, Email, Status) VALUES(@MemberNumber, @Name, @Street, @City, @State, @ZipCode, @Email, @Status);',
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
  var splitAddress = address.split(', ');
  var street = splitAddress[0];
  var city = splitAddress[1];
  var state = splitAddress[2];
  var zipCode = splitAddress[3];
  request = new Request(
    'INSERT INTO Provider (ProviderNumber, Name, Street, City, State, ZipCode, Email) VALUES(@ProviderNumber, @Name, @Street, @City, @State, @ZipCode, @Email);',
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
  request = new Request(
    'INSERT INTO ProvidedService (MemberNumber, ProviderNumber, ServiceCode, DateProvided, DateReceived, Comment) VALUES (@MemberNumber, @ProviderNumber, @ServiceCode, @DateProvided, CURRENT_TIMESTAMP, @Comment);',
    function(err, rowCount, rows) {
      if (err) console.log(err);
      console.log(rowCount + " row(s) written.")
    }
  );
  request.addParameter('MemberNumber', TYPES.Numeric, memberNumber);
  request.addParameter('ProviderNumber', TYPES.Numeric, providerNumber);
  request.addParameter('ServiceCode', TYPES.Numeric, serviceCode);
  request.addParameter('DateProvided', TYPES.Date, dateProvided);
  request.addParameter('Comment', TYPES.NVarChar, comment);
  
  connection.execSql(request);
}

function removeMember(memberNumber) {
  request = new Request(
    'DELETE FROM Member WHERE MemberNumber=@MemberNumber;',
    function(err, rowCount, rows) {
      if (err) console.log(err);
      console.log(rowCount + " row(s) removed.")
    }
  );
  request.addParameter('MemberNumber', TYPES.Numeric, memberNumber);
  
  connection.execSql(request);
}

function removeProvider(providerNumber) {
  request = new Request(
    'DELETE FROM Provider WHERE ProviderNumber=@ProviderNumber;',
    function(err, rowCount, rows) {
      if (err) console.log(err);
      console.log(rowCount + " row(s) removed.")
    }
  );
  request.addParameter('ProviderNumber', TYPES.Numeric, providerNumber);
  
  connection.execSql(request);
}

connection.on("connect",
  function(err) {
    if (err) console.log(err)
    else {
      console.log('Connected.')
      // addMember(989519763, "Allison Ramasami", "3704 Flower Lane, Dearborn, MI, 48128", "fakeemail@gmail.com", 1);
      // removeMember(989519763)
      // addProvider(989519763, "Allison Ramasami", "3704 Flower Lane, Dearborn, MI, 48128", "fakeemail@gmail.com")
      // removeProvider(989519763);
      addProvidedService(123456789, 756302140, 123456, '2018-03-14', 'this is a comment')
    }
  }
);