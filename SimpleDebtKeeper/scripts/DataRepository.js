(function () {

    function DataRepository() {

        var data = []

        function getSummaryData() {

            var groupedData = _.groupBy(_.where(data, {IsClosed: false}), 'Person');

            return _.map(groupedData, function (debts, key) {
                return {
                    Person: key,
                    Amount: _.reduce(debts, function (sum, d) {
                        return sum +
                            (d.Type === AppModel.DebtType.PersonOwesYou
                            ? d.Amount
                            : -d.Amount);
                    }, 0)
                };
            });

        }

        function construct() {

            data = _.map(Data, function (d) {
                var debt = new AppModel.Debt();
                debt.Amount = d.Amount;
                debt.Description = d.Description;
                debt.IsClosed = d.IsClosed;
                debt.Person = d.Person;
                debt.Type = d.Type;
                return debt;
            });

        }

        this.getSummaryData = getSummaryData;

        construct();
    }

    this.DataRepository = DataRepository;

}).call(this);