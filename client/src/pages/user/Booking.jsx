import React, { useEffect, useState } from "react";
import { FaClock, FaMapMarkerAlt, FaCreditCard, FaCalendarAlt, FaLock } from "react-icons/fa";
import { useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router";
import axios from "axios";
import "../styles/Booking.css";

const Booking = () => {
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
  const [bookingSuccess, setBookingSuccess] = useState(false);
  const [bookingData, setBookingData] = useState({
    totalPrice: 0,
    packageDetails: null,
    buyer: null,
    persons: 1,
    date: null,
  });
  const [paymentData, setPaymentData] = useState({
    cardNumber: "",
    cardholderName: "",
    expiryDate: "",
    cvv: "",
  });
  const [paymentErrors, setPaymentErrors] = useState({});
  const [currentDate, setCurrentDate] = useState("");

  const getPackageData = async () => {
    try {
      setLoading(true);
      const res = await fetch(
        `/api/package/get-package-data/${params?.packageId}`
      );
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

  // Initialize booking setup
  useEffect(() => {
    if (currentUser) {
      setBookingData(prev => ({
        ...prev,
        buyer: currentUser._id
      }));
    }
  }, [currentUser]);

  // Validate payment data
  const validatePaymentData = () => {
    const errors = {};
    
    // Validate card number (should be 16 digits for most cards)
    if (!paymentData.cardNumber.trim() || !/^[0-9]{16}$/.test(paymentData.cardNumber.replace(/\s/g, ''))) {
      errors.cardNumber = "Please enter a valid 16-digit card number";
    }
    
    // Validate cardholder name
    if (!paymentData.cardholderName.trim()) {
      errors.cardholderName = "Cardholder name is required";
    }
    
    // Validate expiry date (MM/YY format)
    if (!paymentData.expiryDate.trim() || !/^(0[1-9]|1[0-2])\/([0-9]{2})$/.test(paymentData.expiryDate)) {
      errors.expiryDate = "Please enter a valid expiry date (MM/YY)";
    } else {
      // Check if card is expired
      const [month, year] = paymentData.expiryDate.split('/');
      const expiryDate = new Date(2000 + parseInt(year), parseInt(month) - 1, 1);
      const currentDate = new Date();
      
      if (expiryDate < currentDate) {
        errors.expiryDate = "Card has expired";
      }
    }
    
    // Validate CVV (3 or 4 digits)
    if (!paymentData.cvv.trim() || !/^[0-9]{3,4}$/.test(paymentData.cvv)) {
      errors.cvv = "Please enter a valid CVV code (3-4 digits)";
    }
    
    return errors;
  };

  //handle payment & book package
  const handleBookPackage = async () => {
    if (
      bookingData.packageDetails === "" ||
      bookingData.buyer === "" ||
      bookingData.totalPrice <= 0 ||
      bookingData.persons <= 0 ||
      bookingData.date === ""
    ) {
      alert("All booking details are required!");
      return;
    }

    // Validate payment data
    const errors = validatePaymentData();
    if (Object.keys(errors).length > 0) {
      setPaymentErrors(errors);
      return;
    }
    
    // Clear any previous errors
    setPaymentErrors({});
    
    try {
      setLoading(true);
      
      // Simulate payment processing delay
      await new Promise(resolve => setTimeout(resolve, 1500));
      
      const res = await fetch(`/api/booking/book-package/${params?.id}`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(bookingData),
      });
      
      const data = await res.json();
      
      if (data?.success) {
        setLoading(false);
        setBookingSuccess(true);
        setTimeout(() => {
          navigate(`/profile/${currentUser?.user_role === 1 ? "admin" : "user"}`);
        }, 3000);
      } else {
        setLoading(false);
        alert(data?.message || "Booking failed. Please try again.");
      }
    } catch (error) {
      console.log(error);
      setLoading(false);
      alert("An error occurred. Please try again.");
    }
  };

  useEffect(() => {
    if (params?.packageId) {
      getPackageData();
    }
    let date = new Date().toISOString().substring(0, 10);
    let d = date.substring(0, 8) + (parseInt(date.substring(8)) + 1);
    setCurrentDate(d);
  }, [params?.packageId]);

  useEffect(() => {
    if (packageData && params?.packageId) {
      setBookingData({
        ...bookingData,
        packageDetails: params?.packageId,
        buyer: currentUser?._id,
        totalPrice: packageData?.packageDiscountPrice
          ? packageData?.packageDiscountPrice * bookingData?.persons
          : packageData?.packagePrice * bookingData?.persons,
      });
    }
  }, [packageData, params]);

  return (
    <div className="w-full flex flex-col items-center">
      <div className="w-[95%] flex flex-col items-center p-6 rounded shadow-2xl gap-3">
        <h1 className="text-center font-bold text-2xl">Book Package</h1>
        {/* user info */}
        <div className="w-full flex flex-wrap justify-center gap-2">
          <div className="pr-3 md:border-r md:pr-6">
            <div className="flex flex-col p-2 w-64 xsm:w-72 h-fit gap-2">
              <div className="flex flex-col">
                <label htmlFor="username" className="font-semibold">
                  Username:
                </label>
                <input
                  type="text"
                  id="username"
                  className="p-1 rounded border border-black"
                  value={currentUser.username}
                  disabled
                />
              </div>
              <div className="flex flex-col">
                <label htmlFor="email" className="font-semibold">
                  Email:
                </label>
                <input
                  type="email"
                  id="email"
                  className="p-1 rounded border border-black"
                  value={currentUser.email}
                  disabled
                />
              </div>
              <div className="flex flex-col">
                <label htmlFor="address" className="font-semibold">
                  Address:
                </label>
                <textarea
                  maxLength={200}
                  type="text"
                  id="address"
                  className="p-1 rounded border border-black resize-none"
                  value={currentUser.address}
                  disabled
                />
              </div>
              <div className="flex flex-col">
                <label htmlFor="phone" className="font-semibold">
                  Phone:
                </label>
                <input
                  type="text"
                  id="phone"
                  className="p-1 rounded border border-black"
                  value={currentUser.phone}
                  disabled
                />
              </div>
            </div>
          </div>
          {/* package info */}
          <div className="pl-3 md:border-l md:pl-6">
            <div className="flex flex-col gap-1">
              <div className="flex flex-wrap gap-2">
                <img
                  className="w-28"
                  src={packageData.packageImages[0]}
                  alt="Package image"
                />
                <div>
                  <p className="font-semibold text-lg mb-1 capitalize">
                    {packageData.packageName}
                  </p>
                  <p className="flex gap-2 text-green-700 font-semibold capitalize">
                    <FaMapMarkerAlt /> {packageData.packageDestination}
                  </p>
                  {/* days & nights */}
                  {(+packageData.packageDays > 0 ||
                    +packageData.packageNights > 0) && (
                    <p className="flex items-center gap-2">
                      <FaClock />
                      {+packageData.packageDays > 0 &&
                        (+packageData.packageDays > 1
                          ? packageData.packageDays + " Days"
                          : packageData.packageDays + " Day")}
                      {+packageData.packageDays > 0 &&
                        +packageData.packageNights > 0 &&
                        " - "}
                      {+packageData.packageNights > 0 &&
                        (+packageData.packageNights > 1
                          ? packageData.packageNights + " Nights"
                          : packageData.packageNights + " Night")}
                    </p>
                  )}
                </div>
              </div>
              <div className="flex flex-col my-1">
                <label className="font-semibold" htmlFor="date">
                  Select Date:
                </label>
                <input
                  type="date"
                  min={currentDate !== "" ? currentDate : ""}
                  //   min={"2024-01-23"}
                  id="date"
                  className="w-max border rounded"
                  onChange={(e) => {
                    setBookingData({ ...bookingData, date: e.target.value });
                  }}
                />
              </div>
              {/* price */}
              <p className="flex gap-1 text-xl font-semibold my-1">
                Price:
                {packageData.packageOffer ? (
                  <>
                    <span className="line-through text-gray-700">
                      ${packageData.packagePrice}
                    </span>{" "}
                    -<span>${packageData.packageDiscountPrice}</span>
                    <span className="text-lg ml-2 bg-green-700 p-1 rounded text-white">
                      {Math.floor(
                        ((+packageData.packagePrice -
                          +packageData.packageDiscountPrice) /
                          +packageData.packagePrice) *
                          100
                      )}
                      % Off
                    </span>
                  </>
                ) : (
                  <span className="text-green-700">
                    ${packageData.packagePrice}
                  </span>
                )}
              </p>
              {/* price */}
              <div className="flex border-2 w-max">
                <button
                  className="p-2 py-1 font-semibold"
                  onClick={() => {
                    if (bookingData.persons > 1) {
                      setBookingData({
                        ...bookingData,
                        persons: (bookingData.persons -= 1),
                        totalPrice: packageData.packageDiscountPrice
                          ? packageData.packageDiscountPrice *
                            bookingData.persons
                          : packageData.packagePrice * bookingData.persons,
                      });
                    }
                  }}
                >
                  -
                </button>
                <input
                  value={bookingData.persons}
                  disabled
                  type="text"
                  className="border w-10 text-center text-lg"
                />
                <button
                  className="p-2 py-1 font-semibold"
                  onClick={() => {
                    if (bookingData.persons < 10) {
                      setBookingData({
                        ...bookingData,
                        persons: (bookingData.persons += 1),
                        totalPrice: packageData.packageDiscountPrice
                          ? packageData.packageDiscountPrice *
                            bookingData.persons
                          : packageData.packagePrice * bookingData.persons,
                      });
                    }
                  }}
                >
                  +
                </button>
              </div>
              <p className="text-xl font-semibold">
                Total Price:
                <span className="text-green-700">
                  $
                  {packageData.packageDiscountPrice
                    ? packageData.packageDiscountPrice * bookingData.persons
                    : packageData.packagePrice * bookingData.persons}
                </span>
              </p>
              <div className="my-2 max-w-[350px] gap-1">
                {bookingSuccess ? (
                  <div className="success-message bg-green-100 border border-green-400 text-green-700 px-4 py-5 rounded relative flex flex-col items-center" role="alert">
                    <svg className="h-16 w-16 text-green-600 mb-2" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"></path>
                    </svg>
                    <strong className="font-bold text-lg">Booking Successful! </strong>
                    <span className="block text-center mt-1">Your package has been booked!</span>
                    <p className="mt-4 text-sm flex items-center">
                      <svg className="animate-spin h-4 w-4 mr-2" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                      </svg>
                      Redirecting to your profile...
                    </p>
                  </div>
                ) : (
                  <>
                    <div className="mb-3">
                      <p className="font-semibold text-lg mb-2 flex items-center">
                        <FaCreditCard className="mr-2 text-blue-600" /> Payment Details
                      </p>
                      
                      {/* Card Number */}
                      <div className="mb-2">
                        <label htmlFor="cardNumber" className="block text-sm font-medium text-gray-700">Card Number</label>
                        <input
                          type="text"
                          id="cardNumber"
                          placeholder="1234 5678 9012 3456"
                          className={`mt-1 p-2 w-full border ${paymentErrors.cardNumber ? 'border-red-500' : 'border-gray-300'} rounded-md`}
                          value={paymentData.cardNumber}
                          onChange={(e) => {
                            // Allow only numbers and format with spaces
                            const value = e.target.value.replace(/\D/g, '').substring(0, 16);
                            // Add spaces every 4 digits
                            const formattedValue = value.replace(/(\d{4})/g, '$1 ').trim();
                            setPaymentData({...paymentData, cardNumber: formattedValue});
                          }}
                          maxLength={19}
                        />
                        {paymentErrors.cardNumber && <p className="mt-1 text-xs text-red-500">{paymentErrors.cardNumber}</p>}
                      </div>
                      
                      {/* Cardholder Name */}
                      <div className="mb-2">
                        <label htmlFor="cardholderName" className="block text-sm font-medium text-gray-700">Cardholder Name</label>
                        <input
                          type="text"
                          id="cardholderName"
                          placeholder="John Doe"
                          className={`mt-1 p-2 w-full border ${paymentErrors.cardholderName ? 'border-red-500' : 'border-gray-300'} rounded-md`}
                          value={paymentData.cardholderName}
                          onChange={(e) => setPaymentData({...paymentData, cardholderName: e.target.value})}
                        />
                        {paymentErrors.cardholderName && <p className="mt-1 text-xs text-red-500">{paymentErrors.cardholderName}</p>}
                      </div>
                      
                      {/* Expiry Date and CVV in one row */}
                      <div className="flex gap-4">
                        <div className="mb-2 flex-1">
                          <label htmlFor="expiryDate" className="block text-sm font-medium text-gray-700">Expiry Date</label>
                          <div className="relative">
                            <input
                              type="text"
                              id="expiryDate"
                              placeholder="MM/YY"
                              className={`mt-1 p-2 w-full border ${paymentErrors.expiryDate ? 'border-red-500' : 'border-gray-300'} rounded-md`}
                              value={paymentData.expiryDate}
                              onChange={(e) => {
                                let value = e.target.value.replace(/\D/g, '');
                                if (value.length > 2) {
                                  value = value.substring(0, 2) + '/' + value.substring(2, 4);
                                }
                                setPaymentData({...paymentData, expiryDate: value});
                              }}
                              maxLength={5}
                            />
                            <FaCalendarAlt className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                          </div>
                          {paymentErrors.expiryDate && <p className="mt-1 text-xs text-red-500">{paymentErrors.expiryDate}</p>}
                        </div>
                        
                        <div className="mb-2 flex-1">
                          <label htmlFor="cvv" className="block text-sm font-medium text-gray-700">CVV</label>
                          <div className="relative">
                            <input
                              type="text"
                              id="cvv"
                              placeholder="123"
                              className={`mt-1 p-2 w-full border ${paymentErrors.cvv ? 'border-red-500' : 'border-gray-300'} rounded-md`}
                              value={paymentData.cvv}
                              onChange={(e) => {
                                const value = e.target.value.replace(/\D/g, '').substring(0, 4);
                                setPaymentData({...paymentData, cvv: value});
                              }}
                              maxLength={4}
                            />
                            <FaLock className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                          </div>
                          {paymentErrors.cvv && <p className="mt-1 text-xs text-red-500">{paymentErrors.cvv}</p>}
                        </div>
                      </div>
                      
                      <div className="flex items-center mt-3">
                        <img src="https://cdn.visa.com/v2/assets/images/logos/visa/blue/logo.png" alt="Visa" className="h-6 mr-2" />
                        <img src="https://www.mastercard.com/content/dam/public/brandcenter/en/mclogo-with-padding.svg" alt="MasterCard" className="h-6" />
                      </div>
                    </div>
                    
                    <button
                      className={`p-2 rounded w-full ${loading ? 'bg-gray-400' : 'bg-blue-600'} text-white payment-btn hover:opacity-95 cursor-pointer flex items-center justify-center`}
                      onClick={handleBookPackage}
                      disabled={loading || !currentUser?.address}
                    >
                      {loading ? (
                        <>
                          <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                            <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                          </svg>
                          Processing Payment...
                        </>
                      ) : (
                        "Complete Booking"
                      )}
                    </button>
                  </>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Booking;
