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
 * Pluck learner ID from an array
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
 * Pluck student assignment scores from an array
 * @param  {}
 * @param  {}
 * @return {Number}      Assignment Scores
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
 * Pluck the possible points amount from an object
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
 * Find the average
 * @param  {}
 * @param  {}
 * @return {Number}      The average of numbers, individual student scores
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
 * Pluck Course name, assignment name, course ID from an object
 * @param  {}
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
 * Make a banner for the assignments
 * @param  {Object} arr LearnerSubmissions Array
 * @param  {Object} obj AssignmentGroup
 * @return {Number}
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
 * @param  {Object}       Student Output
 * @param  {}
 * @return {Object}      An array
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

/*
- What could you have done differently during the planning stages of your project to make the execution easier?

Answer: I tried to pseudo-code right from the start, but had a hard time visualizing what to do.  So I made a flow-chart, and looked for connections, and from there I was able to write the pseudocode.


- Were there any requirements that were difficult to implement? - What do you think would make them easier to implement in future projects?

Answer:  Working with objects was quite hard for me.  I kept looking for a set method to implement after using the for..in, but it still eludes me.  I think I could have done a better job by working on the average function first, before implementing the minor functions that supported the average function.  Because I worked backward, then I was left to fit the smaller functions into my main average function, instead of the other way around.


- What would you add to, or change about your application if given more time?

Answer:  I would begin all of my functions with some kind of check, just so I would have room to cover any edge cases.  I would not hard-code anything, but would allow the functions to flow and intermingle.  I would also develop my main functions first,  and allow some of the functions to be dependent on others.

- Use this space to make notes for your future self about anything that you think is important to remember about this process, or that may aid you when attempting something similar again:

Answer:  Dear self, you need to develop a strategy for reading data from outer objects and nested objects.  You need to do a better job at writing pseudo-code, and visualizing the entire problem before you begin.  Avoid the temptation to hard-code data, and allow your program to flow and provide all the calculations you need.  Don't be afraid to rewrite your program when you know something needs fixing, despite the amount of time it will take to fix the issue.  
*/
