/// <reference path="~/scripts/lib/knockout.js" />

(function () {

    var rootScope = this;

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
    }

    function App(dataRepository) {

        var dataRepository = dataRepository || new DataRepository();

        this.Repository = function () {
            return dataRepository;
        }
    }

    this.App = {
        AppModule: App,
        Model: new AppModel()
    };
    this.DataRepository = DataRepository;

}).call(this);