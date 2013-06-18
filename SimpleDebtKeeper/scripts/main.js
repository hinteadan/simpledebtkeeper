/// <reference path="~/scripts/lib/knockout.js" />
/// <reference path="~/scripts/lib/factory.js" />
/// <reference path="~/data.js" />
/// <reference path="~/scripts/app.js" />
/// <reference path="~/scripts/SummaryViewModel.js" />

(function (create) {

    ko.applyBindings(
        new App.SummaryViewModel(
            new App.AppModule(new DataRepository(
                create.sync(function () { return DataSet; }))
            )
        )
    );

}).call(this, new Factory());