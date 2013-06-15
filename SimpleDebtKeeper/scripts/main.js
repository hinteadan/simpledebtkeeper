/// <reference path="~/scripts/lib/knockout.js" />
/// <reference path="~/data.js" />
/// <reference path="~/scripts/app.js" />
/// <reference path="~/scripts/SummaryViewModel.js" />

(function () {

    ko.applyBindings(
        new App.SummaryViewModel(
            new App.AppModule(new DataRepository(function () { return DataSet; }))
        )
    );

}).call(this);