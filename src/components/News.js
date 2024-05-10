import React, { useEffect, useState } from "react";
import axios from "axios";
import Loading from "./uploads/loading.gif";


const News = () => {
  const [articles, setArticles] = useState([]);
  const [page, setPage] = useState(1);
  const [category, setCategory] = useState("general");
  const [country, setCountry] = useState("in");
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      try {
        const response = await axios.get(
          `https://newsapi.org/v2/top-headlines?category=${category}&country=${country}&apiKey=c5e36d2b53594f76843004cf841cecbe&page=${page}&pageSize=6`
        );
        setArticles(response.data.articles);
      } catch (error) {
        console.error("Error fetching news: ", error);
      }
      setLoading(false);
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
    <div className="" style={{ backgroundImage:`linear-gradient(90deg, rgba(167,106,231,1) 9%, rgba(65,36,214,0.6502976190476191) 82%)` }}>
<div className="" style={{ display: "grid", gridTemplateColumns: "150px 1fr" }}>
  <div className="nav-container mx-3 my-3" >
      <ul className="list-unstyled my-5 mx-2 fs-1">
    <li className="nav-item">
      <button
        type="button" id="newsbtn"
        className="btn"
        onClick={() => handleCategoryChange("general")}
      >
        General
      </button>
    </li>
    <li className="nav-item">
      <button
        type="button"
        className="btn"
        onClick={() => handleCategoryChange("entertainment")}
      >
        Entertainment
      </button>
    </li>
    <li className="nav-item">
      <button
        type="button"
        className="btn"
        onClick={() => handleCategoryChange("business")}
      >
        Business
      </button>
    </li>
    <li className="nav-item">
      <button
        type="button"
        className="btn"
        onClick={() => handleCategoryChange("health")}
      >
        Health
      </button>
    </li>
    <li className="nav-item">
      <button
        type="button"
        className="btn"
        onClick={() => handleCategoryChange("science")}
      >
        Science
      </button>
    </li>
    <li className="nav-item">
      <button
        type="button"
        className="btn"
        onClick={() => handleCategoryChange("sports")}
      >
        Sports
      </button>
    </li>
    <li className="nav-item">
      <button
        type="button"
        className="btn"
        onClick={() => handleCategoryChange("technology")}
      >
        Technology
      </button>
    </li>
  </ul>
  </div>
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
                  onClick={() => handleCountryChange("lu")}
                >
                  Luxembourg
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
                  onClick={() => handleCountryChange("es")}
                >
                  Spain
                </button>
              </li>
              <li>
                <button
                  className="dropdown-item"
                  onClick={() => handleCountryChange("sv")}
                >
                  Sweden
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
        <div className="row">
          {loading ? (
            <div
              className="d-flex justify-content-center align-items-center"
              style={{ height: "80vh" }}
            >
              <img src={Loading} alt="loading" />
            </div>
          ) : (
            articles.map((article, index) => (
              <div className="col-md-3 mx-5" key={index}>
                <div
                  className="card mb-4" id="newscard"
                  style={{ width: "25rem", height: "30rem" , backgroundImage:`linear-gradient(90deg, rgba(205,174,238,1) 9%, rgba(162,148,233,0.6502976190476191) 82%)` }}
                  
                >
                  <img
                    src={
                      
                      article.urlToImage ||
                      "https://images.news18.com/ibnlive/uploads/2024/04/oneplus-11-india-price-cut-2024-2024-04-5de3815c40fd693eba7e44b9214c70f0.jpg?impolicy=website&width=640&height=480"
                    }
                    className="card-img-top "
                    alt={article.title}
                    onError={handleImageError}
                    style={{ height: "13rem", transition: "transform .3s ease-in-out" }}
                    
                  />
                  <div className="card-body d-flex flex-column">
                    <h5 className="card-title">{article.title? article.title.length > 130
                          ? article.title.slice(0, 130) + "..."
                          : article.title
                        : "Dive deeper into the story! Get the full scoop on breaking news and trending topics. Click to stay informed."}</h5>
                    <p className="card-text">
                      {article.description
                        ? article.description.length > 130
                          ? article.description.slice(0, 130) + "..."
                          : article.description
                        : "Dive deeper into the story! Get the full scoop on breaking news and trending topics. Click to stay informed."}
                    </p>
                    <a
                      href={article.url}
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
        <div className="d-flex justify-content-between my-4 ">
          <button
            type="button"
            className="btn btn-dark"
            onClick={handlePrevClick}
            disabled={page === 1}
          >
            Previous
          </button>
          <button
            type="button"
            className="btn btn-dark"
            onClick={handleNextClick}
            disabled={articles.length < 6}
          >
            Next
          </button>
        </div>
      </div>
    </div>
    </div>
  );
};

export default News;
