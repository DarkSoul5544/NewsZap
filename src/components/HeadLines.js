import React, { useEffect, useState } from "react";
import axios from "axios";
import Loading from "./uploads/loading.gif";

const HeadLines = ({ category, handleCategoryChange, country, handleCountryChange }) => {
  // State to store articles fetched from the API
  const [articles, setArticles] = useState([]);
  // State to manage loading state while fetching articles
  const [loading, setLoading] = useState(false);
  // State to track if the user is a premium user
  const [isPremium, setIsPremium] = useState(false);

  // Function to fetch articles from the API
  useEffect(() => {
    const fetchData = async () => {
      setLoading(true); // Set loading to true while fetching data
      try {
        // Make API request to fetch news articles based on category and country
        const response = await axios.get(
          `https://newsdata.io/api/1/news?apikey=pub_43753d97dfa8a923b5118f631dc6009d2e2e0&category=${category}&country=${country}&language=en&`
        );
        setArticles(response.data.results); // Update articles state with fetched data
      } catch (error) {
        console.error("Error fetching news: ", error);
      }
      setLoading(false); // Set loading back to false after fetching data
    };

    fetchData(); // Call fetchData function when category or country changes
  }, [category, country]);

  // Function to fetch user profile when component mounts
  useEffect(() => {
    const token = localStorage.getItem('token'); // Get token from localStorage
    if (token) {
      fetchUserProfile(token); // Call function to fetch user profile if token exists
    }
  }, []);

  // Function to fetch user profile from the backend
  const fetchUserProfile = async (token) => {
    try {
      // Make API request to fetch user profile using the token
      const response = await axios.get('http://localhost:5000/api/profile', {
        headers: {
          Authorization: `Bearer ${token}`, // Pass token in the request headers
        },
      });
      setIsPremium(response.data.is_premium); // Update isPremium state with user's premium status
    } catch (error) {
      console.error('Error fetching user profile:', error);
    }
  };

  // Function to handle image loading error by setting a default image
  const handleImageError = (event) => {
    event.target.src =
      "https://images.news18.com/ibnlive/uploads/2024/04/oneplus-11-india-price-cut-2024-2024-04-5de3815c40fd693eba7e44b9214c70f0.jpg?impolicy=website&width=640&height=480";
  };

  // Function to handle country change for premium users
  const handleCountryChangePremium = (selectedCountry) => {
    if (isPremium) {
      // If user is premium, allow country change
      handleCountryChange(selectedCountry);
    } else {
      // If user is not premium, show an alert to purchase premium
      alert('Please purchase a premium subscription to change the country.');
      // You can also redirect the user to the premium subscription page here
    }
  };

  return (
    <div className="">
      <div style={{ display: "grid" }} id="categories">
        <div className="container mt-4" style={{ flex: 1 }}>
          <ul>
            <div className="dropdown d-flex justify-content-end">
              <button
                className="btn btn-dark dropdown-toggle"
                type="button"
                id="dropdownMenuButton"
                data-bs-toggle="dropdown"
                aria-expanded="false"
              >
                Country
              </button>
              <ul
                className="dropdown-menu bg-secondary"
                aria-labelledby="dropdownMenuButton"
                id="countryList"
                style={{
                  maxHeight: "400px",
                  overflowY: "auto",
                  msOverflowStyle: "none",
                  scrollbarWidth: "none",
                  "&::WebkitScrollbar": {
                    display: "none",
                  },
                }}
              >
                {/* Render country buttons based on premium status */}
                <li>
                  <button
                    className="dropdown-item"
                    onClick={() => handleCountryChangePremium("af")}
                  >
                    Afghanistan
                  </button>
                </li>
                <li>
                <button
                  className="dropdown-item"
                  onClick={() => handleCountryChangePremium("af")}
                >
                  Afghanistan
                </button>
              </li>
              <li>
                <button
                  className="dropdown-item"
                  onClick={() => handleCountryChangePremium("al")}
                >
                Albania
                </button>
              </li>
              <li>
                <button
                  className="dropdown-item"
                  onClick={() => handleCountryChangePremium("dz")}
                >
                  Algeria
                </button>
              </li>
              <li>
                <button
                  className="dropdown-item"
                  onClick={() => handleCountryChangePremium("au")}
                >
                  Australia
                </button>
              </li>
              <li>
                <button
                  className="dropdown-item"
                  onClick={() => handleCountryChangePremium("be")}
                >
                  Belgium
                </button>
              </li>
              <li>
                <button
                  className="dropdown-item"
                  onClick={() => handleCountryChangePremium("bg")}
                >
                  Bulgaria
                </button>
              </li>
              <li>
                <button
                  className="dropdown-item"
                  onClick={() => handleCountryChangePremium("br")}
                >
                  Brazil
                </button>
              </li>
              <li>
                <button
                  className="dropdown-item"
                  onClick={() => handleCountryChangePremium("ca")}
                >
                  Canada
                </button>
              </li>
              <li>
                <button
                  className="dropdown-item"
                  onClick={() => handleCountryChangePremium("ch")}
                >
                  Switzerland
                </button>
              </li>
              <li>
                <button
                  className="dropdown-item"
                  onClick={() => handleCountryChangePremium("cn")}
                >
                  China
                </button>
              </li>
              <li>
                <button
                  className="dropdown-item"
                  onClick={() => handleCountryChangePremium("co")}
                >
                  Colombia
                </button>
              </li>
              <li>
                <button
                  className="dropdown-item"
                  onClick={() => handleCountryChangePremium("cu")}
                >
                  Cuba
                </button>
              </li>
              <li>
                <button
                  className="dropdown-item"
                  onClick={() => handleCountryChangePremium("cz")}
                >
                  Czech Republic
                </button>
              </li>
              <li>
                <button
                  className="dropdown-item"
                  onClick={() => handleCountryChangePremium("de")}
                >
                  Germany
                </button>
              </li>
              <li>
                <button
                  className="dropdown-item"
                  onClick={() => handleCountryChangePremium("eg")}
                >
                  Egypt
                </button>
              </li>
              <li>
                <button
                  className="dropdown-item"
                  onClick={() => handleCountryChangePremium("fr")}
                >
                  France
                </button>
              </li>
              <li>
                <button
                  className="dropdown-item"
                  onClick={() => handleCountryChangePremium("gb")}
                >
                  United Kingdom
                </button>
              </li>
              <li>
                <button
                  className="dropdown-item"
                  onClick={() => handleCountryChangePremium("gr")}
                >
                  Greece
                </button>
              </li>
              <li>
                <button
                  className="dropdown-item"
                  onClick={() => handleCountryChangePremium("hk")}
                >
                  Hong Kong
                </button>
              </li>
              <li>
                <button
                  className="dropdown-item"
                  onClick={() => handleCountryChangePremium("hu")}
                >
                  Hungary
                </button>
              </li>
              <li>
                <button
                  className="dropdown-item"
                  onClick={() => handleCountryChangePremium("id")}
                >
                  Indonesia
                </button>
              </li>
              <li>
                <button
                  className="dropdown-item"
                  onClick={() => handleCountryChangePremium("ie")}
                >
                  Ireland
                </button>
              </li>
              <li>
                <button
                  className="dropdown-item"
                  onClick={() => handleCountryChangePremium("il")}
                >
                  Israel
                </button>
              </li>
              <li>
                <button
                  className="dropdown-item"
                  onClick={() => handleCountryChangePremium("in")}
                >
                  India
                </button>
              </li>
              <li>
                <button
                  className="dropdown-item"
                  onClick={() => handleCountryChangePremium("it")}
                >
                  Italy
                </button>
              </li>
              <li>
                <button
                  className="dropdown-item"
                  onClick={() => handleCountryChangePremium("jp")}
                >
                  Japan
                </button>
              </li>
              <li>
                <button
                  className="dropdown-item"
                  onClick={() => handleCountryChangePremium("kr")}
                >
                  South Korea
                </button>
              </li>
              <li>
                <button
                  className="dropdown-item"
                  onClick={() => handleCountryChangePremium("lt")}
                >
                  Lithuania
                </button>
              </li>
              <li>
                <button
                  className="dropdown-item"
                  onClick={() => handleCountryChangePremium("lu")}
                >
                  Luxembourg
                </button>
              </li>
              <li>
                <button
                  className="dropdown-item"
                  onClick={() => handleCountryChangePremium("lv")}
                >
                  Latvia
                </button>
              </li>
              <li>
                <button
                  className="dropdown-item"
                  onClick={() => handleCountryChangePremium("ma")}
                >
                  Morocco
                </button>
              </li>
              <li>
                <button
                  className="dropdown-item"
                  onClick={() => handleCountryChangePremium("mx")}
                >
                  Mexico
                </button>
              </li>
              <li>
                <button
                  className="dropdown-item"
                  onClick={() => handleCountryChangePremium("my")}
                >
                  Malaysia
                </button>
              </li>
              <li>
                <button
                  className="dropdown-item"
                  onClick={() => handleCountryChangePremium("ng")}
                >
                  Nigeria
                </button>
              </li>
              <li>
                <button
                  className="dropdown-item"
                  onClick={() => handleCountryChangePremium("nl")}
                >
                  Netherlands
                </button>
              </li>
              <li>
                <button
                  className="dropdown-item"
                  onClick={() => handleCountryChangePremium("no")}
                >
                  Norway
                </button>
              </li>
              <li>
                <button
                  className="dropdown-item"
                  onClick={() => handleCountryChangePremium("nz")}
                >
                  New Zealand
                </button>
              </li>
              <li>
                <button
                  className="dropdown-item"
                  onClick={() => handleCountryChangePremium("ph")}
                >
                  Philippines
                </button>
              </li>
              <li>
                <button
                  className="dropdown-item"
                  onClick={() => handleCountryChangePremium("pl")}
                >
                  Poland
                </button>
              </li>
              <li>
                <button
                  className="dropdown-item"
                  onClick={() => handleCountryChangePremium("pt")}
                >
                  Portugal
                </button>
              </li>
              <li>
                <button
                  className="dropdown-item"
                  onClick={() => handleCountryChangePremium("ro")}
                >
                  Romania
                </button>
              </li>
              <li>
                <button
                  className="dropdown-item"
                  onClick={() => handleCountryChangePremium("rs")}
                >
                  Serbia
                </button>
              </li>
              <li>
                <button
                  className="dropdown-item"
                  onClick={() => handleCountryChangePremium("ru")}
                >
                  Russia
                </button>
              </li>
              <li>
                <button
                  className="dropdown-item"
                  onClick={() => handleCountryChangePremium("sa")}
                >
                  Saudi Arabia
                </button>
              </li>
              <li>
                <button
                  className="dropdown-item"
                  onClick={() => handleCountryChangePremium("se")}
                >
                  Sweden
                </button>
              </li>
              <li>
                <button
                  className="dropdown-item"
                  onClick={() => handleCountryChangePremium("sg")}
                >
                  Singapore
                </button>
              </li>
              <li>
                <button
                  className="dropdown-item"
                  onClick={() => handleCountryChangePremium("si")}
                >
                  Slovenia
                </button>
              </li>
              <li>
                <button
                  className="dropdown-item"
                  onClick={() => handleCountryChangePremium("sk")}
                >
                  Slovakia
                </button>
              </li>
              <li>
                <button
                  className="dropdown-item"
                  onClick={() => handleCountryChangePremium("es")}
                >
                  Spain
                </button>
              </li>
              <li>
                <button
                  className="dropdown-item"
                  onClick={() => handleCountryChangePremium("sv")}
                >
                  Sweden
                </button>
              </li>
              <li>
                <button
                  className="dropdown-item"
                  onClick={() => handleCountryChangePremium("th")}
                >
                  Thailand
                </button>
              </li>
              <li>
                <button
                  className="dropdown-item"
                  onClick={() => handleCountryChangePremium("tr")}
                >
                  Turkey
                </button>
              </li>
              <li>
                <button
                  className="dropdown-item"
                  onClick={() => handleCountryChangePremium("tw")}
                >
                  Taiwan
                </button>
              </li>
              <li>
                <button
                  className="dropdown-item"
                  onClick={() => handleCountryChangePremium("ua")}
                >
                  Ukraine
                </button>
              </li>
              <li>
                <button
                  className="dropdown-item"
                  onClick={() => handleCountryChangePremium("us")}
                >
                  United States
                </button>
              </li>
              <li>
                <button
                  className="dropdown-item"
                  onClick={() => handleCountryChangePremium("ve")}
                >
                  Venezuela
                </button>
              </li>
              <li>
                <button
                  className="dropdown-item"
                  onClick={() => handleCountryChangePremium("za")}
                >
                  South Africa
                </button>
              </li>
              </ul>
            </div>
          </ul>
          {/* Display news articles */}
          <div className="row">
            {loading ? (
              // Show loading spinner while fetching data
              <div
                className="d-flex justify-content-center align-items-center"
                style={{ height: "80vh" }}
              >
                <img src={Loading} alt="loading" />
              </div>
            ) : (
              // Render news articles if loading is false
              articles.map((article, index) => (
                <div className="col-auto mx-auto my-4" key={index}>
                  <div
                    className="card" id="newscard"
                    style={{ width: "21rem", height: "30rem" }}
                  >
                    <img
                      src={
                        article.image_url || article.video_url ||
                        "https://images.news18.com/ibnlive/uploads/2024/04/oneplus-11-india-price-cut-2024-2024-04-5de3815c40fd693eba7e44b9214c70f0.jpg?impolicy=website&width=640&height=480"
                      }
                      className="card-img-top"
                      alt={article.title}
                      onError={handleImageError}
                      style={{ height: "13rem", transition: "transform .3s ease-in-out" }}
                    />
                    <div className="card-body d-flex flex-column">
                      <h5 className="card-title">
                        {article.title
                          ? article.title.length > 90
                            ? article.title.slice(0, 90) + "..."
                            : article.title
                          : "Dive deeper into the story! Get the full scoop on breaking news and trending topics. Click to stay informed."}
                      </h5>
                      <p className="card-text">
                        {article.description
                          ? article.description.length > 90
                            ? article.description.slice(0, 90) + "..."
                            : article.description
                          : "Dive deeper into the story! Get the full scoop on breaking news and trending topics. Click to stay informed."}
                      </p>
                      <a
                        href={article.link}
                        rel="noopener noreferrer"
                        className="btn btn-primary mt-auto"
                      >
                        Read More
                      </a>
                    </div>
                  </div>
                </div>
              ))
            )}
          </div>
          <div className="d-flex justify-content-between my-4">
            {/* Buttons for pagination (if needed) */}
          </div>
        </div>
      </div>
    </div>
  );
};

export default HeadLines;
