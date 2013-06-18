/// <reference path="~/scripts/lib/testing/qunit.js" />
/// <reference path="~/scripts/lib/underscore.js" />

(function () {

    module("Factory library");

    test("Synchronous factory", function () {
        var instance = factory(function () { return new dummyObject(); });

        ok(typeof instance !== undefined, "Instance is created");
        ok(instance.dummyObjectIdentifier !== undefined, "Instance is of expected type");
    });

    asyncTest("Asynchronous factory", 2, function () {
        var instance = asyncFactory(
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
        var instance = asyncFactory(
            function (onDone) {
                setTimeout(function () {
                    instance = new dummyObject();
                }, 50)
            },
            function () {
                ok(typeof instance !== undefined, "Instance is created");
                ok(instance.dummyObjectIdentifier !== undefined, "Instance is of expected type");
                start();
            }
            );
    });

    function dummyObject() {
        this.dummyObjectIdentifier = -1;
    }

    function asyncFactory(creationFunc, doneNotifierFunc) {

        var result = {},
            timeoutInMilliseconds = 1000,
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

    function factory(creationFunc) {
        return creationFunc.call(this);
    }

}).call(this);