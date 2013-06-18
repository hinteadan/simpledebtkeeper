/// <reference path="~/scripts/lib/testing/qunit.js" />
/// <reference path="~/scripts/lib/underscore.js" />
/// <reference path="~/scripts/lib/factory.js" />

(function () {

    module("Factory library");

    test("Synchronous factory", function () {
        var instance = create.sync(function () { return new dummyObject(); });

        ok(typeof instance !== undefined, "Instance is created");
        ok(instance.dummyObjectIdentifier !== undefined, "Instance is of expected type");
    });

    asyncTest("Asynchronous factory", 2, function () {
        var instance = create.async(
            function (onDone) {
                setTimeout(function () {
                    instance = new dummyObject();
                    onDone.call(this);
                }, 50)
            },
            function () {
                ok(typeof instance !== undefined, "Instance is created");
                ok(instance.dummyObjectIdentifier !== undefined, "Instance is of expected type");
                start();
            }
            );
    });

    asyncTest("Asynchronous factory times out", 2, function () {
        var instance = create.async(
            function (onDone) {
                setTimeout(function () {
                    instance = new dummyObject();
                }, 50)
            },
            function () {
                ok(typeof instance !== undefined, "Instance is created");
                ok(instance.dummyObjectIdentifier !== undefined, "Instance is of expected type");
                start();
            },
            500);
    });

    function dummyObject() {
        this.dummyObjectIdentifier = -1;
    }

    var create = new Factory();

}).call(this);