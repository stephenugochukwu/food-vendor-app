import express, { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";
const secret = process.env.JWT_SECRET as string;
import { UserInstance } from "../models/users";
import { VendorsInstance } from "../models/vendors";
import { AdminInstance } from "../models/admin";

export async function authUser(
  req: Request | any,
  res: Response,
  next: NextFunction
) {
  try {
    const auth = req.headers.authorization;
    if (!auth) {
      res.status(401).json({
        Error: "Kindly login from the user login page",
      });
    }
    const token = auth.slice(7, auth.length);
    let verified = jwt.verify(token, secret);

    if (!verified) {
      return res.status(401).json({
        Error: "User verification failed, access denied",
      });
    }
    const { id } = verified as { [key: string]: string };

    const user = await UserInstance.findOne({ where: { id } });

    if (!user) {
      return res.status(404).json({
        Error: "User verification failed",
      });
    }

    req.user = verified;
    next();
  } catch (error) {
    console.log(error);

    res.status(403).json({
      error,
      Error: "You are not logged in",
    });
  }
}

export async function authAdmin(
  req: Request | any,
  res: Response,
  next: NextFunction
) {
  try {
    const auth = req.headers.authorization;
    if (!auth) {
      res.status(401).json({
        Error: "Kindly login from the Admin login page",
      });
    }
    const token = auth.slice(7, auth.length);
    let verified = jwt.verify(token, secret);

    if (!verified) {
      return res.status(401).json({
        Error: "Admin verification failed, access denied",
      });
    }
    const { id } = verified as { [key: string]: string };

    const admin = await AdminInstance.findOne({ where: { id } });

    if (!admin) {
      return res.status(404).json({
        Error: "Admin verification failed",
      });
    }

    req.admin = verified;
    next();
  } catch (error) {
    console.log(error);

    res.status(403).json({
      error,
      Error: "You are not logged in",
    });
  }
}

export async function authVendor(
  req: Request | any,
  res: Response,
  next: NextFunction
) {
  try {
    const auth = req.headers.authorization;
    if (!auth) {
     return res.status(401).json({
        Error: "Kindly login from the vendor login page",
      });
    }

    const token = auth.slice(7, auth.length);
    let verified = jwt.verify(token, secret);

    if (!verified) {
      return res.status(401).json({
        Error: "Verification failed, access denied",
      });
    }

    const { id } = verified as { [key: string]: string };

    const vendor = await VendorsInstance.findOne({ where: { id } });

    if (!vendor) {
      return res.status(404).json({
        Error: "Vendor verification failed",
      });
    }

    req.vendor = verified;
    next();
  } catch (error) {
    console.log(error);

    res.status(403).json({
      error,
      Error: "You are not logged in",
    });
  }
}
