const { default: axios } = require("axios");
const City = require("../models/citiesModel");
const Offer = require("../models/offerModel");
// const jsonwebtoken = require("jsonwebtoken");
// const { promisify } = require("util");
// const { ObjectId } = require("mongodb");

// const decodeToken = async (token) => {
//   try {
//     const decoded = await promisify(jsonwebtoken.verify)(
//       token,
//       process.env.JWT_SECRET
//     );
//     return new ObjectId(decoded.id);
//   } catch (error) {
//     console.log(error);
//   }
// };

exports.getCities = async (req, res) => {
  try {
    const cities = await City.find(
      {
        $or: [
          { Location_Name_En: { $regex: req.query.text, $options: "i" } },
          { Location_Name_Arabic: { $regex: req.query.text, $options: "i" } },
        ],
      },
      "Pcode Location_Name_En Location_Name_Arabic Latitude Longitude"
    );
    if (cities) return res.status(200).json({ data: cities });
    res.status(500).json({ message: error.message });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: error.message });
  }
};
exports.publishRide = async (req, res) => {
  console.log("/////////////////////////////////////////////////////////////");
  try {
    console.log(
      "***********************************",
      req.body,
      "***********************************"
    );
    const passage = req.body.passage;
    passage.unshift(req.body.departure);
    passage.push(req.body.destination);
    const offer = { luggage: {} };
    console.log(passage);
    let totalDistance = 0;
    let totalDuration = 0;
    for (i = 0; i < passage.length - 1; i++) {
      let firstPassage = (
        await City.findOne({ Pcode: passage[i] }, "Longitude Latitude")
      ).toObject();
      let secondPassage = (
        await City.findOne({ Pcode: passage[i + 1] }, "Longitude Latitude")
      ).toObject();

      const resp = await axios.get(
        `https://api.openrouteservice.org/v2/directions/driving-car?api_key=${process.env.OPEN_ROUTE_APIKEY}&start=${firstPassage.Longitude},${firstPassage.Latitude}&end=${secondPassage.Longitude},${secondPassage.Latitude}`
      );

      totalDistance += resp.data.features[0].properties.summary.distance;
      totalDuration += resp.data.features[0].properties.summary.duration;
    }
    console.log("totalDistance: ", totalDistance);
    console.log("totalDuration: ", totalDuration);
    offer.posted_by = req.user._id;
    offer.departure = req.body.departure;
    offer.destination = req.body.destination;
    offer.passage = passage;
    offer.seats = req.body.seats;
    offer.luggage_size == req.body.luggage_size;
    offer.luggage_number = req.body.luggage_number;
    offer.duration = totalDuration;
    offer.distance = totalDistance;
    offer.date = req.body.formatedDate;
    offer.time = req.body.formatedTime;
    const result = await Offer.create({ ...offer });
    return res.status(200).json({
      _id: result._id,
      message: "success",
      distance: totalDistance,
      duration: totalDuration,
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ error });
  }
};
