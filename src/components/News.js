import React, { useEffect, useState } from "react";
import axios from "axios";

const News = () => {
  const [articles, setArticles] = useState([]);
  const [page, setPage] = useState(1);
  const [category, setCategory] = useState("general");

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(
          `https://newsapi.org/v2/top-headlines?category=${category}&country=in&apiKey=c5e36d2b53594f76843004cf841cecbe&page=${page}&pageSize=6`
        );
        setArticles(response.data.articles);
      } catch (error) {
        console.error("Error fetching news: ", error);
      }
    };

    fetchData();
  }, [category, page]);

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
                  <p className="card-text">{article.description}</p>
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
