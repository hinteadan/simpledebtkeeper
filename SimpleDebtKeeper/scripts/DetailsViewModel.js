/// <reference path="~/scripts/lib/knockout.js" />
/// <reference path="~/scripts/app.js" />

(function () {

    function DetailsViewModel(appModule, personId) {

        var personDebts = appModule.Repository().Query({ Person: personId });


        this.Debts = ko.observableArray(personDebts);

    }

    this.App = this.App || {};
    this.App.DetailsViewModel = DetailsViewModel;

}).call(this);