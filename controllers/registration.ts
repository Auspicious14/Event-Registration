import { Request, Response } from "express";
import { RegistrationModel } from "../models/registration";
import { sendEmail } from "../middlewares/email";

export const EventRegistration = async (req: Request, res: Response) => {
  const { email } = req.body;
  try {
    const existingEmail = await RegistrationModel.findOne({ email });

    if (existingEmail)
      return res.status(409).json({ error: "Email already exists" });

    const newEmail = new RegistrationModel({ email });
    newEmail.save();

    const text = `<body style="font-family: Arial, sans-serif; line-height: 1.6; margin: 0; padding: 0; background-color: #f5f5f5;">
<div style="max-width: 600px; margin: 0 auto; padding: 20px; background-color: #fff; border-radius: 10px; box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);">
    <h2 style="color: #333; font-size: 24px; margin-top: 20px; text-align: center;">Dear ${newEmail?.email},</h2>

    <p style="color: #666; font-size: 16px; margin-top: 10px;">We are delighted to extend a warm invitation to you for the upcoming two-day conference on <span style="font-weight: bold; color: #007bff;">"Research For Innovation and Commercialization: Our Role as Young Researchers"</span>. </p>
    <p style="color: #666; font-size: 16px; margin-top: 10px;">As a distinguished member of our academic and research community, your presence and insights would be invaluable in enriching the discussions and shaping the outcomes of this significant event.</p>

   <div style="margin-top: 30px; border-top: 2px solid #007bff; padding-top: 20px;">
   <h3 style="color: #007bff; font-size: 20px; margin-bottom: 10px;">Day One</h3>
   <p style="font-size: 16px; margin-top: 8px;"><span style="font-weight: bold; color: #007bff;">Monday, 22nd April, 2024</span></p>
   <p style="font-size: 16px; margin-top: 8px;"><span style="font-weight: bold; color: #007bff;">Time:</span> 10:00 AM</p>
   <p style="font-size: 16px; margin-top: 8px;"><span style="font-weight: bold; color: #007bff;">Venue:</span> University Auditorium Basement</p>
   </div>

   <div style="margin-top: 30px; border-top: 2px solid #007bff; padding-top: 20px;">
   <h3 style="color: #007bff; font-size: 20px; margin-bottom: 10px;">Day Two</h3>
   <p style="font-size: 16px; margin-top: 8px;"><span style="font-weight: bold; color: #007bff;">Tuesday, 23rd April, 2024</span></p>
   <p style="font-size: 16px; margin-top: 8px;"><span style="font-weight: bold; color: #007bff;">Time:</span> 10:00 AM</p>
   <p style="font-size: 16px; margin-top: 8px;"><span style="font-weight: bold; color: #007bff;">Venue:</span> University Auditorium Basement</p>
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
