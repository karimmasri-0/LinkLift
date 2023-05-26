const City = require("../models/citiesModel");
const Offer = require("../models/offerModel");
const Driver = require("../models/driverModel");
const User = require("../models/userModel");
const { ObjectId } = require("mongodb");

exports.getOffer = async (req, res) => {
  const passage = [];
  const ride = (await Offer.findOne({ _id: req.query.rideId })).toJSON();
  const departure_city = await City.findOne(
    { Pcode: ride.departure },
    "Location_Name_En Location_Name_Arabic"
  );
  const destination_city = await City.findOne(
    { Pcode: ride.destination },
    "Location_Name_En Location_Name_Arabic"
  );
  for (const Pcode of ride.passage) {
    passage.push(await City.findOne({ Pcode }, "Location_Name_En"));
  }

  const driver = {
    ...(await User.findOne({ _id: ride.posted_by })).toJSON(),
    ...(await Driver.findOne({ user: ride.posted_by })).toJSON(),
  };
  console.log(ride);
  return res.status(200).json({
    seats_available: ride.seats,
    seats_taken: ride.taken_by.length,
    driver,
    distance: ride.distance,
    duration: ride.duration,
    passage,
    destination_city,
    departure_city,
    date: ride.date,
    time: ride.time,
  });
};
exports.getMyOffers = async (req, res) => {
  try {
    const offers = [];
    const driver = await Driver.findOne({ user: req.user._id });
    console.log(driver);
    const cursor = Offer.find({ posted_by: req.user._id }).cursor();
    cursor
      .eachAsync(async (offer) => {
        const departure_city = await City.findOne(
          { Pcode: offer.departure },
          "Location_Name_En Location_Name_Arabic"
        );
        const destination_city = await City.findOne(
          { Pcode: offer.destination },
          "Location_Name_En Location_Name_Arabic"
        );
        const testOffer = {
          departure_city: departure_city,
          destination_city: destination_city,
          seats_taken: offer.taken_by.length,
          date: offer.date,
          time: offer.time,
          _id: offer._id,
        };
        console.log(offer);
        offers.push(testOffer);
      })
      .then(() => {
        return res.status(200).json({ driver, offers, message: "ok" });
      })
      .catch((error) => {
        console.log(error);
        return res.status(500).json({ error });
      });
  } catch (error) {
    return res.status(500).json({ error });
  }
};

exports.getOffers = async (req, res) => {
  try {
    const offers = [];

    const cursor = Offer.find({}).cursor();
    cursor
      .eachAsync(async (offer) => {
        const departure_city = await City.findOne(
          { Pcode: offer.departure },
          "Location_Name_En Location_Name_Arabic"
        );
        const destination_city = await City.findOne(
          { Pcode: offer.destination },
          "Location_Name_En Location_Name_Arabic"
        );
        const driver = {
          ...(await User.findOne({ _id: offer.posted_by })).toJSON(),
          ...(await Driver.findOne({ user: offer.posted_by })).toJSON(),
        };
        const testOffer = {
          departure_city: departure_city,
          destination_city: destination_city,
          date: offer.date,
          time: offer.time,
          _id: offer._id,
          driver,
        };
        console.log(offer);

        offers.push(testOffer);
      })
      .then(() => {
        return res.status(200).json({ offers, message: "ok" });
      })
      .catch((error) => {
        console.log(error);
        return res.status(500).json({ error });
      });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ error: error });
  }
};

exports.bookRide = async (req, res) => {
  try {
    const offer = (await Offer.findOne({ _id: req.body.rideId })).toJSON();
    console.log(offer);
    if (offer.taken_by.length < offer.seats) {
      if (!offer.taken_by.find((id) => id.equals(req.user._id))) {
        const new_taken_by = {
          taken_by: [...offer.taken_by, req.user._id],
        };
        console.log(new_taken_by);
        const new_offer = await Offer.findOneAndUpdate(
          { _id: req.body.rideId },
          new_taken_by,
          {
            new: true,
          }
        );
        return res.status(200).json({
          message: "Seat booked.",
          data: {
            seats_available: new_offer.seats,
            seats_taken: new_offer.taken_by.length,
          },
        });
      } else {
        return res
          .status(400)
          .json({ message: "A seat is already booked for you." });
      }
    } else {
      return res.status(400).json({ message: "Out of seats." });
    }
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: error });
  }
};
