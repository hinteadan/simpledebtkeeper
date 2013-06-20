/// <reference path="~/scripts/lib/knockout.js" />
/// <reference path="~/scripts/lib/jquery.js" />

(function () {

    ko.applyBindings(new SummaryViewModel(
        new DataRepository()
        ));

}).call(this);