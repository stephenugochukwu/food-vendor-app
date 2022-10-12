import express, { Request, Response, NextFunction } from "express";
import { v4 as uuidv4 } from "uuid";
import {
  registerSchema,
  options,
  loginSchema,
  generateToken,
  makeOrderSchema,
  feedbackSchema,
} from "../utils/utils";
import { UserInstance } from "../models/users";
import bcrypt from "bcryptjs";
import { MenuInstance } from "../models/menu";
import { OrderInstance } from "../models/orders";

export async function RegisterUser(
  req: Request,
  res: Response,
  next: NextFunction
) {
  const id = uuidv4();
  try {
    const validationResult = registerSchema.validate(req.body, options);
    if (validationResult.error) {
      return res.status(400).json({
        Error: validationResult.error.details[0].message,
      });
    }
    const duplicatEmail = await UserInstance.findOne({
      where: { email: req.body.email },
    });
    if (duplicatEmail) {
      return res.status(409).json({
        msg: "Email is used, please enter another email",
      });
    }

    const duplicatePhone = await UserInstance.findOne({
      where: { phoneNumber: req.body.phoneNumber },
    });

    if (duplicatePhone) {
      return res.status(409).json({
        msg: "Phone number is used",
      });
    }
    const passwordHash = await bcrypt.hash(req.body.password, 8);
    const record = await UserInstance.create({
      id: id,
      fullName: req.body.fullName,
      email: req.body.email,
      phoneNumber: req.body.phoneNumber,
      password: passwordHash,
    });
    res.status(201).json({
      msg: "You have successfully registered",
      record: record,
    });
  } catch (err) {
    res.status(500).json({
      msg: "failed to register",
      route: "/register",
    });
  }
}

export async function LoginUser(
  req: Request,
  res: Response,
  next: NextFunction
) {
  const id = uuidv4();
  try {
    const validationResult = loginSchema.validate(req.body, options);
    if (validationResult.error) {
      return res.status(400).json({
        Error: validationResult.error.details[0].message,
      });
    }
    const User = (await UserInstance.findOne({
      where: { email: req.body.email },
    })) as unknown as { [key: string]: string };

    const { id } = User;
    const token = generateToken({ id });
    const validUser = await bcrypt.compare(req.body.password, User.password);

    if (!validUser) {
      res.status(401).json({
        message: "Password do not match",
      });
    }

    if (validUser) {
      res.cookie("authorization", token, {
        httpOnly: true,
        maxAge: 1000 * 60 * 60 * 24,
      });
      res.cookie("id", id, {
        httpOnly: true,
        maxAge: 1000 * 60 * 60 * 24,
      });
      res.status(201).json({
        message: "Successfully logged in",
        token,
        User,
      });
    }
  } catch (err) {
    console.log(err);

    res.status(500).json({
      msg: "failed to login",
      route: "/login",
    });
  }
}

export async function getAllMenu(
  req: Request,
  res: Response,
  next: NextFunction
) {
  try {
    const record = await MenuInstance.findAll({});

    res.status(200).json({
      record: record,
    });
  } catch (err) {
    res.status(500).json({
      err: console.log(err),
      msg: "failed to get record",
      route: "/login",
    });
  }
}

export async function MakeOrders(
  req: Request | any,
  res: Response,
  next: NextFunction
) {
  const id = uuidv4();
  try {
    const userId = req.cookies.id;
    const verified = req.user;
    const validationResult = makeOrderSchema.validate(req.body, options);
    if (validationResult.error) {
      return res.status(400).json({
        Error: validationResult.error.details[0].message,
      });
    }
    const record = await OrderInstance.create({
      id: id,
      userId: req.body.userId,
      foodId: req.body.foodId,
      vendorId: req.body.vendorId,
      comments: req.body.comments,
      orderStatus: "active",
      orderDate: new Date(Date.now()),
    });

    res.status(201).json({
      msg: "You have successfully added a food to the menu",
      record: record,
    });
  } catch (err) {
    res.status(500).json({
      msg: "failed to create",
      route: "/addfoodtomenu",
    });
  }
}

export async function getOrders(
  req: Request,
  res: Response,
  next: NextFunction
) {
  try {
    //const userId = req.cookies.id;
    const userId = req.params.id;
    const record = (await UserInstance.findOne({
      where: { id: userId },
      include: [{ model: OrderInstance, as: "orders" }],
    })) as unknown as { [key: string]: string };

    res.status(200).json({
      record: record,
    });
  } catch (err) {
    res.status(500).json({
      err: console.log(err),
      msg: "failed to get record",
      route: "/login",
    });
  }
}

export async function getOneMealDetail(
  req: Request | any,
  res: Response,
  next: NextFunction
) {
  try {
    const mealId = req.params.id;
    const record = await MenuInstance.findOne({
      where: { id: mealId },
    });
    if (!record) {
      return res.status(404).json({
        msg: "Meal not found",
      });
    }

    res.status(200).json({
      record: record,
    });
  } catch (err) {
    res.status(500).json({
      err: console.log(err),
      msg: "No record found",
      route: "/getameal",
    });
  }
}

export async function giveFeedback(
  req: Request,
  res: Response,
  next: NextFunction
) {
  try {
    const { id } = req.params;
    const { comments } = req.body;
    const validationResult = feedbackSchema.validate(req.body, options);
    if (validationResult.error) {
      return res.status(400).json({
        Error: validationResult.error.details[0].message,
      });
    }

    const record = await OrderInstance.findOne({ where: { id } });
    if (!record) {
      return res.status(404).json({
        Error: "This order is no longer available",
      });
    }
    const updatedrecord = await record.update({
      comments: comments,
    });
    res.status(201).json({
      message: "Thank you for your feedback. We care more about you",
      feedback: updatedrecord,
    });
  } catch {
    res.status(500).json({
      err: Error,
      msg: "You cannot give a feedback at this moment",
      route: "/feedback",
    });
  }
}

export async function getOneOrderDetail(
  req: Request | any,
  res: Response,
  next: NextFunction
) {
  try {
    const orderId = req.params.id;
    const record = await OrderInstance.findOne({
      where: { id: orderId },
    });

    res.status(200).json({
      record: record,
    });
  } catch (err) {
    res.status(500).json({
      err: console.log(err),
      msg: "No record found",
      route: "/getAnOrder",
    });
  }
}
