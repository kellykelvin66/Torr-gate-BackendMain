const PROPERTY = require("../models/property");

const createProperty = async (req, res) => {
  res.send("create property");
};
const getLandlordsProperties = async (req, res) => {
     const {userid} = req.body
     const {page = 1} = req.query;
      const limit  = 5
      const skip = (page - 1) * limit;
           try {
            const properties = await PROPERTY.find({ landlord: userid })
            .sort("-createdAt").skip(skip).limit(limit);

            const [total, avaliableProperties, rentedProperties] = await Promise.all([
                PROPERTY.countDocuments({ landlord: userid }),
                PROPERTY.countDocuments({ landlord: userid, availability: "available" }),
                PROPERTY.countDocuments({ landlord: userid, availability: "rented" }),
            ]);

          
            const totalPages = Math.ceil(total / limit);

            res.status(200).json({ 
              total, 
              avaliableProperties,
               rentedProperties, 
               currentPage: parseInt(page), 
               totalPages,
                properties });
           } catch (error) {
               console.log(error);
               res.status(500).json({ message: error.message });
            
           }
    };

const updatePropertyAvaliability = async (req, res) => {
  const {propertyid} = req.params;
  const { availability } = req.body;
  if(! availability){
    return  res.status(400).json({ message: "Please provide the availability" });
  }
  try {
    const property = await PROPERTY.findById(propertyid);
    property.availablity = availability;
    await property.save();
    res.status(200).json({ success: true, message: "Property  updated successfully",
      property,
     });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: error.message });
  }
};
const getAllproperties = async (req, res) => {
  const { page = 1, location, budget, type } = req.query;
  const limit = 12;
  const skip = (page - 1) * limit;
  try {
    const filter = {
      availability: "available",
    };
    if (location) {
      filter.location = { $regex: location, $options: "i" };
    }
    if (budget) {
      filter.price = { $lte : parseInt(budget) };
    }
    if (type){
      filter.title = { $regex: type, $options: "i" };
    }
    const properties = await PROPERTY.find(filter)
      .sort("-createdAt")
      .skip(skip)
      .limit(limit);

    const totalProperties = await PROPERTY.countDocuments(filter);
    const totalPages = Math.ceil(totalProperties / limit);

    res
      .status(200)
      .json({ num: totalPages, currentPage: parseInt(page), properties, totalProperties});
   
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: error.message });
  }
};
const getAproperty = async (req, res) => {
  try{
   
    const property = await PROPERTY.findById(property._id).populate(
      "landlord",
      "fullName profilePicture email phoneNumber"
  );
  if (!property) {
    return res.status(404).json({ message: "Property not found" });
  }
  // more from landlord

  const moreFromLandlord = await PROPERTY.find({
    landlord: property.landlord._id,
    _id: { $ne: property._id },
    availability: "available"
  })
   .limit(3)
  .sort("-createdAt")
   // similar price range 20% location
     const priceRange = property.price * 0.2;
     const similarProperties = await PROPERTY.find({
      _id: { $ne: property._id },
      availablity: "available",
      price: {
        $gte: property.price - priceRange,
        $lte: property.price + priceRange,
      },
      location : property.location,
     }); limit(3).sort("_createdAt")

      res.status(200).json({ property})
    
  } catch (error){
    console.error(error)
    res.status(500).json({message: error.messag})
  }
};

module.exports = {
  createProperty,
  getLandlordsProperties,
  updatePropertyAvaliability,
  getAllproperties,
  getAproperty,
};
