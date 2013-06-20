(function () {

    function AppModel() {

        var self = this;

        this.DebtType = {
            PersonOwesYou: 0,
            YouOwePerson: 1
        };

        function Debt() {

            this.Person = '';
            this.Description = '';
            this.Amount = 0;
            this.IsClosed = false;
            this.Type = self.DebtType.PersonOwesYou;

        }

    }

    this.AppModel = new AppModel();

}).call(window);