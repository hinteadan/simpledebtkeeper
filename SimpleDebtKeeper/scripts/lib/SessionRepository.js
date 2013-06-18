(function () {

    function SessionRepository(key) {

        var key = key || "Repository";

        function Save(data) {
            sessionStorage[key] = JSON.stringify(data);
        }

        function Fetch() {
            if (!sessionStorage[key]) {
                return null;
            }
            return JSON.parse(sessionStorage[key]);
        }

        function construct() {
            store = sessionStorage[key] = "";
        }

        this.Save = Save;
        this.Fetch = Fetch;

        construct();
    }

    this.SessionRepository = SessionRepository;

}).call(this);