/// <reference path="~/scripts/lib/knockout.js" />
/// <reference path="~/scripts/lib/underscore.js" />

(function () {

    var rootScope = this,
        appModels = new AppModel();

    function isFunction(f){
        return typeof f === 'function';
    }

    function DataRepository(initialDataFactory) {

        var data = [];

        function construct() {
            if (isFunction(initialDataFactory)) {
                data = initialDataFactory.call(rootScope);
            }
        };

        this.Add = function (item) {
            data.push(item);
        }

        this.Remove = function (item) {
            for (var index = 0; index < data.length; index++) {
                if (data[index] !== item) {
                    continue;
                }
                data.splice(index, 1);
            }
        }

        this.Query = function () {
            return data;
        }

        this.GroupBy = function (propertyOrFunction) {
            return _(data).groupBy(propertyOrFunction);
        }

        construct();
    }

    function AppModel() {
        this.DebtType = {
            PersonOwesYou: 0,
            YouOwePerson: 1
        };

        this.Debt = function (person, type, amount, reason) {
            this.Person = typeof person !== 'undefined' ? person : null;
            this.Type = typeof type !== 'undefined' ? type : null;
            this.Amount = typeof amount !== 'undefined' ? amount : null;
            this.Reason = typeof reason !== 'undefined' ? reason : null;
        };

        this.DebtGroupSummary = function (person, type, amount) {
            this.Person = typeof person !== 'undefined' ? person : null;
            this.Type = typeof type !== 'undefined' ? type : null;
            this.Amount = typeof amount !== 'undefined' ? amount : null;
        };
    }

    function App(dataRepository) {

        var dataRepository = dataRepository || new DataRepository();

        this.Repository = function () {
            return dataRepository;
        }

        this.SummaryData = function () {
            return _(dataRepository.GroupBy('Person'))
                .map(function (debts, person) {

                    var amountPersonOwesYou = _(debts).reduce(function (sum, debt) {
                        return sum + (debt.Type === appModels.DebtType.PersonOwesYou ? debt.Amount : -debt.Amount)
                    }, 0);

                    return new appModels.DebtGroupSummary(
                        person,
                        amountPersonOwesYou < 0 ? appModels.DebtType.YouOwePerson : appModels.DebtType.PersonOwesYou,
                        amountPersonOwesYou
                        );
                });
        }
    }

    this.App = {
        AppModule: App,
        Model: appModels
    };
    this.DataRepository = DataRepository;

}).call(this);