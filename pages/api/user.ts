import type { NextApiRequest, NextApiResponse } from "next";
import Cookies from "universal-cookie";

export default (req: NextApiRequest, res: NextApiResponse) => {
  const password = req?.body;

  const validate = (password: any) => {
    let errors: string[] = [];

    if (typeof password !== "string") {
      errors.push("the request body was not of type string");
    }
    if (typeof password === "string" && password?.length < 5) {
      ("the proved passwordword is to small, it must be at least 5 characters long ");
    }

    return errors;
  };

  const errors = validate(password);

  if (password && errors.length < 1) {
    res.setHeader(
      "set-cookie",
      `onboarding_auth=${password}; path=/; samesite=lax; httponly;`
    );

    res.status(200);
    res.end();
  } else {
    console.log("errors", errors);
    res.status(400).json(`there where errors: ${errors}`);
  }
};
