import sendMail from "../utils/sendMail.js";

export const createOrder = async (req, res) => {
  try {

    const {
      name,
      company,
      email,
      phone,
      website,
      country,
      service,
      packageName,
      meetingDate,
      meetingTime,
      message,
    } = req.body;

   

    if (!name || !email || !service || !packageName) {
      return res.status(400).json({
        success: false,
        message: "Required fields are missing.",
      });
    }

    await sendMail({
      name,
      company,
      email,
      phone,
      website,
      country,
      service,
      packageName,
      meetingDate,
      meetingTime,
      message,
    });

    res.status(200).json({
      success: true,
      message: "Order submitted successfully.",
    });
  } catch (error) {
    console.error(error);

    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};