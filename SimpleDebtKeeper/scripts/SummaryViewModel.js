(function () {

    function SummaryViewModel(dataRepository) {

        var self = this;

        this.SummaryData = ko.observableArray([]);

        function construct() {

            self.SummaryData(dataRepository.getSummaryData());

        }

        construct();

        
    }

    this.SummaryViewModel = SummaryViewModel;

}).call(this);