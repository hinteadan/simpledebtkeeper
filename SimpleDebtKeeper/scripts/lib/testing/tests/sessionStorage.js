/// <reference path="~/scripts/lib/testing/qunit.js" />

(function () {

    module("Session Storage");

    test("Store", function () {
        var data = [{ Id: 1, Name: "Test" }],
            sessionRepository = new SessionRepository();

        sessionRepository.Save(data);

        ok(sessionRepository.Fetch().length === 1);
        ok(sessionRepository.Fetch()[0].Id === 1);
        ok(sessionRepository.Fetch()[0].Name === "Test");
    });

    function SessionRepository(key) {

        var key = key || "Repository";

        function Save(data) {
            sessionStorage[key] = JSON.stringify(data);
        }

        function Fetch() {
            return JSON.parse(sessionStorage[key]);
        }

        function construct() {
            store = sessionStorage[key] = "";
        }

        this.Save = Save;
        this.Fetch = Fetch;

        construct();
    }

}).call(this);