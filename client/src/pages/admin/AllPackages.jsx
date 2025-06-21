import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import "../styles/AllPackages.css";

const AllPackages = () => {
  const [packages, setPackages] = useState([]);
  const [loading, setLoading] = useState(false);
  const [filter, setFilter] = useState("all");
  const [search, setSearch] = useState("");
  const [showMoreBtn, setShowMoreBtn] = useState(false);

  const getPackages = async () => {
    setPackages([]);
    try {
      setLoading(true);
      let url =
        filter === "offer" //offer
          ? `/api/package/get-packages?searchTerm=${search}&offer=true`
          : filter === "latest" //latest
          ? `/api/package/get-packages?searchTerm=${search}&sort=createdAt`
          : filter === "top" //top rated
          ? `/api/package/get-packages?searchTerm=${search}&sort=packageRating`
          : `/api/package/get-packages?searchTerm=${search}`; //all
      const res = await fetch(url);
      const data = await res.json();
      if (data?.success) {
        setPackages(data?.packages);
        setLoading(false);
      } else {
        setLoading(false);
        alert(data?.message || "Something went wrong!");
      }
      if (data?.packages?.length > 8) {
        setShowMoreBtn(true);
      } else {
        setShowMoreBtn(false);
      }
    } catch (error) {
      console.log(error);
    }
  };

  const onShowMoreSClick = async () => {
    const numberOfPackages = packages.length;
    const startIndex = numberOfPackages;
    let url =
      filter === "offer" //offer
        ? `/api/package/get-packages?searchTerm=${search}&offer=true&startIndex=${startIndex}`
        : filter === "latest" //latest
        ? `/api/package/get-packages?searchTerm=${search}&sort=createdAt&startIndex=${startIndex}`
        : filter === "top" //top rated
        ? `/api/package/get-packages?searchTerm=${search}&sort=packageRating&startIndex=${startIndex}`
        : `/api/package/get-packages?searchTerm=${search}&startIndex=${startIndex}`; //all
    const res = await fetch(url);
    const data = await res.json();
    if (data?.packages?.length < 9) {
      setShowMoreBtn(false);
    }
    setPackages([...packages, ...data?.packages]);
  };

  useEffect(() => {
    getPackages();
  }, [filter, search]);

  const handleDelete = async (packageId) => {
    try {
      setLoading(true);
      const res = await fetch(`/api/package/delete-package/${packageId}`, {
        method: "DELETE",
      });
      const data = await res.json();
      alert(data?.message);
      getPackages();
      setLoading(false);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="w-full max-w-6xl mx-auto px-2 md:px-6">
      <div className="all-packages-header">
        <input
          className="all-packages-search"
          type="text"
          placeholder="Search packages..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
        <div className="all-packages-filters">
          <button
            className={`all-packages-filter-btn${
              filter === "all" ? " active" : ""
            }`}
            id="all"
            onClick={() => setFilter("all")}
          >
            All
          </button>
          <button
            className={`all-packages-filter-btn${
              filter === "offer" ? " active" : ""
            }`}
            id="offer"
            onClick={() => setFilter("offer")}
          >
            Offer
          </button>
          <button
            className={`all-packages-filter-btn${
              filter === "latest" ? " active" : ""
            }`}
            id="latest"
            onClick={() => setFilter("latest")}
          >
            Latest
          </button>
          <button
            className={`all-packages-filter-btn${
              filter === "top" ? " active" : ""
            }`}
            id="top"
            onClick={() => setFilter("top")}
          >
            Top
          </button>
        </div>
      </div>
      {/* Packages Grid */}
      <div className="all-packages-grid">
        {loading
          ? Array.from({ length: 6 }).map((_, i) => (
              <div className="skeleton-card" key={i}>
                <div className="skeleton-img" />
                <div style={{ flex: 1 }}>
                  <div
                    className="skeleton-text"
                    style={{ width: "70%" }}
                  />
                  <div
                    className="skeleton-text"
                    style={{ width: "40%" }}
                  />
                </div>
                <div className="skeleton-btn" />
              </div>
            ))
          : packages && packages.length > 0
          ? packages.map((pack, i) => (
              <div className="package-card" key={pack._id}>
                <Link to={`/package/${pack._id}`}>
                  <img
                    src={pack?.packageImages[0]}
                    alt="package"
                    className="package-card-img"
                  />
                </Link>
                <div className="package-card-info">
                  <Link to={`/package/${pack._id}`}>
                    <div
                      className="package-card-title"
                      title={pack?.packageName}
                    >
                      {pack?.packageName}
                    </div>
                  </Link>
                  <div className="package-card-meta">
                    {pack?.packageDestination} &bull;{" "}
                    {pack?.packageDays}D/{pack?.packageNights}N
                  </div>
                  <div className="package-card-price">
                    {pack?.packageOffer ? (
                      <>
                        <span
                          style={{
                            textDecoration: "line-through",
                            color: "#64748b",
                            fontWeight: 400,
                          }}
                        >
                          ${pack?.packagePrice}
                        </span>
                        <span style={{ marginLeft: 8 }}>
                          ${pack?.packageDiscountPrice}
                        </span>
                      </>
                    ) : (
                      <>${pack?.packagePrice}</>
                    )}
                  </div>
                </div>
                <div className="package-card-actions">
                  <Link to={`/profile/admin/update-package/${pack._id}`}>
                    <button disabled={loading}>
                      {loading ? "Loading..." : "Edit"}
                    </button>
                  </Link>
                  <button
                    className="delete-btn"
                    disabled={loading}
                    onClick={() => handleDelete(pack?._id)}
                  >
                    {loading ? "Loading..." : "Delete"}
                  </button>
                </div>
              </div>
            ))
          : (
            <h1 className="text-center text-2xl col-span-full">
              No Packages Yet!
            </h1>
          )}
      </div>
      {showMoreBtn && !loading && (
        <div className="flex justify-center">
          <button
            onClick={onShowMoreSClick}
            className="text-sm bg-green-700 text-white hover:underline p-2 m-3 rounded text-center w-max"
          >
            Show More
          </button>
        </div>
      )}
    </div>
  );
};

export default AllPackages;
