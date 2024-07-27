const userModel = require("../models/UserModel");

const userController = {
  saveUserDetails: (req, res) => {
    const {
      riderName,
      parentEmail,
      riderEmail,
      numberPlate,
      vehicleDescription,
      latitude,
      longitude,
    } = req.body;

    console.log("req", req.body);

    if (
      !riderName ||
      !parentEmail ||
      !riderEmail ||
      !numberPlate ||
      !vehicleDescription ||
      !latitude ||
      !longitude
    ) {
      res.status(400).json({
        message: "Required fields are missing",
      });
      return;
    }

    userModel
      .findOne({ parentEmail })
      .then(async (user) => {
        if (user) {
          res.status(200).json({
            message: "User get successfully",
            user,
          });
        } else {
          userModel
            .create(req.body)
            .then((user) => {
              res.status(200).json({
                message: "User details saved successfully",
                user,
              });
            })
            .catch((err) => {
              res.status(500).json({
                message: "Something went wrong",
              });
            });
        }
      })
      .catch((err) => {
        res.status(500).json({
          message: "Something went wrong",
        });
      });
  },

  getUserDetails: (req, res) => {
    const { no_plate } = req.params;
    console.log("no_plate", no_plate);
    userModel
      .findOne({ numberPlate: no_plate })
      .then(async (user) => {
        console.log("user", user);
        if (user) {
          res.status(200).json({
            message: "User details get successfully",
            user,
          });
        } else {
          res.status(400).json({
            message: "No user with this number plate does not exist",
          });
        }
      })
      .catch((err) => {
        res.status(500).json({
          message: "Something went wrong",
        });
      });
  },

  // updateUserDetails: (req, res) => {
  //   const {
  //     riderLatitude,
  //     riderLongitude,
  //     numberPlate,
  //     lastSpeed,
  //     lastDistance,
  //     speed,
  //     distance,
  //   } = req.body;
  //   console.log(" req.body", req.body);
  //   userModel
  //     .findOneAndUpdate(
  //       { numberPlate },
  //       {
  //         $set: {
  //           riderLatitude,
  //           riderLongitude,
  //           lastSpeed,
  //           lastDistance,
  //           speed,
  //           distance,
  //         },
  //       },
  //       { new: true, useFindAndModify: false }
  //     )
  //     .then((user) => {
  //       if (user) {
  //         res.status(200).json({
  //           message: "User details updated successfully",
  //           user,
  //         });
  //       } else {
  //         res.status(400).json({
  //           message: "No user with this number plate exists",
  //         });
  //       }
  //     })
  //     .catch((err) => {
  //       res.status(500).json({
  //         message: "Something went wrong",
  //       });
  //     });
  // },

  updateUserDetails: async (req, res) => {
    const {
      riderLatitude,
      riderLongitude,
      numberPlate,
      lastSpeed,
      lastDistance,
    } = req.body;
  
    try {
      // Find the user by numberPlate
      let user = await userModel.findOne({ numberPlate });
  
      if (user) {
        // Push the lastSpeed and lastDistance into the respective arrays
        user.speed.push(lastSpeed);
        user.distance.push(lastDistance);
  
        // Update the user's details
        user = await userModel.findOneAndUpdate(
          { numberPlate },
          {
            $set: {
              riderLatitude,
              riderLongitude,
              lastSpeed,
              lastDistance,
              speed: user.speed,
              distance: user.distance,
            },
          },
          { new: true, useFindAndModify: false }
        );
  
        res.status(200).json({
          message: "User details updated successfully",
          user,
        });
      } else {
        res.status(400).json({
          message: "No user with this number plate exists",
        });
      }
    } catch (err) {
      console.error(err);
      res.status(500).json({
        message: "Something went wrong",
      });
    }
  },
  
};

module.exports = userController;
