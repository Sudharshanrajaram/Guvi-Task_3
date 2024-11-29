// Topics taught in October
db.topics.find({
    "date": {
        $gte: new Date("2020-09-01"),
        $lt: new Date("2020-09-30")
    }
  });
  
  // Tasks assigned in October
  db.tasks.find({
    "date": {
        $gte: new Date("2020-09-01"),
        $lt: new Date("2020-09-30")
    }
  });
  db.company_drives.find({
    "drive_date": {
      $gte: new Date("2020-09-01"),
      $lt: new Date("2020-09-30")
    }
  });
  db.company_drives.aggregate([
    {
      $unwind: "$appeared_users"
    },
    {
      $match: {
        "appeared_users.status": "appeared"
      }
    },
    {
      $lookup: {
        from: "users",
        localField: "appeared_users.user_id",
        foreignField: "_id",
        as: "user_details"
      }
    }
  ]);
  db.codekata.aggregate([
    {
      $group: {
        _id: "$user_id",
        total_problems_solved: { $sum: "$problems_solved" }
      }
    }
  ]);
  db.mentors.find({
    "mentee_count": { $gt: 15 }
  });
  db.users.aggregate([
    {
      $lookup: {
        from: "attendance",
        localField: "_id",
        foreignField: "user_id",
        as: "attendance_details"
      }
    },
    {
      $lookup: {
        from: "tasks",
        localField: "_id",
        foreignField: "submitted_by",
        as: "task_details"
      }
    },
    {
      $match: {
        "attendance_details.date": {
          $gte: new Date("2020-10-15"),
          $lt: new Date("2020-11-01")
        },
        "attendance_details.status": "absent",
        "task_details.submitted_by": { $exists: false }
      }
    }
  ]);
            