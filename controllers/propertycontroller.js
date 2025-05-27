const PROPERTY = require("../models/property");

const createProperty = async (req, res) => {
  res.send("create property");
};
const getLandlordsProperties = async (req, res) => {
  res.send("get landlords property");
};

const updatePropertyAvaliability = async (req, res) => {
  res.send("update avaliablity");
};
const getAllproperties = async (req, res) => {
  const { page = 1, location } = req.query;
  const limit = 12;
  const skip = (page - 1) * limit;
  try {
    const filter = {
      availability: "available",
    };
    if (location) {
      filter.location = { $regex: location, $options: "i" };
    }
    const properties = await PROPERTY.find(filter)
      .sort("-createdAt")
      .skip(skip)
      .limit(limit);

    const totalProperties = await PROPERTY.countDocuments(filter);
    const totalPages = Math.ceil(totalProperties / limit);

    res
      .status(200)
      .json({ num: totalPages, currentPage: parseInt(page), properties });
    res.status(200).json({ num: properties.length, properties });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: error.message });
  }
};
const getAproperty = async (req, res) => {
  res.send("get a property");
};

module.exports = {
  createProperty,
  getLandlordsProperties,
  updatePropertyAvaliability,
  getAllproperties,
  getAproperty,
};
