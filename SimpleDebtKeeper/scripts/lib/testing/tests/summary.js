/// <reference path="~/scripts/lib/testing/qunit.js" />
/// <reference path="~/scripts/lib/underscore.js" />
/// <reference path="~/scripts/app.js" />

(function () {

    var app;

    module("Summary Screen", {
        setup: function () {
            app = new App.AppModule(new DataRepository(function () {
                return [
                    new App.Model.Debt("Ioana", App.Model.DebtType.PersonOwesYou, 100),
                    new App.Model.Debt("Ioana", App.Model.DebtType.PersonOwesYou, 50),
                    new App.Model.Debt("Ioana", App.Model.DebtType.YouOwePerson, 30),
                    new App.Model.Debt("Iulian", App.Model.DebtType.PersonOwesYou, 30),
                    new App.Model.Debt("Iulian", App.Model.DebtType.YouOwePerson, 5),
                ];
            }));
        }
    });

    test("Summary grouped by person", function () {

        var group = app.Repository().GroupBy('Person');

        ok(group.Ioana.length === 3);
        ok(group.Iulian.length === 2);
        ok(typeof group["asdads"] === 'undefined');

    });

}).call(this);