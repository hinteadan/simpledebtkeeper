﻿/// <reference path="~/scripts/lib/testing/qunit.js" />
/// <reference path="~/scripts/lib/underscore.js" />
/// <reference path="~/scripts/app.js" />

(function () {

    var appWithEmptyRepository,
        appWithSomeRepository;

    module("Debts Basic Operations", {
        setup: function () {
            appWithEmptyRepository = new App.AppModule();
            appWithSomeRepository = new App.AppModule(new DataRepository(function () {
                return [new App.Model.Debt()];
            }));
        }
    });

    test("View current debts when no debts", function () {
        var debts = appWithEmptyRepository.Repository().Query();
        ok(debts.length === 0, "OK, debts are empty");
    });

    test("View current debts when some debts exist", function () {
        var debts = appWithSomeRepository.Repository().Query();
        ok(debts.length > 0, "OK, we have some debts");
    });

    test("A debt has all mandatory properties", function () {
        var debt = appWithSomeRepository.Repository().Query()[0];
        ok(typeof debt.Type !== 'undefined', "Has Type property");
        ok(typeof debt.Person !== 'undefined', "Has Person property");
        ok(typeof debt.Amount !== 'undefined', "Has Amount property");
        ok(typeof debt.Reason !== 'undefined', "Has Reason property");
    });

    test("Debts for person", function () {
        var repo = appWithEmptyRepository.Repository(),
            debts = [];

        repo.Add(new App.Model.Debt("Ioana", App.Model.DebtType.PersonOwesYou, 10, "Test"));
        repo.Add(new App.Model.Debt("Ioana", App.Model.DebtType.PersonOwesYou, 10, "Test"));
        repo.Add(new App.Model.Debt("Iulian", App.Model.DebtType.PersonOwesYou, 10, "Test"));
        debts = repo.Query({ Person: "Ioana" });
        ok(debts.length === 2);
    });

    test("Add", function () {
        var debts = appWithEmptyRepository.Repository().Query();
        ok(debts.length === 0, "No debts at start");
        appWithEmptyRepository.Repository().Add(
            new App.Model.Debt("Dan", App.Model.DebtType.PersonOwesYou, 10, "Test")
            );
        ok(debts.length === 1, "New debt added");
        ok(debts[0].Person === "Dan");
        ok(debts[0].Amount === 10);
        ok(debts[0].Reason === "Test");
        ok(debts[0].Type === App.Model.DebtType.PersonOwesYou);
    });

    test("Delete", function () {
        var debts = appWithSomeRepository.Repository().Query(),
            debtToDelete = debts[0];

        ok(debts.length > 0, "Some debts at start");
        appWithSomeRepository.Repository().Remove(debtToDelete);
        ok(!_(debts).contains(debtToDelete));
    });

    test("Edit", function () {
        var debts = appWithSomeRepository.Repository().Query(),
            debtToEdit = debts[0];

        ok(debts.length > 0, "Some debts at start");
        debtToEdit.Person = "Some other person";
        debtToEdit.Amount = 666;
        debtToEdit.Reason = "Edit test";
        ok(debtToEdit.Person === "Some other person");
        ok(debtToEdit.Amount === 666);
        ok(debtToEdit.Reason === "Edit test");
    });

}).call(this);