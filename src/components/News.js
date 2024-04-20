import React, { useEffect, useState } from "react";
import axios from "axios";

const News = () => {
  const [articles, setArticles] = useState([]);
  const [page, setPage] = useState(1);
  const [category, setCategory] = useState("general");
  const [country, setCountry] = useState("in");

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(
          `https://newsapi.org/v2/top-headlines?category=${category}&country=${country}&apiKey=c5e36d2b53594f76843004cf841cecbe&page=${page}&pageSize=6`
        );
        setArticles(response.data.articles);
      } catch (error) {
        console.error("Error fetching news: ", error);
      }
    };

    fetchData();
  }, [category, page, country]);

  const handlePrevClick = () => {
    if (page > 1) {
      setPage(page - 1);
    }
  };

  const handleNextClick = () => {
    setPage(page + 1);
  };

  const handleCategoryChange = (newCategory) => {
    setCategory(newCategory);
    setPage(1);
  };
  const handleCountryChange = (newCountry) => {
    setCountry(newCountry);
    setPage(1);
  };

  const handleImageError = (event) => {
    event.target.src =
      "https://images.news18.com/ibnlive/uploads/2024/04/oneplus-11-india-price-cut-2024-2024-04-5de3815c40fd693eba7e44b9214c70f0.jpg?impolicy=website&width=640&height=480";
  };

  return (
    <div className="bg-secondary">
      <div className="container mt-4 ">
        <ul className="nav nav-pills mb-4 d-flex justify-content-between">
          <li className="nav-item">
            <button
              type="button"
              className="btn btn-dark"
              onClick={() => handleCategoryChange("general")}
            >
              General
            </button>
          </li>
          <li className="nav-item">
            <button
              type="button"
              className="btn btn-dark"
              onClick={() => handleCategoryChange("entertainment")}
            >
              Entertainment
            </button>
          </li>
          <li className="nav-item">
            <button
              type="button"
              className="btn btn-dark"
              onClick={() => handleCategoryChange("business")}
            >
              Business
            </button>
          </li>
          <li className="nav-item">
            <button
              type="button"
              className="btn btn-dark"
              onClick={() => handleCategoryChange("health")}
            >
              Health
            </button>
          </li>
          <li className="nav-item">
            <button
              type="button"
              className="btn btn-dark"
              onClick={() => handleCategoryChange("science")}
            >
              Science
            </button>
          </li>
          <li className="nav-item">
            <button
              type="button"
              className="btn btn-dark"
              onClick={() => handleCategoryChange("sports")}
            >
              Sports
            </button>
          </li>
          <li className="nav-item">
            <button
              type="button"
              className="btn btn-dark"
              onClick={() => handleCategoryChange("technology")}
            >
              Technology
            </button>
          </li>
          <div className="dropdown">
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
                msOverflowStyle: "none", // IE and Edge
                scrollbarWidth: "none", // Firefox
                "&::WebkitScrollbar": {
                  display: "none", // Chrome, Safari, and Opera
                },
              }}
            >
              <li>
                <button
                  className="dropdown-item"
                  onClick={() => handleCountryChange("ae")}
                >
                  United Arab Emirates
                </button>
              </li>
              <li>
                <button
                  className="dropdown-item"
                  onClick={() => handleCountryChange("ar")}
                >
                  Argentina
                </button>
              </li>
              <li>
                <button
                  className="dropdown-item"
                  onClick={() => handleCountryChange("at")}
                >
                  Austria
                </button>
              </li>
              <li>
                <button
                  className="dropdown-item"
                  onClick={() => handleCountryChange("au")}
                >
                  Australia
                </button>
              </li>
              <li>
                <button
                  className="dropdown-item"
                  onClick={() => handleCountryChange("be")}
                >
                  Belgium
                </button>
              </li>
              <li>
                <button
                  className="dropdown-item"
                  onClick={() => handleCountryChange("bg")}
                >
                  Bulgaria
                </button>
              </li>
              <li>
                <button
                  className="dropdown-item"
                  onClick={() => handleCountryChange("br")}
                >
                  Brazil
                </button>
              </li>
              <li>
                <button
                  className="dropdown-item"
                  onClick={() => handleCountryChange("ca")}
                >
                  Canada
                </button>
              </li>
              <li>
                <button
                  className="dropdown-item"
                  onClick={() => handleCountryChange("ch")}
                >
                  Switzerland
                </button>
              </li>
              <li>
                <button
                  className="dropdown-item"
                  onClick={() => handleCountryChange("cn")}
                >
                  China
                </button>
              </li>
              <li>
                <button
                  className="dropdown-item"
                  onClick={() => handleCountryChange("co")}
                >
                  Colombia
                </button>
              </li>
              <li>
                <button
                  className="dropdown-item"
                  onClick={() => handleCountryChange("cu")}
                >
                  Cuba
                </button>
              </li>
              <li>
                <button
                  className="dropdown-item"
                  onClick={() => handleCountryChange("cz")}
                >
                  Czech Republic
                </button>
              </li>
              <li>
                <button
                  className="dropdown-item"
                  onClick={() => handleCountryChange("de")}
                >
                  Germany
                </button>
              </li>
              <li>
                <button
                  className="dropdown-item"
                  onClick={() => handleCountryChange("eg")}
                >
                  Egypt
                </button>
              </li>
              <li>
                <button
                  className="dropdown-item"
                  onClick={() => handleCountryChange("fr")}
                >
                  France
                </button>
              </li>
              <li>
                <button
                  className="dropdown-item"
                  onClick={() => handleCountryChange("gb")}
                >
                  United Kingdom
                </button>
              </li>
              <li>
                <button
                  className="dropdown-item"
                  onClick={() => handleCountryChange("gr")}
                >
                  Greece
                </button>
              </li>
              <li>
                <button
                  className="dropdown-item"
                  onClick={() => handleCountryChange("hk")}
                >
                  Hong Kong
                </button>
              </li>
              <li>
                <button
                  className="dropdown-item"
                  onClick={() => handleCountryChange("hu")}
                >
                  Hungary
                </button>
              </li>
              <li>
                <button
                  className="dropdown-item"
                  onClick={() => handleCountryChange("id")}
                >
                  Indonesia
                </button>
              </li>
              <li>
                <button
                  className="dropdown-item"
                  onClick={() => handleCountryChange("ie")}
                >
                  Ireland
                </button>
              </li>
              <li>
                <button
                  className="dropdown-item"
                  onClick={() => handleCountryChange("il")}
                >
                  Israel
                </button>
              </li>
              <li>
                <button
                  className="dropdown-item"
                  onClick={() => handleCountryChange("in")}
                >
                  India
                </button>
              </li>
              <li>
                <button
                  className="dropdown-item"
                  onClick={() => handleCountryChange("it")}
                >
                  Italy
                </button>
              </li>
              <li>
                <button
                  className="dropdown-item"
                  onClick={() => handleCountryChange("jp")}
                >
                  Japan
                </button>
              </li>
              <li>
                <button
                  className="dropdown-item"
                  onClick={() => handleCountryChange("kr")}
                >
                  South Korea
                </button>
              </li>
              <li>
                <button
                  className="dropdown-item"
                  onClick={() => handleCountryChange("lt")}
                >
                  Lithuania
                </button>
              </li>
              <li>
                <button
                  className="dropdown-item"
                  onClick={() => handleCountryChange("lv")}
                >
                  Latvia
                </button>
              </li>
              <li>
                <button
                  className="dropdown-item"
                  onClick={() => handleCountryChange("ma")}
                >
                  Morocco
                </button>
              </li>
              <li>
                <button
                  className="dropdown-item"
                  onClick={() => handleCountryChange("mx")}
                >
                  Mexico
                </button>
              </li>
              <li>
                <button
                  className="dropdown-item"
                  onClick={() => handleCountryChange("my")}
                >
                  Malaysia
                </button>
              </li>
              <li>
                <button
                  className="dropdown-item"
                  onClick={() => handleCountryChange("ng")}
                >
                  Nigeria
                </button>
              </li>
              <li>
                <button
                  className="dropdown-item"
                  onClick={() => handleCountryChange("nl")}
                >
                  Netherlands
                </button>
              </li>
              <li>
                <button
                  className="dropdown-item"
                  onClick={() => handleCountryChange("no")}
                >
                  Norway
                </button>
              </li>
              <li>
                <button
                  className="dropdown-item"
                  onClick={() => handleCountryChange("nz")}
                >
                  New Zealand
                </button>
              </li>
              <li>
                <button
                  className="dropdown-item"
                  onClick={() => handleCountryChange("ph")}
                >
                  Philippines
                </button>
              </li>
              <li>
                <button
                  className="dropdown-item"
                  onClick={() => handleCountryChange("pl")}
                >
                  Poland
                </button>
              </li>
              <li>
                <button
                  className="dropdown-item"
                  onClick={() => handleCountryChange("pt")}
                >
                  Portugal
                </button>
              </li>
              <li>
                <button
                  className="dropdown-item"
                  onClick={() => handleCountryChange("ro")}
                >
                  Romania
                </button>
              </li>
              <li>
                <button
                  className="dropdown-item"
                  onClick={() => handleCountryChange("rs")}
                >
                  Serbia
                </button>
              </li>
              <li>
                <button
                  className="dropdown-item"
                  onClick={() => handleCountryChange("ru")}
                >
                  Russia
                </button>
              </li>
              <li>
                <button
                  className="dropdown-item"
                  onClick={() => handleCountryChange("sa")}
                >
                  Saudi Arabia
                </button>
              </li>
              <li>
                <button
                  className="dropdown-item"
                  onClick={() => handleCountryChange("se")}
                >
                  Sweden
                </button>
              </li>
              <li>
                <button
                  className="dropdown-item"
                  onClick={() => handleCountryChange("sg")}
                >
                  Singapore
                </button>
              </li>
              <li>
                <button
                  className="dropdown-item"
                  onClick={() => handleCountryChange("si")}
                >
                  Slovenia
                </button>
              </li>
              <li>
                <button
                  className="dropdown-item"
                  onClick={() => handleCountryChange("sk")}
                >
                  Slovakia
                </button>
              </li>
              <li>
                <button
                  className="dropdown-item"
                  onClick={() => handleCountryChange("th")}
                >
                  Thailand
                </button>
              </li>
              <li>
                <button
                  className="dropdown-item"
                  onClick={() => handleCountryChange("tr")}
                >
                  Turkey
                </button>
              </li>
              <li>
                <button
                  className="dropdown-item"
                  onClick={() => handleCountryChange("tw")}
                >
                  Taiwan
                </button>
              </li>
              <li>
                <button
                  className="dropdown-item"
                  onClick={() => handleCountryChange("ua")}
                >
                  Ukraine
                </button>
              </li>
              <li>
                <button
                  className="dropdown-item"
                  onClick={() => handleCountryChange("us")}
                >
                  United States
                </button>
              </li>
              <li>
                <button
                  className="dropdown-item"
                  onClick={() => handleCountryChange("ve")}
                >
                  Venezuela
                </button>
              </li>
              <li>
                <button
                  className="dropdown-item"
                  onClick={() => handleCountryChange("za")}
                >
                  South Africa
                </button>
              </li>
            </ul>
          </div>
        </ul>

        <h1 className="mb-4 text-center my-6">NewsZap:Taste the News</h1>
        <div className="row">
          {articles.map((article, index) => (
            <div key={index} className="col-md-4 mb-4">
              <div className="card">
                <img
                  src={
                    article.urlToImage ||
                    "https://images.news18.com/ibnlive/uploads/2024/04/oneplus-11-india-price-cut-2024-2024-04-5de3815c40fd693eba7e44b9214c70f0.jpg?impolicy=website&width=640&height=480"
                  }
                  className="card-img-top"
                  alt={article.title}
                  onError={handleImageError}
                  style={{ width: "414px", height: "250px" }}
                />
                <div className="card-body">
                  <h5 className="card-title">{article.title}</h5>
                  <p className="card-text">
                    {article.description
                      ? article.description.slice(0, 120) +
                        (article.description.length > 120 ? "..." : "")
                      : 'No description available. Click "Read More" to view the full article.'}
                  </p>{" "}
                  <a
                    href={article.url}
                    className="btn btn-primary"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    Read More
                  </a>
                </div>
              </div>
            </div>
          ))}
        </div>
        <div className="container d-flex justify-content-between">
          <button
            type="button"
            className="btn btn-dark my-4"
            onClick={handlePrevClick}
            disabled={page === 1}
          >
            &larr; Previous
          </button>
          <button
            type="button"
            className="btn btn-dark my-4"
            onClick={handleNextClick}
          >
            Next &rarr;
          </button>
        </div>
      </div>
    </div>
  );
};

export default News;
