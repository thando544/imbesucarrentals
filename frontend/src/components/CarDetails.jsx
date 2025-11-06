import React, { useEffect } from "react";
import { carDetailStyles } from "../assets/dummyStyles";
import carsData from "../assets/HcarsData";
import { toast, ToastContainer } from "react-toastify";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import { useState } from "react";
import {
  FaArrowLeft,
  FaCalendarAlt,
  FaCheckCircle,
  FaCreditCard,
  FaEnvelope,
  FaGasPump,
  FaMapMarkedAlt,
  FaPhone,
  FaTachometerAlt,
  FaUser,
  FaUserFriends,
} from "react-icons/fa";

const CarDetails = () => {
  const { id } = useParams();
  const location = useLocation(); // Fixed: Call the hook
  const navigate = useNavigate(); // Fixed: Call the hook

  const [today, setToday] = useState("");
  useEffect(() => {
    setToday(new Date().toISOString().split("T")[0]);
  }, []);

  const car = location.state?.car || carsData.find((c) => String(c.id) === id);
  if (!car) return <div className="p-4 text-white">Car not found.</div>;

  const transmissionLabel = car.transmission
    ? car.transmission.toLowerCase()
    : "standard";

  const [currentImage, setCurrentImage] = useState(0);
  const carImages = [car.image, ...(car.images || [])];

  const initialForm = {
    pickupDate: "",
    returnDate: "",
    pickupLocation: "",
    name: "",
    email: "",
    phone: "",
  };

  const [formData, setFormData] = useState(initialForm);
  const [activeField, setActiveField] = useState(null);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((fd) => ({
      ...fd,
      [name]: value,
    }));
  };

  const calculateTotal = () => {
    const { pickupDate, returnDate } = formData;
    if (pickupDate && returnDate) {
      const days = Math.max(
        1,
        Math.ceil(new Date(returnDate) - new Date(pickupDate)) /
          (1000 * 60 * 60 * 24)
      );
      return days * car.price;
    }
    return car.price;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Booking Data:", formData);
    toast.success("Booking confirmed!", {
      position: "top-right",
      autoClose: 3000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
    });
    setFormData(initialForm);
  };

  const handleFocus = (field) => {
    setActiveField(field);
  };

  const handleBlur = () => {
    setActiveField(null);
  };

  return (
    <div className={carDetailStyles.pageContainer}>
      <div className={carDetailStyles.contentContainer}>
        <ToastContainer />
        <button
          onClick={() => navigate(-1)}
          className={carDetailStyles.backButton}
        >
          <FaArrowLeft className={carDetailStyles.backButtonIcon} />
        </button>

        <div className={carDetailStyles.mainLayout}>
          <div className={carDetailStyles.leftColumn}>
            <div className={carDetailStyles.imageCarousel}>
              <img
                src={carImages[currentImage]}
                alt={car.name}
                className={carDetailStyles.carImage}
              />
              {carImages.length > 1 && (
                <div className={carDetailStyles.carouselIndicators}>
                  {carImages.map((__, idx) => (
                    <button
                      key={idx}
                      onClick={() => setCurrentImage(idx)}
                      className={carDetailStyles.carouselIndicator(
                        idx === currentImage
                      )}
                    ></button>
                  ))}
                </div>
              )}
            </div>

            <h1 className={carDetailStyles.carName}>{car.name}</h1>
            <p className={carDetailStyles.carPrice}>
              ${car.price}{" "}
              <span className={carDetailStyles.pricePerDay}>/ day</span>
            </p>

            <div className={carDetailStyles.specsGrid}>
              {[
                {
                  Icon: FaUserFriends,
                  label: "Seats",
                  value: car.seats,
                  color: "text-orange-400",
                },
                {
                  Icon: FaGasPump,
                  label: "Fuel",
                  value: car.fuel,
                  color: "text-green-400",
                },
                {
                  Icon: FaTachometerAlt,
                  label: "Mileage",
                  value: car.mileage,
                  color: "text-yellow-400",
                },
                {
                  Icon: FaCheckCircle,
                  label: "Transmission",
                  value: transmissionLabel,
                  color: "text-purple-400",
                },
              ].map((spec, i) => (
                <div key={i} className={carDetailStyles.specCard}>
                  <spec.Icon
                    className={`${spec.color} ${carDetailStyles.specIcon}`}
                  />
                  <p className={carDetailStyles.specLabel}>{spec.label}</p>
                  <p className={carDetailStyles.specValue}>{spec.value}</p>
                </div>
              ))}
            </div>

            <div className={carDetailStyles.aboutSection}>
              <h2 className={carDetailStyles.aboutTitle}>About this car</h2>
              <p className={carDetailStyles.aboutText}>
                Experience luxury in th {car.name}. With its {transmissionLabel}{" "}
                transmission and seating for {car.seats}, every journey is
                exceptional
              </p>
              <p>
                {car.description ||
                  "This car combines comfort and perfomance for an uncomfortable drive "}
              </p>
            </div>
          </div>

          <div className={carDetailStyles.rightColumn}>
            <div className={carDetailStyles.bookingCard}>
              <h2 className={carDetailStyles.bookingTitle}>
                Reserve{" "}
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-orange-400 to-orange-500">
                  Your Drive
                </span>
              </h2>
              <p className={carDetailStyles.bookingSubtitle}>
                Fast &middot; Secure &middot; Easy
              </p>

              <form onSubmit={handleSubmit} className={carDetailStyles.form}>
                <div className={carDetailStyles.grid2}>
                  <div className="flex flex-col">
                    <label
                      htmlFor="pickupDate"
                      className={carDetailStyles.formLabel}
                    >
                      Pickup Date
                    </label>
                    <div
                      className={carDetailStyles.inputContainer(
                        activeField === "pickupDate"
                      )}
                    >
                      <div className={carDetailStyles.inputIcon}>
                        <FaCalendarAlt />
                      </div>
                      <input
                        type="date"
                        id="pickupDate"
                        name="pickupDate"
                        min={today}
                        onChange={handleInputChange}
                        onFocus={() => handleFocus("pickupDate")}
                        onBlur={handleBlur}
                        required
                        className={carDetailStyles.inputField}
                      />
                    </div>
                  </div>
                  <div className="flex flex-col">
                    <label
                      htmlFor="returnData"
                      className={carDetailStyles.formLabel}
                    >
                      Return Date
                    </label>
                    <div
                      className={carDetailStyles.inputContainer(
                        activeField === "returnDate"
                      )}
                    >
                      <div className={carDetailStyles.inputIcon}>
                        <FaCalendarAlt />
                      </div>
                      <input
                        type="date"
                        id="returnDate"
                        name="returnDate"
                        min={formData.returnDate || today}
                        onChange={handleInputChange}
                        onFocus={() => handleFocus("returnDate")}
                        onBlur={handleBlur}
                        required
                        className={carDetailStyles.inputField}
                      />
                    </div>
                  </div>
                </div>

                <div className="flex flex-col">
                  <label className={carDetailStyles.formLabel}>
                    Pickup Location
                  </label>
                  <div
                    className={carDetailStyles.inputContainer(
                      activeField === "pickupLocation"
                    )}
                  >
                    <div className={carDetailStyles.inputIcon}>
                      <FaMapMarkedAlt />
                    </div>
                    <input
                      type="text"
                      value={formData.pickupLocation}
                      name="pickupLocation"
                      placeholder="Enter your pickup location"
                      onChange={handleInputChange}
                      onFocus={() => handleFocus("pickupLocation")}
                      onBlur={handleBlur}
                      required
                      className={carDetailStyles.textInputField}
                    />
                  </div>
                </div>

                <div className="flex flex-col">
                  <label className={carDetailStyles.formLabel}>Full Name</label>
                  <div
                    className={carDetailStyles.inputContainer(
                      activeField === "name"
                    )}
                  >
                    <div className={carDetailStyles.inputIcon}>
                      <FaUser />
                    </div>
                    <input
                      type="text"
                      value={formData.name}
                      name="name"
                      placeholder="Your full name"
                      onChange={handleInputChange}
                      onFocus={() => handleFocus("name")}
                      onBlur={handleBlur}
                      required
                      className={carDetailStyles.textInputField}
                    />
                  </div>
                </div>

                <div className="flex flex-col">
                  <label className={carDetailStyles.formLabel}>Full Name</label>
                  <div
                    className={carDetailStyles.inputContainer(
                      activeField === "email"
                    )}
                  >
                    <div className={carDetailStyles.inputIcon}>
                      <FaEnvelope />
                    </div>
                    <input
                      type="email"
                      value={formData.email}
                      name="email"
                      placeholder="Your email address"
                      onChange={handleInputChange}
                      onFocus={() => handleFocus("email")}
                      onBlur={handleBlur}
                      required
                      className={carDetailStyles.textInputField}
                    />
                  </div>
                </div>

                <div className="flex flex-col">
                  <label className={carDetailStyles.formLabel}>
                    Phone Number
                  </label>
                  <div
                    className={carDetailStyles.inputContainer(
                      activeField === "phone"
                    )}
                  >
                    <div className={carDetailStyles.inputIcon}>
                      <FaPhone />
                    </div>
                    <input
                      type="tel"
                      value={formData.phone}
                      name="phone"
                      placeholder="Your Phone Number"
                      onChange={handleInputChange}
                      onFocus={() => handleFocus("phone")}
                      onBlur={handleBlur}
                      required
                      className={carDetailStyles.textInputField}
                    />
                  </div>
                </div>

                <div className={carDetailStyles.priceBreakdown}>
                  <div className={carDetailStyles.priceRow}>
                    <span>Rate/day</span>
                    <span>${car.price}</span>
                  </div>
                  {formData.pickupDate && formData.returnDate && (
                    <div className={carDetailStyles.priceRow}>
                      <span>Days</span>
                      <span>
                        {Math.max(
                          1,
                          Math.ceil(
                            (new Date(formData.returnDate) -
                              new Date(formData.pickupDate)) /
                              (1000 * 60 * 60 * 24)
                          )
                        )}
                      </span>
                    </div>
                  )}
                  <div className={carDetailStyles.totalRow}>
                    <span>Total</span>
                    <span>${calculateTotal()}</span>
                  </div>
                </div>

                <button type="submit" className={carDetailStyles.submitButton}>
                  <FaCreditCard className="mr-2 group-hover:scale-110 transition-transform" />
                  <span>Comfirm Booking</span>
                </button>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CarDetails;
