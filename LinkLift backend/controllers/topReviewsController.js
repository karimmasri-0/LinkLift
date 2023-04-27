const TopReviews = require("../models/topReviewsModel");

exports.addReview = async (req, res) => {
  try {
    await TopReviews.create([
      {
        name: "Sam Fisher",
        isDriver: false,
        comment: '"Very usefull and fun. Recommended! asdadasdssasd"',
        rate: 5,
        image: "https://i.imgur.com/iJDFdiH.jpg",
      },
      {
        name: "Frank Gardner",
        isDriver: false,
        comment: '"Safe and easy to use website."',
        rate: 4,
        image: "https://i.imgur.com/Zvno7g3.png",
      },
      {
        name: "Henry Ford",
        isDriver: true,
        comment: '"Could be improved"',
        rate: 3,
        image: "https://i.imgur.com/Cwueti8.jpg",
      },
      {
        name: "Amir Amiri",
        isDriver: false,
        comment:
          '"The entire process was smooth, convenient, and eco-friendly."',
        rate: 5,
        image: "https://i.imgur.com/Zvno7g3.png",
      },
      {
        name: "Qobuz Listener",
        isDriver: true,
        comment: '"Made my commute much more enjoyable"',
        rate: 4,
        image: "https://i.imgur.com/QpHSCLz.jpeg",
      },
      {
        name: "Don Scott",
        isDriver: true,
        comment:
          '"I highly recommend this carpooling service to anyone looking for a convenient and affordable way to commute."',
        rate: 5,
        image: "https://i.imgur.com/JggwHNI.gif",
      },
      {
        name: "Hanz Andy",
        isDriver: true,
        comment:
          '"I was able to quickly search for and book a ride that suited my schedule."',
        rate: 3,
        image: "https://i.imgur.com/Cwueti8.jpg",
      },
    ]);
    return res
      .status(200)
      .json({ error: false, message: "Reviews Added successfuly." });
  } catch (error) {
    console.log(error);
    return res
      .status(500)
      .json({ error: true, message: "Error occured while adding reviews." });
  }
};
exports.getTopReviews = async (req, res) => {
  try {
    const data = await TopReviews.find();
    if (!data || data.length === 0)
      return res
        .status(204)
        .json({ error: true, message: "Couldn't retreive reviews." });
    return res.status(200).json({
      error: false,
      message: "Reviews retreived successfuly.",
      data,
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ error: true, message: error.message });
  }
};
