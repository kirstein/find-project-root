var findRoot = require('../index');
var assert   = require('assert');
var sinon    = require('sinon');
var fs       = require('fs');
var path     = require('path');

describe("findRoot", function() {

  it("should exist", function() {
    assert(typeof findRoot === "function");
  });

  it("should throw if directory does not exist", function() {
    assert.throws(function() {
      findRoot(null);
    });
  });

  it("should read dir give to that", sinon.test(function() {
    this.stub(fs, 'readdirSync').returns([]);
    findRoot("test");
    assert(fs.readdirSync.calledWith("test"));
  }));

  it("should return true if .git exists", sinon.test(function() {
    this.stub(fs, 'readdirSync').returns(['.git']);
    var result = findRoot("test");
    assert(result === "test");
  }));

  it("should traverse to bottom folder if marker is not found in the first one", sinon.test(function() {
    var stub = this.stub(fs, 'readdirSync');
    stub.onCall(0).returns([]);
    stub.onCall(1).returns(['.git']);
    var loc    = "test/xx";
    var result = findRoot(loc);
    assert(result === path.resolve(loc, '..'));
  }));

  it("should return null if looping goes too deep", sinon.test(function() {
    var stub = this.stub(fs, 'readdirSync');
    stub.onCall(0).returns([]);
    stub.onCall(1).returns([]);
    stub.onCall(2).returns([]);
    stub.onCall(3).returns([]);
    var result = findRoot('test');
    assert(result === null);
  }));

});
