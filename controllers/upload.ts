import { Request, Response } from "express";
import { mapFiles } from "../middlewares/upload";
import { UploadModel } from "../models/upload";

export const UploadFile = async (req: Request, res: Response) => {
  const { files } = req.body;

  try {
    const upload = await mapFiles(files);
    if (!upload)
      return res.status(400).json({ error: "Error converting image" });
    const image = new UploadModel({ image: upload });
    image.save();
    res.status(200).json({ data: image });
  } catch (error) {
    res.status(400).json({ error });
  }
};
