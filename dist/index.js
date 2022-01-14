"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    Object.defineProperty(o, k2, { enumerable: true, get: function() { return m[k]; } });
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
Object.defineProperty(exports, "__esModule", { value: true });
const jwt = __importStar(require("jsonwebtoken"));
const core = __importStar(require("@actions/core"));
try {
    // `who-to-greet` input defined in action metadata file
    const private_key = process.env.GH_APP_SECRET;
    const iss = core.getInput("github-app-id");
    const time = Math.floor(Date.now() / 1000);
    const payload = {
        //# issued at time, 60 seconds in the past to allow for clock drift
        iat: time - 60,
        //# JWT expiration time (10 minute maximum)
        exp: time + 600,
        //# GitHub App's identifier
        iss,
    };
    const jwt_token = jwt.sign(payload, private_key, { algorithm: "RS256" });
    core.setOutput("jwt-token", jwt_token);
}
catch (error) {
    core.setFailed(error.message);
}
//# sourceMappingURL=index.js.map