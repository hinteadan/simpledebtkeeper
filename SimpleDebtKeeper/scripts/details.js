/// <reference path="~/scripts/lib/knockout.js" />
/// <reference path="~/scripts/lib/factory.js" />
/// <reference path="~/data.js" />
/// <reference path="~/scripts/app.js" />
/// <reference path="~/scripts/DetailsViewModel.js" />

(function (create) {

    var url = document.location.href,
        matches = url.match(/[\?&]id=(.+)&?/i),
        personId = matches[1];

    ko.applyBindings(
        new App.DetailsViewModel(
            new App.AppModule(new DataRepository(
                    function () {
                        return create.sync(function () { return DataSet; });
                    }
                )
            ),
            personId
        )
    );

}).call(this, new Factory());