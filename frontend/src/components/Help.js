import React, { useState } from "react";

export default function Help() {
  const [question, setQuestion] = useState("");

  const handleSubmit = (event) => {
    event.preventDefault();
    console.log(`Submitted question: ${question}`);
    setQuestion("");
  };

  return (
    <div className="container mt-5">
      <h1>Help</h1>
      <p>
        If you need help with NewsZap, you've come to the right place! Here, you
        can find answers to frequently asked questions, as well as information
        about how to contact us for further assistance.
      </p>
      <h3>Frequently Asked Questions</h3>
      <p>
        Before contacting us, you may want to check out our list of frequently
        asked questions. Here, you can find answers to common questions about
        using NewsZap, such as how to create an account, how to reset your
        password, and how to customize your news feed.
      </p>
      <h3>Contact Us</h3>
      <p>
        If you can't find the answer to your question in our FAQ, or if you need
        further assistance, please don't hesitate to contact us. You can reach us
        by email at vishal.it63@gmail.com , or by phone at +91 8923859226. Our
        customer support team is available 24/7 to help you with any questions or
        concerns you may have.
      </p>
      <form onSubmit={handleSubmit}>
        <div className="form-group ">
          <label htmlFor="question">Ask a question:</label><textarea
            className="form-control"
            style={{ backgroundColor: "#50727B"}}
            id="question"
            rows="3"
            value={question}
            onChange={(event) => setQuestion(event.target.value)}
          ></textarea>
        </div>
        <button type="submit" className="btn btn-primary my-3">
          Submit
        </button>
      </form>
    </div>
  );
}