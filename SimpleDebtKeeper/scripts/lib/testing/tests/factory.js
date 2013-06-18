/// <reference path="~/scripts/lib/testing/qunit.js" />
/// <reference path="~/scripts/lib/underscore.js" />

(function () {

    module("Factory library");

    test("Synchronous factory", function () {
        var instance = factory(function () { return new dummyObject(); });

        ok(typeof instance !== undefined, "Instance is created");
        ok(instance.dummyObjectIdentifier !== undefined, "Instance is of expected type");
    });

    function dummyObject() {
        this.dummyObjectIdentifier = -1;
    }

    function factory(creationFunc) {
        return creationFunc.call(this);
    }

}).call(this);