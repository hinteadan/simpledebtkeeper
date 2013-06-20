(function () {

    var dataRepository;

    module("DataRepository", {
        setup: function () {
            dataRepository = new DataRepository();
        }
    });

    test("Summary data", function () {

        var summaryData = dataRepository.getSummaryData();

        ok(summaryData.length === 2);
        ok(summaryData[0].Amount === 30);
        ok(summaryData[1].Amount === -25);

    });

}).call(this);