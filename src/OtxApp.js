import React, { useState, useEffect } from "react";
import axios from "axios";
import "./OtxApp.css"; // Import the CSS file

const OtxApp = () => {
  const [domain, setDomain] = useState("");
  const [limit, setLimit] = useState(10); // Default value for limit
  const [page, setPage] = useState(1); // Default value for page
  const [filterParams, setFilterParams] = useState("");
  const [data, setData] = useState([]);
  const [filteredData, setFilteredData] = useState([]);
  const [loading, setLoading] = useState(false);

  const fetchData = async () => {
    try {
      setLoading(true);
      const response = await fetch(
        `https://otx.alienvault.com/api/v1/indicators/domain/${domain}/url_list?limit=100000000`
      );
      const responseData = await response.json();
      setData(responseData.url_list);
    } catch (error) {
      console.error("Error fetching data:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    // Filter the data based on the query parameter when the data or filterParams change
    const filtered = data.filter((item) => {
      if (!filterParams) {
        return true; // If filterParams is empty, include all items
      }

      const filterArray = filterParams
        .split(",")
        .map((param) => param.trim().toLowerCase());
      return filterArray.some((filterParam) =>
        item.url.toLowerCase().includes(filterParam)
      );
    });
    setFilteredData(filtered);
  }, [data, filterParams]);

  const highlightKeywords = (url, keywords) => {
    if (!keywords) {
      return url;
    }

    const keywordArray = keywords
      .split(",")
      .map((keyword) => keyword.trim().toLowerCase());
    const regex = new RegExp(`(${keywordArray.join("|")})`, "gi");

    return url.split(regex).map((part, index) => {
      if (keywordArray.includes(part.toLowerCase())) {
        return (
          <span key={index} style={{ color: "red" }}>
            {part}
          </span>
        );
      }
      return part;
    });
  };

  const handleFilterChange = (e) => {
    setFilterParams(e.target.value);
  };

  const handleFetchClick = () => {
    fetchData();
  };

  const handleNextClick = () => {
    setPage((prevPage) => prevPage + 1);
  };

  const handlePreviousClick = () => {
    if (page > 1) {
      setPage((prevPage) => prevPage - 1);
    }
  };

  return (
    <div>
      <div className="input-container">
        <input
          type="text"
          value={domain}
          onChange={(e) => setDomain(e.target.value)}
          placeholder="Enter Domain"
        />
        {/* <input
          type="number"
          value={limit}
          onChange={(e) => setLimit(e.target.value)}
          placeholder="Limit"
        /> */}
        <input
          type="text"
          value={filterParams}
          onChange={handleFilterChange}
          placeholder="Filter URL (comma separated)"
        />
        <button disabled={domain.length == 0} onClick={handleFetchClick}>
          Fetch Data
        </button>
      </div>

      {/* Display the data fetched from the API */}
      <div className="table-container">
        {loading ? (
          <p>Loading...</p>
        ) : data && data.length > 0 && filteredData.length > 0 ? (
          <table className="custom-table">
            <thead>
              <tr>
                <th>No</th>
                <th>URL</th>
                <th>Date</th>
                <th>Domain</th>
                <th>Hostname</th>
              </tr>
            </thead>
            {/* Render the filteredData here */}
            <tbody>
              {filteredData.map((item, index) => {
                const urlParts = item.url.toLowerCase().split(/[ ,]+/);
                return (
                  <tr key={index}>
                    <td>{index + 1}</td>
                    <td>
                      <a href={item.url}>
                        {highlightKeywords(item.url, filterParams)}
                      </a>
                    </td>
                    <td>{item.date}</td>
                    <td>{item.domain}</td>
                    <td>{item.hostname}</td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        ) : (
          <p>No data to display</p>
        )}

        {/* {data && data.length > 0 ? (
          <table className="custom-table">
            <thead>
              <tr>
                <th>No</th>
                <th>URL</th>
                <th>Date</th>
                <th>Domain</th>
                <th>Hostname</th>
              </tr>
            </thead>
            <tbody>
              {filteredData.map((item, index) => (
                <tr key={index}>
                  <td>{index + 1}</td>
                  <td>
                    <a href={item.url}>{item.url}</a>
                  </td>
                  <td>{item.date}</td>
                  <td>{item.domain}</td>
                  <td>{item.hostname}</td>
                </tr>
              ))}
            </tbody>
          </table>
        ) : (
          <p>No data to display</p>
        )} */}
      </div>
      {/* <div className="input-container">
        <button onClick={handlePreviousClick}>Previous</button>
        <input
          type="number"
          value={page}
          onChange={(e) => setPage(e.target.value)}
          placeholder="Page"
        />
        <button onClick={handleNextClick}>Next</button>
      </div> */}
    </div>
  );
};

export default OtxApp;
