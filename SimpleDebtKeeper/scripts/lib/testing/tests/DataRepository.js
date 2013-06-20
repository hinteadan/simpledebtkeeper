(function () {

    var dataRepository;

    module("DataRepository", {
        setup: function () {
            dataRepository = new DataRepository();
        }
    });

    test("Summary data", function () {

        var summaryData = dataRepository.getSummaryData();

        ok(summaryData.length === 3);
        ok(summaryData[0].Amount === 30);
        ok(summaryData[1].Amount === -25);

    });

    test("Close Debts", function () {

        dataRepository.closeAllDebtsForPerson("Dan");

        var danDebts = _.where(dataRepository.Data(), { Person: "Dan" });

        ok(danDebts.length === 1);
        ok(_.every(danDebts, { IsClosed: true }));
    });

}).call(this);