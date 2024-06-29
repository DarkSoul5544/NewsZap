import React, { useState, useEffect } from "react";

export default function Help() {
  const [question, setQuestion] = useState("");
  const [questions, setQuestions] = useState([]);
  const [isAdmin, setIsAdmin] = useState(false);
  const [userId, setUserId] = useState("");
  const [userName, setUserName] = useState("");
  const [userProfilePhoto, setUserProfilePhoto] = useState("");

  useEffect(() => {
    fetchUserProfile();
    fetchQuestions();
  }, []);

  const fetchUserProfile = async () => {
    const token = localStorage.getItem('token');
    if (!token) return;

    try {
      const response = await fetch('http://localhost:5000/api/profile', {
        headers: { Authorization: `Bearer ${token}` },
      });
      if (!response.ok) {
        throw new Error('Network response was not ok');
      }
      const data = await response.json();
      setIsAdmin(data.role === 'administrator' || data.role === 'higher-admin');
      setUserId(data._id);
      setUserName(data.name);
      setUserProfilePhoto(data.image);  // Ensure that this field is returned by the profile endpoint
    } catch (error) {
      console.error('Error fetching user profile:', error);
    }
  };

  const fetchQuestions = async () => {
    try {
      const response = await fetch('http://localhost:5000/api/questions');
      if (!response.ok) {
        throw new Error('Network response was not ok');
      }
      const data = await response.json();
      setQuestions(data);
    } catch (error) {
      console.error('Error fetching questions:', error);
    }
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    const token = localStorage.getItem('token');
    try {
      const response = await fetch('http://localhost:5000/api/questions', {
        method: 'POST',
        headers: { 
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`
        },
        body: JSON.stringify({
          question,
          senderId: userId,
          senderName: userName,
          senderProfilePhoto: userProfilePhoto
        })
      });
      if (!response.ok) {
        throw new Error('Network response was not ok');
      }
      await response.json(); // Read the response body to prevent JSON parse error
      fetchQuestions();
      setQuestion("");
    } catch (error) {
      console.error('Error submitting question:', error);
    }
  };

  const handleAnswerSubmit = async (event, questionId, answer) => {
    event.preventDefault();
    const token = localStorage.getItem('token');
    try {
      const response = await fetch(`http://localhost:5000/api/questions/${questionId}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`
        },
        body: JSON.stringify({ answer })
      });
      if (!response.ok) {
        throw new Error('Network response was not ok');
      }
      await response.json(); // Read the response body to prevent JSON parse error
      fetchQuestions();
    } catch (error) {
      console.error('Error submitting answer:', error);
    }
  };

  const filteredQuestions = isAdmin ? questions : questions.filter(q => q.user._id === userId);

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
        by email at vishal.it63@gmail.com, or by phone at +91 8923859226. Our
        customer support team is available 24/7 to help you with any questions or
        concerns you may have.
      </p>
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label htmlFor="question">Ask a question:</label>
          <textarea
            className="form-control"
            style={{ backgroundColor: "#aedbdf" }}
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
      <h3>Questions and Answers</h3>
      <ul className="list-group">
        {filteredQuestions.map((q) => (
          <li key={q._id} className="list-group-item">
            <h5>{q.question}</h5>
            <p>
              <img
                src={q.senderProfilePhoto}
                alt={`${q.senderName}'s profile`}
                width="30"
                height="30"
                className="rounded-circle"
              /> 
              {q.senderName}
            </p>
            <p>{q.answer || "No answer yet."}</p>
            {isAdmin && (
              <form onSubmit={(event) => handleAnswerSubmit(event, q._id, event.target.answer.value)}>
                <div className="form-group">
                  <label htmlFor={`answer-${q._id}`}>Answer:</label>
                  <textarea
                    className="form-control"
                    id={`answer-${q._id}`}
                    name="answer"
                    rows="2"
                  ></textarea>
                </div>
                <button type="submit" className="btn btn-primary">
                  Submit Answer
                </button>
              </form>
            )}
          </li>
        ))}
      </ul>
    </div>
  );
}
