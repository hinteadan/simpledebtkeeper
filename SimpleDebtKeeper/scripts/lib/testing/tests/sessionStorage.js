/// <reference path="~/scripts/lib/testing/qunit.js" />
/// <reference path="~/scripts/lib/SessionRepository.js" />

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

}).call(this);