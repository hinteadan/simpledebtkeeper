/// <reference path="~/scripts/lib/knockout.js" />
/// <reference path="~/scripts/app.js" />

(function () {

    function SummaryViewModel(appModule) {

        var summaryData = ko.observableArray();

        this.SummaryData = summaryData;

        function construct() {
            summaryData(appModule.SummaryData());
        }

        construct();
    }

    this.App = this.App || {};
    this.App.SummaryViewModel = SummaryViewModel;

}).call(this);