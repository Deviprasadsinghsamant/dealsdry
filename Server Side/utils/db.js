import mysql from "mysql";

const con = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "8899",
  database: "employeems",
});

con.connect(function (err) {
  if (err) {
    console.log("connection  error", err.message);
  } else {
    console.log("Connected");
  }
});

export default con;
