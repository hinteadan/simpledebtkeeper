(function (ko) {

    function SummaryViewModel(dataRepository) {

        var self = this;

        this.SummaryData = ko.observableArray([]);

        function closeDebtsForPerson(person) {
            dataRepository.closeAllDebtsForPerson(person.Person);
            self.SummaryData(dataRepository.getSummaryData());
        }

        function construct() {

            self.SummaryData(dataRepository.getSummaryData());

        }

        this.closeDebtsForPerson = closeDebtsForPerson;

        construct();

    }

    this.SummaryViewModel = SummaryViewModel;

}).call(this, window.ko);