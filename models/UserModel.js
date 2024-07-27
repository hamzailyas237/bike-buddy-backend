const { mongoose } = require("mongoose");

const userSchema = mongoose.Schema({
  riderName: {
    type: String,
    required: true,
  },
  parentEmail: {
    type: String,
    required: true,
    unique: true,
  },
  riderEmail: {
    type: String,
    required: true,
    unique: true,
  },
  numberPlate: {
    type: String,
    required: true,
  },
  vehicleDescription: {
    type: String,
    required: true,
  },
  latitude: {
    type: String,
    required: true,
  },
  longitude: {
    type: String,
    required: true,
  },
  riderLatitude: {
    type: String,
  },
  riderLongitude: {
    type: String,
  },
  lastSpeed: {
    type: Number,
  },
  lastDistance: {
    type: Number,
  },
  speed: {
    type: Array,
  },
  distance: {
    type: Array,
  },
  //   speed: [{ type: String }],

  // location: {
  //     type: String,
  //     required: true
  // },
});

const userModel = mongoose.model("user", userSchema);
module.exports = userModel;
