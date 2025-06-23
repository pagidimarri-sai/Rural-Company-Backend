// const nodemailer = require("nodemailer");

// const sendOrderEmail = async (to, order) => {
//   const transporter = nodemailer.createTransport({
//     service: "gmail",
//     auth: {
//       user: process.env.EMAIL_USER,
//       pass: process.env.EMAIL_PASS,
//     },
//   });

//   const mailOptions = {
//     from: `"Rural Company" <${process.env.EMAIL_USER}>`,
//     to,
//     subject: "Your Order Confirmation",
//     html: `
//       <h2>Order Confirmed!</h2>
//       <p><strong>Order ID:</strong> ${order._id}</p>
//       <p><strong>Slot:</strong> ${order.slot}</p>
//       <p><strong>Total Paid:</strong> ₹${order.totalAmount}</p>
//       <p><strong>Payment Method:</strong> ${order.paymentMethod}</p>
//       <br/>
//       <p>Thanks for choosing Rural Company!</p>
//     `,
//   };

//   await transporter.sendMail(mailOptions);
// };

// module.exports = sendOrderEmail;

const nodemailer = require("nodemailer");

const sendOrderEmail = async (to, order) => {
  const transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
      user: process.env.EMAIL_USER,
      pass: process.env.EMAIL_PASS,
    },
  });

  const mailOptions = {
    from: `"Rural Company" <${process.env.EMAIL_USER}>`,
    to, // this must be a **valid email string**
    subject: "Your Order Confirmation",
    html: `
      <h2>Order Confirmed!</h2>
      <p><strong>Order ID:</strong> ${order._id}</p>
      <p><strong>Slot:</strong> ${order.slot}</p>
      <p><strong>Total Paid:</strong> ₹${order.totalAmount}</p>
      <p><strong>Payment Method:</strong> ${order.paymentMethod}</p>
      <br/>
      <p>Thanks for choosing Rural Company!</p>
    `,
  };

  await transporter.sendMail(mailOptions);
};

module.exports = sendOrderEmail;
