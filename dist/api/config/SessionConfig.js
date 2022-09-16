"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
//
function createSessionConfig(sessionStore) {
    return {
        secret: process.env.APP_SECRET,
        store: sessionStore,
        //false : prevent useless save operation excuting when db query request incoming
        //true : deprecated
        resave: false,
        //false : prevent stacking empty session objects
        //true : deprecated
        saveUninitialized: false,
    };
}
exports.default = createSessionConfig;
//# sourceMappingURL=SessionConfig.js.map