import * as jwt from "jsonwebtoken";
import * as core from "@actions/core";

async function run() {
  try {
    // `who-to-greet` input defined in action metadata file
    const private_key: string = process.env.GH_APP_SECRET!;
    const iss: string = core.getInput("github-app-id");
    const time: number = Math.floor(Date.now() / 1000);

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
  } catch (error: any) {
    core.setFailed(error.message);
  }
}

run();
