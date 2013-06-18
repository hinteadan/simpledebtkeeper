/// <reference path="~/scripts/lib/testing/qunit.js" />
/// <reference path="~/scripts/lib/underscore.js" />

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

    function factory() {

        function factory(creationFunc) {
            return creationFunc.call(this);
        }

        function asyncFactory(creationFunc, doneNotifierFunc, millisecondsToTimeout) {

            var result = {},
                timeoutInMilliseconds = millisecondsToTimeout || 30000,
                doneNotifier = wrapDoneNotifierFunc(),
                timeoutId = setTimeout(doneNotifier, timeoutInMilliseconds);

            function wrapDoneNotifierFunc() {
                return function () {
                    clearTimeout(timeoutId);
                    doneNotifierFunc.call(this);
                };
            }

            creationFunc.call(this, doneNotifier);

            return result;
        }

        this.sync = factory;
        this.async = asyncFactory;
    }

    var create = new factory();

}).call(this);