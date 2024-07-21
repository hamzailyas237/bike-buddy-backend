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
      longitude
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

    // userModel
    //   .findOne({ parentEmail })
    //   .then(async (user) => {
    //     if (user) {
    //       res.status(400).json({
    //         message: "This email is already in use",
    //       });
    //     } else {
    //       userModel
    //         .create(req.body)
    //         .then((user) => {
    //           res.status(200).json({
    //             message: "User details saved successfully",
    //             user,
    //           });
    //         })
    //         .catch((err) => {
    //           res.status(500).json({
    //             message: "Something went wrong",
    //           });
    //         });
    //     }
    //   })
    //   .catch((err) => {
    //     res.status(500).json({
    //       message: "Something went wrong",
    //     });
    //   });
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

  updateUserDetails: (req, res) => {
    const { riderLatitude,riderLongitude,numberPlate } = req.body;
    console.log(" req.body",  req.body);
    userModel.findOneAndUpdate(
      { numberPlate }, 
      { $set: { riderLatitude, riderLongitude } }, 
      { new: true, useFindAndModify: false }
    )
    .then((user) => {
      if (user) {
        res.status(200).json({
          message: "User details updated successfully",
          user,
        });
      } else {
        res.status(400).json({
          message: "No user with this number plate exists",
        });
      }
    })
    .catch((err) => {
      res.status(500).json({
        message: "Something went wrong",
      });
    })
  },
};

module.exports = userController;
