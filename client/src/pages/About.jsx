import aboutImg from "../assets/images/about_img.png";
import bgImg from "../assets/images/bg_jmg1.jpg";
import { FaMapMarkerAlt, FaCalendarAlt, FaStar, FaUsers, FaPlane, FaHotel, FaUtensils, FaCar } from "react-icons/fa";
import "./styles/About.css";

const About = () => {
  return (
    <div className="w-full bg-white">
      {/* Hero Section */}
      <div className="relative w-full h-[300px] md:h-[400px] overflow-hidden hero-section">
        <div 
          className="absolute inset-0 bg-cover bg-center"
          style={{ 
            backgroundImage: `url(${bgImg})`, 
            filter: "brightness(0.6)"
          }}
        ></div>
        <div className="relative h-full flex flex-col items-center justify-center text-white px-4">
          <h1 className="text-4xl md:text-5xl font-bold mb-4 text-center">Discover the World with Us</h1>
          <p className="text-xl md:text-2xl max-w-3xl text-center">Your trusted partner for unforgettable travel experiences</p>
        </div>
      </div>
      
      {/* About Our Company */}
      <div className="max-w-7xl mx-auto px-4 py-16 section-transition">
        <div className="flex flex-col md:flex-row items-center gap-10">
          <div className="md:w-1/2">
            <h2 className="text-3xl font-bold mb-6 text-blue-800">About Our Company</h2>
            <p className="text-gray-700 mb-4 text-lg">
              Welcome to <span className="font-semibold highlight-text">Travel Explorer</span>, where we transform your travel dreams into reality. 
              Founded in 2022, we've quickly established ourselves as a premier travel and tourism service provider, 
              offering curated experiences to destinations around the world.
            </p>
            <p className="text-gray-700 mb-4 text-lg">
              Our mission is to create memorable travel experiences that inspire, educate, and connect people to the world's most 
              beautiful destinations. We believe travel should be accessible, sustainable, and transformative.
            </p>
            <p className="text-gray-700 text-lg">
              With our team of experienced travel experts, we handle every aspect of your journey, from transportation and 
              accommodation to activities and dining, ensuring a seamless and enjoyable experience.
            </p>
          </div>
          <div className="md:w-1/2 mt-6 md:mt-0">
            <div className="rounded-lg overflow-hidden shadow-xl image-shine">
              <img 
                src={aboutImg} 
                className="w-full h-auto object-cover" 
                alt="Our team planning travel experiences" 
              />
            </div>
          </div>
        </div>
      </div>
      
      {/* Why Choose Us */}
      <div className="bg-blue-50 py-16 section-transition">
        <div className="max-w-7xl mx-auto px-4">
          <h2 className="text-3xl font-bold mb-12 text-center text-blue-800">Why Choose Us</h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            <div className="bg-white p-6 rounded-lg shadow-md text-center service-card">
              <div className="text-4xl text-blue-600 flex justify-center mb-4">
                <FaMapMarkerAlt />
              </div>
              <h3 className="text-xl font-bold mb-2">Expertly Crafted Itineraries</h3>
              <p className="text-gray-600">Professionally designed travel experiences tailored to your preferences.</p>
            </div>
            
            <div className="bg-white p-6 rounded-lg shadow-md text-center service-card">
              <div className="text-4xl text-blue-600 flex justify-center mb-4">
                <FaStar />
              </div>
              <h3 className="text-xl font-bold mb-2">Premium Service</h3>
              <p className="text-gray-600">24/7 support throughout your journey to ensure everything runs smoothly.</p>
            </div>
            
            <div className="bg-white p-6 rounded-lg shadow-md text-center service-card">
              <div className="text-4xl text-blue-600 flex justify-center mb-4">
                <FaUsers />
              </div>
              <h3 className="text-xl font-bold mb-2">Personalized Experience</h3>
              <p className="text-gray-600">Custom trips designed around your unique interests and preferences.</p>
            </div>
            
            <div className="bg-white p-6 rounded-lg shadow-md text-center service-card">
              <div className="text-4xl text-blue-600 flex justify-center mb-4">
                <FaCalendarAlt />
              </div>
              <h3 className="text-xl font-bold mb-2">Flexible Booking</h3>
              <p className="text-gray-600">Easy modifications and generous cancellation policies for peace of mind.</p>
            </div>
          </div>
        </div>
      </div>
      
      {/* Our Services */}
      <div className="max-w-7xl mx-auto px-4 py-16 section-transition">
        <h2 className="text-3xl font-bold mb-12 text-center text-blue-800">Our Services</h2>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <div className="flex gap-4 items-start hover:bg-blue-50 p-4 rounded-lg transition-colors duration-300">
            <div className="text-3xl text-blue-600 p-3 bg-blue-100 rounded-full">
              <FaPlane />
            </div>
            <div>
              <h3 className="text-xl font-bold mb-2">Transportation</h3>
              <p className="text-gray-600">From flights to cruise ships and private transfers, we coordinate all your transportation needs for a seamless journey.</p>
            </div>
          </div>
          
          <div className="flex gap-4 items-start hover:bg-blue-50 p-4 rounded-lg transition-colors duration-300">
            <div className="text-3xl text-blue-600 p-3 bg-blue-100 rounded-full">
              <FaHotel />
            </div>
            <div>
              <h3 className="text-xl font-bold mb-2">Accommodation</h3>
              <p className="text-gray-600">Enjoy stays at carefully selected hotels, resorts, and unique properties that enhance your travel experience.</p>
            </div>
          </div>
          
          <div className="flex gap-4 items-start hover:bg-blue-50 p-4 rounded-lg transition-colors duration-300">
            <div className="text-3xl text-blue-600 p-3 bg-blue-100 rounded-full">
              <FaCar />
            </div>
            <div>
              <h3 className="text-xl font-bold mb-2">Guided Tours</h3>
              <p className="text-gray-600">Explore destinations with expert local guides who provide cultural insights and access to hidden gems.</p>
            </div>
          </div>
          
          <div className="flex gap-4 items-start hover:bg-blue-50 p-4 rounded-lg transition-colors duration-300">
            <div className="text-3xl text-blue-600 p-3 bg-blue-100 rounded-full">
              <FaUtensils />
            </div>
            <div>
              <h3 className="text-xl font-bold mb-2">Culinary Experiences</h3>
              <p className="text-gray-600">Discover local cuisines through restaurant recommendations, cooking classes, and food tours.</p>
            </div>
          </div>
        </div>
      </div>
      
      {/* Our Values */}
      <div className="max-w-7xl mx-auto px-4 py-16 section-transition">
        <h2 className="text-3xl font-bold mb-6 text-center text-blue-800">Our Values</h2>
        <p className="text-gray-600 text-center mb-12 max-w-2xl mx-auto">At Travel Explorer, we're guided by a set of core values that shape everything we do.</p>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="border border-blue-200 rounded-lg p-6 text-center bg-gradient-to-b from-white to-blue-50">
            <h3 className="text-xl font-bold mb-3 text-blue-700">Exceptional Service</h3>
            <p className="text-gray-600">We go above and beyond to exceed your expectations at every touchpoint of your journey.</p>
          </div>
          
          <div className="border border-blue-200 rounded-lg p-6 text-center bg-gradient-to-b from-white to-blue-50">
            <h3 className="text-xl font-bold mb-3 text-blue-700">Sustainability</h3>
            <p className="text-gray-600">We're committed to responsible travel practices that preserve destinations for future generations.</p>
          </div>
          
          <div className="border border-blue-200 rounded-lg p-6 text-center bg-gradient-to-b from-white to-blue-50">
            <h3 className="text-xl font-bold mb-3 text-blue-700">Cultural Respect</h3>
            <p className="text-gray-600">We honor local cultures and communities, creating immersive experiences that foster understanding.</p>
          </div>
        </div>
      </div>

      {/* Testimonials Section */}
      <div className="bg-gray-50 py-16 section-transition">
        <div className="max-w-7xl mx-auto px-4">
          <h2 className="text-3xl font-bold mb-2 text-center text-blue-800">What Our Travelers Say</h2>
          <p className="text-gray-600 text-center mb-12 max-w-2xl mx-auto">Don't just take our word for it. Here's what some of our satisfied customers have to say about their experiences with us.</p>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="testimonial-card bg-white p-6">
              <div className="flex items-center mb-4">
                <div className="h-12 w-12 rounded-full bg-blue-100 flex items-center justify-center text-blue-600 font-bold text-xl">
                  JD
                </div>
                <div className="ml-4">
                  <h4 className="font-bold">John Doe</h4>
                  <p className="text-sm text-gray-500">Bali Adventure Package</p>
                </div>
              </div>
              <div className="mb-3 flex">
                {[...Array(5)].map((_, i) => (
                  <FaStar key={i} className="text-yellow-400" />
                ))}
              </div>
              <p className="text-gray-600 italic">"The attention to detail was incredible! From airport pickup to our final departure, everything was meticulously planned and executed. We didn't have to worry about anything."</p>
            </div>
            
            <div className="testimonial-card bg-white p-6">
              <div className="flex items-center mb-4">
                <div className="h-12 w-12 rounded-full bg-blue-100 flex items-center justify-center text-blue-600 font-bold text-xl">
                  JS
                </div>
                <div className="ml-4">
                  <h4 className="font-bold">Jane Smith</h4>
                  <p className="text-sm text-gray-500">European Highlights Tour</p>
                </div>
              </div>
              <div className="mb-3 flex">
                {[...Array(5)].map((_, i) => (
                  <FaStar key={i} className="text-yellow-400" />
                ))}
              </div>
              <p className="text-gray-600 italic">"Our family trip to Europe was the best vacation we've ever had. The accommodations were fantastic, and the guided tours gave us insights we would have never discovered on our own."</p>
            </div>
            
            <div className="testimonial-card bg-white p-6">
              <div className="flex items-center mb-4">
                <div className="h-12 w-12 rounded-full bg-blue-100 flex items-center justify-center text-blue-600 font-bold text-xl">
                  RJ
                </div>
                <div className="ml-4">
                  <h4 className="font-bold">Robert Johnson</h4>
                  <p className="text-sm text-gray-500">Japan Culture Tour</p>
                </div>
              </div>
              <div className="mb-3 flex">
                {[...Array(4)].map((_, i) => (
                  <FaStar key={i} className="text-yellow-400" />
                ))}
                <FaStar className="text-gray-300" />
              </div>
              <p className="text-gray-600 italic">"The local guides were knowledgeable and friendly. They showed us places that weren't in any guidebook and gave us authentic cultural experiences we'll cherish forever."</p>
            </div>
          </div>
        </div>
      </div>
      
      {/* Call to Action */}
      <div className="bg-blue-700 text-white py-16 section-transition">
        <div className="max-w-7xl mx-auto px-4 text-center">
          <h2 className="text-3xl font-bold mb-4">Ready to Start Your Adventure?</h2>
          <p className="text-xl mb-8 max-w-3xl mx-auto">Browse our curated packages or contact us to create a custom travel experience tailored just for you.</p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <button onClick={() => window.location.href = '/'} className="bg-white text-blue-700 hover:bg-blue-50 font-bold py-3 px-8 rounded-lg transition-colors duration-300">
              Explore Packages
            </button>
            <button onClick={() => window.location.href = '/login'} className="bg-transparent hover:bg-blue-600 border-2 border-white font-bold py-3 px-8 rounded-lg transition-colors duration-300">
              Sign Up Now
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default About;
