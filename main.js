const express = require('express');
const bodyParser = require('body-parser');
const app = express();

app.set("view engine", "ejs");
app.set("views", __dirname + "/views"); 

app.use(express.static("public"));
app.use('/images', express.static(__dirname + '/images'))
app.use(bodyParser.urlencoded({ extended: true }));

const conn = require('./conn');

app.get('/',(req, res)=>{
  res.render("landpage")
})

app.get("/view-feedback", (req, res) => {
  const getdata = "SELECT * FROM student_feedback";
  
  conn.query(getdata, (err, mydata) => {
    if (err) throw err;
    res.render("views-list", { 
      student: mydata
    });
  });
});

app.get('/admin-login', (req, res) => {
  res.render("admin-login", {error: null});
});

app.post('/admin-login', (req, res) => {
  const { username, password } = req.body;

  const sql = "SELECT * FROM admin WHERE username = ? AND password = ?";
  conn.query(sql, [username, password], (err, results) => {
    if (err) throw err;

    if (results.length > 0) {
      res.redirect("/dashboard");
    } else {
      res.render("admin-login", { error: "Invalid username or password" });
    }
  });
});




app.get("/student", (req, res) => {
  res.render("index");
});

app.get('/delete/:id', (req, res) => {
  const id = req.params.id;
  const del = `DELETE FROM student_feedback WHERE id = ?`;

  conn.query(del, [id], (err) => {
    if (err) throw err;
    console.log("Deleted Successfully");
    res.redirect("/view-feedback");
  });
});


app.post("/submit", (req, res) => {
  const data = req.body;

  const sql = `
    INSERT INTO student_feedback 
    (full_name, year_level, q1, q2, q3, q4, q5, q6, q7, q8, q9, q10)
    VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
  `;

  conn.query(sql, [
    data.full_name || null,
    data.year_level || null,
    data.q1, data.q2, data.q3, data.q4, data.q5,
    data.q6, data.q7, data.q8, data.q9, data.q10
  ], (err) => { 
    if (err) {
      console.error(err);
      console.error(" Error inserting:", err);
      res.status(500).send(" Failed to submit feedback");
    } else {
      
      res.redirect("/thankyou");
    }
  });
});


app.get("/thankyou", (req, res) => {
  res.render("congrats");
});

// dashboarddddd
app.get("/total", (req, res) => {
  const sql = `
    SELECT q1, q2, q3, q4, q5, q6, q7, q8, q9, q10
    FROM student_feedback
  `;

  conn.query(sql, (err, results) => {
    if (err) throw err;

    const ratingMap = {
      "Very Satisfied": 5,
      "Satisfied": 4,
      "Neutral": 3,    
      "Dissatisfied": 2,
      "Very Dissatisfied": 1
    };

    const totals = {
      VerySatisfied: 0,
      Satisfied: 0,
      Neutral: 0,
      Dissatisfied: 0,
      VeryDissatisfied: 0
    };

    const averages = Array(10).fill(0);
    const questionCount = Array(10).fill(0);

    results.forEach(row => {
      Object.keys(row).forEach((key, idx) => {
        const answer = row[key];
        if (answer && totals[answer.replace(" ", "")] !== undefined) {
          totals[answer.replace(" ", "")]++;
          averages[idx] += ratingMap[answer];
          questionCount[idx]++; 
        }
      });
    });
    //compute
    const avgScores = averages.map((sum, i) =>
      questionCount[i] ? (sum / questionCount[i]).toFixed(2) : 0
    );

      const totalRespondents = results.length;

    res.render("total-tally", { totals, avgScores, totalRespondents });
  });
});


app.get("/dashboard", (req, res) => {
  const sql = `
    SELECT 
      q1, q2, q3, q4, q5, q6, q7, q8, q9, q10
    FROM student_feedback
  `;
  
  conn.query(sql, (err, results) => {
    if (err) throw err;

    const totalRespondents = results.length

    const questionTitles = [
      "Q1: Clarity of Requirements",
      "Q2: Processing Time",
      "Q3: Staff Assistance",
      "Q4: Accessibility of Information",
      "Q5: System Usability",
      "Q6: Communication Quality",
      "Q7: Response Time",
      "Q8: Overall Experience",
      "Q9: Satisfaction with Staff",
      "Q10: Willingness to Recommend"
    ];

    
    const questions = questionTitles.map((title) => ({
      question: title,
      VerySatisfied: 0,
      Satisfied: 0,
      Neutral: 0,
      Dissatisfied: 0,
      VeryDissatisfied: 0
    }));


    results.forEach((row) => {
      Object.keys(row).forEach((key, idx) => {
        const answer = row[key];
        if (answer && questions[idx][answer.replace(" ", "")] !== undefined) {
          questions[idx][answer.replace(" ", "")]++;
        }
      });
    });

    res.render("dashboard", { questions , totalRespondents });
  });
});

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
  console.log(`Server running! Click here to visit: http://localhost:${PORT}`);
});