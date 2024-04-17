import { Request, Response } from "express";
import { RegistrationModel } from "../models/registration";
import { sendEmail } from "../middlewares/email";

export const EventRegistration = async (req: Request, res: Response) => {
  const { email, phoneNumber, workshopEvent } = req.body;
  try {
    const existingEmail = await RegistrationModel.findOne({ email });
    const existingPhoneNumber = await RegistrationModel.findOne({
      phoneNumber,
    });

    if (existingEmail)
      return res
        .status(409)
        .json({ error: "Email already used for registration" });

    if (existingPhoneNumber)
      return res
        .status(409)
        .json({ error: "Phone Numeber already used for registration" });

    const newEmail = new RegistrationModel({
      email,
      phoneNumber,
      workshopEvent,
    });
    newEmail.save();

    const text = `<body style="font-family: Arial, sans-serif; line-height: 1.6; margin: 0; padding: 0; background-color: #f5f5f5;">
<div style="max-width: 600px; margin: 0 auto; padding: 20px; background-color: #fff; border-radius: 10px; box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);">
    <h2 style="color: #333; font-size: 24px; margin-top: 20px; text-align: center;">Dear ${newEmail?.email},</h2>

    <p style="color: #666; font-size: 16px; margin-top: 10px;">We are delighted to extend a warm invitation to you for the upcoming two-day conference on <span style="font-weight: bold; color: #007bff;">"Research For Innovation and Commercialization: Our Role as Young Researchers"</span>. </p>
    <p style="color: #666; font-size: 16px; margin-top: 10px;">As a distinguished member of our academic and research community, your presence and insights would be invaluable in enriching the discussions and shaping the outcomes of this significant event.</p>

    <div style="margin-top: 30px; border-top: 2px solid #007bff; padding-top: 20px;">
  <h3 style="color: #007bff; font-size: 20px; margin-bottom: 10px;">Day One</h3>
  <p style="font-size: 16px; margin-top: 8px;">Date: <span style="font-weight: bold; color: #007bff;">Monday, 22nd April, 2024</span></p>
  <p style="font-size: 16px; margin-top: 8px;">Time: <span style="font-weight: bold; color: #007bff;">10:00 AM</span> </p>
  <p style="font-size: 16px; margin-top: 8px;">Venue: <span style="font-weight: bold; color: #007bff;"> University Auditorium Basement</span></p>
  </div>

     <div style="margin-top: 30px; border-top: 2px solid #007bff; padding-top: 20px;">
   <h3 style="color: #007bff; font-size: 20px; margin-bottom: 10px;">Day Two</h3>
   <p style="font-size: 16px; margin-top: 8px;">Topic: <span style="font-weight: bold; color: #007bff;">${newEmail?.workshopEvent}</span></p>
   <p style="font-size: 16px; margin-top: 8px;">Date: <span style="font-weight: bold; color: #007bff;">Tuesday, 23rd April, 2024</span></p>
   <p style="font-size: 16px; margin-top: 8px;">Time: <span style="font-weight: bold; color: #007bff;">10:00 AM</span></p>
   <p style="font-size: 16px; margin-top: 8px;">Venue: <span style="font-weight: bold; color: #007bff;">University Auditorium Basement</span> </p>
   </div>

</div>
</body>`;
    const subject =
      "Invitation to Research For Innovation and Commercialization Conference";
    const sendMail = await sendEmail(newEmail.email, subject, text);

    if (!sendMail) {
      res.status(400).json({ error: "Error sending Email" });
    }
    res.status(200).json("An invite has been sent to your mail");
  } catch (error) {
    res.json({ error });
  }
};

export const getAllAttendees = async (req: Request, res: Response) => {
  try {
    const attendees = await RegistrationModel.find();
    return res
      .status(200)
      .json({ data: attendees, totalRecords: attendees?.length });
  } catch (error) {
    res.status(400).json({ error });
  }
};

export const getAllAttendeesByEvent = async (req: Request, res: Response) => {
  try {
    const AIAttendees = await RegistrationModel.find({
      workshopEvent: "AI Tools for Research",
    });
    const StatisticalAttendees = await RegistrationModel.find({
      workshopEvent: "Statistical Tools for Research",
    });

    return res.status(200).json({
      ai: {
        AIAttendees,
        totalRecords: AIAttendees?.length,
      },
      statistical: {
        StatisticalAttendees,
        totalRecords: StatisticalAttendees?.length,
      },
    });
  } catch (error) {
    res.status(400).json({ error });
  }
};
