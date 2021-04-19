const db = require("../models");

module.exports = function(app) {
    // App.get to pull up info for the workouts page
    app.get("/api/workouts", (req, res) => {
      db.Workout.find({})
          .sort({ date: -1 })
          .then(dbWorkout => {
              res.json(dbWorkout);
          })
          .catch(err => {
              res.status(400).json(err);
          });
  });
    // App.get to pull up info for the range page
    app.get("/api/workouts/range", (req, res) => {
      db.Workout.find({}).limit(7)
        .then(dbWorkout => {
          res.json(dbWorkout);
        })
        .catch(err => {
          res.status(400).json(err);
        });
    });
    // App.post to submit new completed workouts
    app.post("/api/workouts", ({ body }, res) => {
      db.Workout.create(body)
          .then(dbWorkout => {
              res.json(dbWorkout);
          })
          .catch(err => {
              res.status(400).json(err);
          });
  });
      // App.put to update workouts by MongoDB _id value and update the exercsise body
      app.put("/api/workouts/:id", function (req, res) {
        let id = req.params.id;
        console.log(req.body);
        console.log(id);
        db.Workout.findByIdAndUpdate(
            id,
            { $push: { exercises: req.body } },
        )
            .then((data) => {
                console.log(data);
                res.json(data);
            })
            .catch((err) => {
                console.log("ERROR!!!!");
                console.log(err);
                res.json(err);
            });
    });
    
};
