const express = require("express");
const stayHome = require("./bookingSchema");
const Admin = require("./adminSchema");
const nodemailer = require("nodemailer");

// const compnyProd = require("./addProduct");
const app = new express();
const cors = require("cors");
app.use(express.json());

app.use(cors());

app.get("/booking", async (req, res) => {
  let data = await stayHome.find();
  res.send(data);
  console.log(data);
});

// app.post("/booking", async (req, res) => {
//   const { firstName, lastName, mobile, email } = req.body;
//   console.log(firstName, lastName, mobile, email);
//   const data = await new stayHome({
//     firstName,
//     lastName,
//     mobile,
//     email
//   });
//   let saveData = await data.save();
//   res.send(saveData);
// });

// Nodemailer transporter setup
const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: "vineetm2020@gmail.com", // Replace with your email
    pass: "qqpfucxbnylyrblj" // Replace with your email's app password
  }
});

app.post("/booking", async (req, res) => {
  const { firstName, lastName, mobile, email } = req.body;
  console.log(firstName, lastName, mobile, email);

  // Save booking data in MongoDB
  const data = await new stayHome({
    firstName,
    lastName,
    mobile,
    email
  });

  let saveData = await data.save();

  // Prepare email content
  const mailOptions = {
    // from: "amitkumarsingh1482@gmail.com", // Sender email
    from: "amitkumarsingh1482@gmail.com", // Sender email
    // to: "vineetm821@gmailcom", // Receiver email
    // to: "omwareinfosystempvt@gmail.com", // Receiver email
    to: "vineetm2020@gmail.com", // Receiver email
    subject: "New Booking Alert",
    text: `Booking Details:
           Name: ${firstName} ${lastName}
           Mobile: ${mobile}
           Email: ${email}`,
    html: `<h3>New Booking Received</h3>
           <p><strong>Name:</strong> ${firstName} ${lastName}</p>
           <p><strong>Mobile:</strong> ${mobile}</p>
           <p><strong>Email:</strong> ${email}</p>`
  };

  // Send email using Nodemailer
  try {
    await transporter.sendMail(mailOptions);
    res.status(200).send({
      message: "Booking saved and email sent successfully!",
      data: saveData
    });
  } catch (error) {
    console.error("Error sending email:", error);
    res.status(500).send({
      message: "Booking saved but email sending failed.",
      error: error.message
    });
  }
});

app.delete("/booking/:id", async (req, res) => {
  const id = req.params.id;
  console.log(id);
  const delUser = await stayHome.deleteOne({ _id: id });
  res.send(delUser);
});

// const nodemailer = require("nodemailer");

// const transporter = nodemailer.createTransport({
//   service: "gmail",
//   auth: {
//     // user: "vineetm821@gmail.com",  // Use your email
//     user: "vineetm2020@gmail.com", // Use your email
//     pass: "qqpfucxbnylyrblj" // Use your generated app password
//   }
// });

// const mailOptions = {
//   from: "vineetm821@gmail.com", // Sender email
//   to: "vineetm2020@gmail.com", // Receiver email
//   subject: "Test Email",
//   text: "Hello, this is a test email."
// };

// transporter.sendMail(mailOptions, function(error, info) {
//   if (error) {
//     console.log("Error: " + error);
//   } else {
//     console.log("Email sent: " + info.response);
//   }
// });

app.post("/login", async (req, res) => {
  const { email, password } = req.body;
  console.log(email, password);

  // Email और password की जाँच करें
  if (email && password) {
    try {
      // यूज़र डेटा खोजें और पासवर्ड को छोड़ दें
      const data = await Admin.findOne({ email, password }).select("-password");
      console.log(data);
      if (data) {
        res.status(200).send({
          status: "success",
          message: "Record found",
          data: data
        });
      } else {
        res.status(404).send({
          status: "error",
          message: "Record Not Found"
        });
      }
    } catch (error) {
      res.status(500).send({ message: "Server Error", error });
    }
  } else {
    res.send({
      message: email ? "Please Enter Password" : "Please Enter Email"
    });
  }
});

app.listen(10101, () => console.log("server created"));
