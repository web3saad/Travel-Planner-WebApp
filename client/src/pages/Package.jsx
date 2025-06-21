import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router";
import { Link } from "react-router-dom";
import { Swiper, SwiperSlide } from "swiper/react";
import SwiperCore from "swiper";
import { Navigation } from "swiper/modules";
import "swiper/css/bundle";
import {
  FaArrowDown,
  FaArrowLeft,
  FaArrowRight,
  FaArrowUp,
  FaClock,
  FaMapMarkerAlt,
  FaShare,
} from "react-icons/fa";
import Rating from "@mui/material/Rating";
import { useSelector } from "react-redux";
import RatingCard from "./RatingCard";
import "./styles/PackagePage.css";

const Package = () => {
  SwiperCore.use([Navigation]);
  const { currentUser } = useSelector((state) => state.user);
  const params = useParams();
  const navigate = useNavigate();
  const [packageData, setPackageData] = useState({
    packageName: "",
    packageDescription: "",
    packageDestination: "",
    packageDays: 1,
    packageNights: 1,
    packageAccommodation: "",
    packageTransportation: "",
    packageMeals: "",
    packageActivities: "",
    packagePrice: 500,
    packageDiscountPrice: 0,
    packageOffer: false,
    packageRating: 0,
    packageTotalRatings: 0,
    packageImages: [],
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);
  const [copied, setCopied] = useState(false);
  const [ratingsData, setRatingsData] = useState({
    rating: 0,
    review: "",
    packageId: params?.id,
    userRef: currentUser?._id,
    username: currentUser?.username,
    userProfileImg: currentUser?.avatar,
  });
  const [packageRatings, setPackageRatings] = useState([]);
  const [ratingGiven, setRatingGiven] = useState(false);

  const getPackageData = async () => {
    try {
      setLoading(true);
      const res = await fetch(`/api/package/get-package-data/${params?.id}`);
      const data = await res.json();
      if (data?.success) {
        setPackageData({
          packageName: data?.packageData?.packageName,
          packageDescription: data?.packageData?.packageDescription,
          packageDestination: data?.packageData?.packageDestination,
          packageDays: data?.packageData?.packageDays,
          packageNights: data?.packageData?.packageNights,
          packageAccommodation: data?.packageData?.packageAccommodation,
          packageTransportation: data?.packageData?.packageTransportation,
          packageMeals: data?.packageData?.packageMeals,
          packageActivities: data?.packageData?.packageActivities,
          packagePrice: data?.packageData?.packagePrice,
          packageDiscountPrice: data?.packageData?.packageDiscountPrice,
          packageOffer: data?.packageData?.packageOffer,
          packageRating: data?.packageData?.packageRating,
          packageTotalRatings: data?.packageData?.packageTotalRatings,
          packageImages: data?.packageData?.packageImages,
        });
        setLoading(false);
      } else {
        setError(data?.message || "Something went wrong!");
        setLoading(false);
      }
    } catch (error) {
      console.log(error);
    }
  };

  const giveRating = async () => {
    checkRatingGiven();
    if (ratingGiven) {
      alert("You already submittd your rating!");
      return;
    }
    if (ratingsData.rating === 0 && ratingsData.review === "") {
      alert("Atleast 1 field is required!");
      return;
    }
    if (
      ratingsData.rating === 0 &&
      ratingsData.review === "" &&
      !ratingsData.userRef
    ) {
      alert("All fields are required!");
      return;
    }
    try {
      setLoading(true);
      const res = await fetch("/api/rating/give-rating", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(ratingsData),
      });
      const data = await res.json();
      if (data?.success) {
        setLoading(false);
        alert(data?.message);
        getPackageData();
        getRatings();
        checkRatingGiven();
      } else {
        setLoading(false);
        alert(data?.message || "Something went wrong!");
      }
    } catch (error) {
      console.log(error);
    }
  };

  const getRatings = async () => {
    try {
      const res = await fetch(`/api/rating/get-ratings/${params.id}/4`);
      const data = await res.json();
      if (data) {
        setPackageRatings(data);
      } else {
        setPackageRatings("No ratings yet!");
      }
    } catch (error) {
      console.log(error);
    }
  };

  const checkRatingGiven = async () => {
    try {
      const res = await fetch(
        `/api/rating/rating-given/${currentUser?._id}/${params?.id}`
      );
      const data = await res.json();
      setRatingGiven(data?.given);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    if (params.id) {
      getPackageData();
      getRatings();
    }
    if (currentUser) {
      checkRatingGiven();
    }
  }, [params.id, currentUser]);

  return (
    <div className="w-full max-w-5xl mx-auto px-2 md:px-6">
      {loading && (
        <p className="text-center font-semibold" id="loading">
          Loading...
        </p>
      )}
      {error && (
        <div className="flex flex-col w-full items-center gap-2">
          <p className="text-center text-red-700">Something went wrong!</p>
          <Link
            className="bg-slate-600 text-white p-3 py-2 rounded-lg w-min"
            to="/"
          >
            Back
          </Link>
        </div>
      )}
      {packageData && !loading && !error && (
        <div className="w-full">
          {/* Hero Image Carousel */}
          <div className="package-hero mb-6">
            <Swiper navigation>
              {packageData?.packageImages.map((imageUrl, i) => (
                <SwiperSlide key={i}>
                  <div
                    style={{
                      background: `url(${imageUrl}) center no-repeat`,
                      backgroundSize: "cover",
                    }}
                  ></div>
                </SwiperSlide>
              ))}
            </Swiper>
            {/* Share & Back Buttons */}
            <div className="absolute top-5 right-5 z-10 border rounded-full w-12 h-12 flex justify-center items-center bg-white/80 shadow cursor-pointer">
              <FaShare
                className="text-slate-500"
                onClick={() => {
                  navigator.clipboard.writeText(window.location.href);
                  setCopied(true);
                  setTimeout(() => {
                    setCopied(false);
                  }, 2000);
                }}
              />
            </div>
            {copied && (
              <p className="fixed top-[23%] right-[5%] z-10 rounded-md bg-slate-100 p-2 shadow">
                Link copied!
              </p>
            )}
            <div className="absolute top-5 left-5 z-10 border rounded-full w-12 h-12 flex justify-center items-center bg-white/80 shadow cursor-pointer">
              <FaArrowLeft
                className="text-slate-500"
                onClick={() => {
                  navigate("/");
                }}
              />
            </div>
          </div>

          {/* Summary Section */}
          <div className="package-summary">
            <div>
              <div className="package-title capitalize">
                {packageData?.packageName}
              </div>
              <div className="package-meta">
                <span className="flex items-center gap-1 text-green-700 font-semibold">
                  <FaMapMarkerAlt /> {packageData?.packageDestination}
                </span>
                <span className="flex items-center gap-1">
                  <FaClock />
                  {+packageData?.packageDays > 0 &&
                    (+packageData?.packageDays > 1
                      ? packageData?.packageDays + " Days"
                      : packageData?.packageDays + " Day")}
                  {+packageData?.packageDays > 0 &&
                    +packageData?.packageNights > 0 &&
                    " - "}
                  {+packageData?.packageNights > 0 &&
                    (+packageData?.packageNights > 1
                      ? packageData?.packageNights + " Nights"
                      : packageData?.packageNights + " Night")}
                </span>
                {packageData?.packageTotalRatings > 0 && (
                  <span className="flex items-center gap-1">
                    <Rating
                      value={packageData?.packageRating || 0}
                      readOnly
                      precision={0.1}
                      size="small"
                    />
                    <span className="text-gray-500 text-sm">
                      ({packageData?.packageTotalRatings})
                    </span>
                  </span>
                )}
              </div>
            </div>
            <div className="package-price">
              {packageData?.packageOffer ? (
                <>
                  <span className="line-through text-gray-400 text-lg">
                    ${packageData?.packagePrice}
                  </span>
                  <span>${packageData?.packageDiscountPrice}</span>
                  <span className="discount">
                    {Math.floor(
                      ((+packageData?.packagePrice -
                        +packageData?.packageDiscountPrice) /
                        +packageData?.packagePrice) *
                        100
                    )}
                    % Off
                  </span>
                </>
              ) : (
                <span>${packageData?.packagePrice}</span>
              )}
            </div>
          </div>

          {/* Description */}
          <div className="package-description">
            {packageData?.packageDescription}
          </div>

          {/* Details Grid */}
          <div className="package-details-grid">
            <div className="package-detail-card">
              <h4>Accommodation</h4>
              <p>{packageData?.packageAccommodation}</p>
            </div>
            <div className="package-detail-card">
              <h4>Activities</h4>
              <p>{packageData?.packageActivities}</p>
            </div>
            <div className="package-detail-card">
              <h4>Meals</h4>
              <p>{packageData?.packageMeals}</p>
            </div>
            <div className="package-detail-card">
              <h4>Transportation</h4>
              <p>{packageData?.packageTransportation}</p>
            </div>
          </div>

          {/* Sticky Book Button */}
          <div className="sticky-book-btn">
            <button
              type="button"
              onClick={() => {
                if (currentUser) {
                  navigate(`/booking/${params?.id}`);
                } else {
                  navigate("/login");
                }
              }}
            >
              Book This Package
            </button>
          </div>

          {/* Reviews Section */}
          <div className="w-full flex flex-col mt-8 items-center">
            {packageRatings && (
              <>
                <h4 className="text-2xl font-bold mb-2">Ratings & Reviews</h4>
                <div
                  className={`w-full sm:max-w-[640px] gap-2 ${
                    !currentUser || ratingGiven
                      ? "hidden"
                      : "flex flex-col items-center"
                  } `}
                >
                  <Rating
                    name="simple-controlled"
                    className="w-max"
                    value={ratingsData?.rating}
                    onChange={(e, newValue) => {
                      setRatingsData({
                        ...ratingsData,
                        rating: newValue,
                      });
                    }}
                  />
                  <textarea
                    className="w-full resize-none p-3 border border-black rounded"
                    rows={3}
                    placeholder="Share your experience..."
                    value={ratingsData?.review}
                    onChange={(e) => {
                      setRatingsData({
                        ...ratingsData,
                        review: e.target.value,
                      });
                    }}
                  ></textarea>
                  <button
                    disabled={
                      (ratingsData.rating === 0 &&
                        ratingsData.review === "") ||
                      loading
                    }
                    type="button"
                    onClick={(e) => {
                      e.preventDefault();
                      giveRating();
                    }}
                    className="w-full p-2 bg-green-700 text-white rounded disabled:opacity-80 hover:opacity-95"
                  >
                    {loading ? "Loading..." : "Submit Review"}
                  </button>
                  <hr />
                </div>
                <div className="mt-3 w-full gap-2 grid 2xl:grid-cols-6 xl:grid-cols-5 xlplus:grid-cols-4 lg:grid-cols-3 md:grid-cols-2">
                  <RatingCard packageRatings={packageRatings} />
                  {packageData.packageTotalRatings > 4 && (
                    <button
                      onClick={() =>
                        navigate(`/package/ratings/${params?.id}`)
                      }
                      className="flex items-center justify-center text-lg gap-2 p-2 rounded border hover:bg-slate-500 hover:text-white"
                    >
                      View All <FaArrowRight />
                    </button>
                  )}
                </div>
              </>
            )}
            {(!currentUser || currentUser === null) && (
              <button
                onClick={() => {
                  navigate("/login");
                }}
                className="p-2 rounded text-white bg-green-700 mt-4"
              >
                Rate This Package
              </button>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default Package;
