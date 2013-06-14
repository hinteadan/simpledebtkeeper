/// <reference path="~/scripts/lib/testing/qunit.js" />

(function () {

    module("Debts Basic Operations");

    test("View current debts when no debts", function () {
        var debts = getCurrentDebts();
        ok(debts.length === 0, "OK, debts are empty");
    });

    test("View current debts when some debts exist", function () {
        var debts = getCurrentDebts(function () { return [1]; });
        ok(debts.length > 0, "OK, we have some debts");
    });

    function getCurrentDebts(debtsFactory) {
        return typeof debtsFactory === "function" ? debtsFactory.call(this) : [];
    }

}).call(this);