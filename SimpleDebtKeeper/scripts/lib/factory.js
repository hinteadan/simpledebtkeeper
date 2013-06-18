(function () {

    function factory() {

        function factory(creationFunc) {
            return creationFunc.call(this);
        }

        function asyncFactory(creationFunc, doneNotifierFunc, millisecondsToTimeout) {

            var result = {},
                timeoutInMilliseconds = millisecondsToTimeout || 30000,
                doneNotifier = wrapDoneNotifierFunc(),
                timeoutId = setTimeout(doneNotifier, timeoutInMilliseconds);

            function wrapDoneNotifierFunc() {
                return function () {
                    clearTimeout(timeoutId);
                    doneNotifierFunc.call(this);
                };
            }

            creationFunc.call(this, doneNotifier);

            return result;
        }

        this.sync = factory;
        this.async = asyncFactory;
    }

    this.Factory = factory;

}).call(this);