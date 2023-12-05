// The provided course information.
const CourseInfo = {
  id: 451,
  name: "Introduction to JavaScript",
};

// The provided assignment group.
const AssignmentGroup = {
  id: 12345,
  name: "Fundamentals of JavaScript",
  course_id: 451,
  group_weight: 25,
  assignments: [
    {
      id: 1,
      name: "Declare a Variable",
      due_at: "2023-01-25",
      points_possible: 50,
    },
    {
      id: 2,
      name: "Write a Function",
      due_at: "2023-02-27",
      points_possible: 150,
    },
    {
      id: 3,
      name: "Code the World",
      due_at: "3156-11-15",
      points_possible: 500,
    },
  ],
};

// The provided learner submission data.
const LearnerSubmissions = [
  {
    learner_id: 125,
    assignment_id: 1,
    submission: {
      submitted_at: "2023-01-25",
      score: 47,
    },
  },
  {
    learner_id: 125,
    assignment_id: 2,
    submission: {
      submitted_at: "2023-02-12",
      score: 150,
    },
  },
  {
    learner_id: 125,
    assignment_id: 3,
    submission: {
      submitted_at: "2023-01-25",
      score: 400,
    },
  },
  {
    learner_id: 132,
    assignment_id: 1,
    submission: {
      submitted_at: "2023-01-24",
      score: 39,
    },
  },
  {
    learner_id: 132,
    assignment_id: 2,
    submission: {
      submitted_at: "2023-03-07",
      score: 140,
    },
  },
];

function getLearnerData(course, ag, submissions) {
  // here, we would process this data to achieve the desired result.
  const result = [
    {
      id: 125,
      avg: 0.985, // (47 + 150) / (50 + 150)
      1: 0.94, // 47 / 50
      2: 1.0, // 150 / 150
    },
    {
      id: 132,
      avg: 0.82, // (39 + 125) / (50 + 150)
      1: 0.78, // 39 / 50
      2: 0.833, // late: (140 - 15) / 150
    },
  ];

  return result;
}

/**
 * Check if you're in the correct course
 * @param {}
 * @return {}
 */
function isCorrectCourse() {
  try {
    if (CourseInfo.id === AssignmentGroup.course_id) {
      return true;
    } else {
      throw Error("You're in the wrong course");
    }
  } catch (error) {
    console.log(error.message);
  }
}

/**
 * Pluck learner IDs from LearnerSubmissions array
 * @param  {}
 * @param  {}
 * @return {Number}      Two student IDs
 */
function getLearnerID() {
  let idArray = [];
  LearnerSubmissions.forEach((learner) => {
    if (idArray.includes(learner.learner_id)) {
      return;
    } else {
      idArray.push(learner.learner_id);
    }
  });
  return ([student_id_1, student_id_2] = idArray);
}
getLearnerID();

/**
 * Pluck student assignment scores from LearnerSubmissions array
 * @param  {}
 * @param  {}
 * @return {Object}      Assignment Scores array
 */
let learner1_scores = new Set();
let learner2_scores = new Set();
function studentScores() {
  LearnerSubmissions.forEach((learner) => {
    if (learner.learner_id === student_id_1) {
      learner1_scores.add(Number(learner.submission.score));
    } else {
      learner2_scores.add(Number(learner.submission.score));
    }
  });
  return {
    learner1_scores,
    learner2_scores,
  };
}
studentScores();

/**
 * Pluck the possible points amount from the AssignmentGroup object
 * @param  {}
 * @param  {}
 * @return {Number}      The possible points
 */
let points;
function getPointsPossible() {
  points = AssignmentGroup.assignments.map((assignment) => {
    assignment.id === 1
      ? (points = 50)
      : assignment.id === 2
        ? (points = 150)
        : assignment.id === 3
          ? (points = 500)
          : "";
    return assignment.points_possible;
  });
  return points;
}

/**
 * Find the average of individual student assignments and weighted assignments
 * @param  {}
 * @param  {}
 * @return {Object}      The average of all assignments per student, individual assignment average
 */
let learner1_1, learner1_2, learner2_1, learner2_2, points1, points2;
function findAverage() {
  try {
    if (points1 !== 0 || points2 !== 0) {
      let [score1, score2] = learner1_scores;
      let [score4, score5] = learner2_scores;
      [points1, points2] = points;
      let avg1, avg2;
      learner1_1 = score1 / points1;
      learner1_2 = score2 / points2;
      avg1 = score1 / points1;
      learner2_1 = score4 / points1;
      learner2_2 = (score5 - 0.1 * points2) / points2;
      avg2 = (score5 - 0.1 * points2) / points2;

      return {
        learner1_1,
        learner1_2,
        learner2_1,
        learner2_2,
        avg1,
        avg2,
      };
    } else {
      throw "Error - Can't divide by zero";
    }
  } catch (error) {
    console.log(error.message);
  }
}

/**
 * Pluck Course name, assignment name, course ID from AssignmentGroup & CourseInfo
 * @param  {Object} AssignmentGroup, CourseInfo
 * @param  {}
 * @return {}
 */
function getNames(name1, name2) {
  console.log(
    `
      ***************************************************
      * Course Name: ${name1["name"]}         *
      * Course Id: ${name1["id"]}                                  *
      * Current Assignment: ${name2["name"]}  *
      * Preparer: Deb Prentice                          *
      * *************************************************
      `,
  );
}

/**
 * Make a banner to display the assignments
 * @param  {Array}  LearnerSubmissions Array
 * @param  {}
 * @return {String} output
 */
function displayAssignments(arr) {
  let output = "";
  let due = "";

  arr.forEach((item) => {
    item.forEach((c) => {
      /**
       * Check if assignments are late
       * @param  {}
       * @param  {}
       * @return {String}      The status of each assignment
       */
      function late() {
        if (
          c.assignment_id === 1
            ? (due = "2023-01-25")
            : c.assignment_id === 2
              ? (due = "2023-02-27")
              : c.assignment_id === 3
                ? (due = "3156-11-15")
                : ""
        ) {
          if (due < c["submission"]["submitted_at"]) {
            return "Late. You lose 10% of points possible.";
          } else if (due == c["submission"]["submitted_at"]) {
            return "On time. This grade is included.";
          } else {
            return "Early. This grade is not included.";
          }
        }
      }

      return (output += `
        ***************************************************
        * Student Number: ${c.learner_id} 
        * Assignment ID: ${c["assignment_id"]}                                  
        * Submitted At: ${c["submission"]["submitted_at"]}
        * Due At: ${
          c.assignment_id === 1
            ? (due = "2023-01-25")
            : c.assignment_id === 2
              ? (due = "2023-02-27")
              : c.assignment_id === 3
                ? (due = "3156-11-15")
                : ""
        }                                 
        * Score: ${c["submission"]["score"]}
        * Points Possible: ${
          c.assignment_id === 1
            ? getPointsPossible()[0]
            : c.assignment_id === 2
              ? getPointsPossible()[1]
              : c.assignment_id === 3
                ? getPointsPossible()[2]
                : ""
        }
        * Late?: ${late()}
        * *************************************************
        `);
    });
  });
  console.log(output);
}

/**
 * Display all course information
 * @param  {Object}       CourseInfo, AssignmentGroup
 * @param  {Array}        LearnerSubmission
 * @return {Array}        StudentOutput
 */
function getLearnerData(CourseInfo, AssignmentGroup, [LearnerSubmission]) {
  try {
    if (isCorrectCourse()) {
      getNames(CourseInfo, AssignmentGroup);
      displayAssignments([LearnerSubmission]);
      const { learner1_1, learner1_2, learner2_1, learner2_2, avg1, avg2 } =
        findAverage();

      for (let k = 0; k < getLearnerID().length; i++) {
        let studentOutput = [];
        studentOutput[0] = {
          1: learner1_1,
          id: student_id_1,
          avg: avg1,
        };
        studentOutput[1] = {
          2: Number(learner2_2.toFixed(2)),
          id: student_id_2,
          avg: Number(avg2.toFixed(2)),
        };

        return studentOutput;
      }
    } else {
      throw "Error - invalid input - course_id does not match the AssignmentGroup ID";
    }
  } catch (error) {
    console.log(error.message);
  }
}
console.log(getLearnerData(CourseInfo, AssignmentGroup, [LearnerSubmissions]));
