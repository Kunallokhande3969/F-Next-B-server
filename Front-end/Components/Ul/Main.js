"use client";
import React, { useState } from "react";
import { FiArrowRight } from "react-icons/fi";
import { useSelector } from "react-redux";
import { toast } from "react-toastify";

const Main = () => {
  const [hoveredCard, setHoveredCard] = useState(null);
  const [imageErrors, setImageErrors] = useState({});
  const { isAuthenticated } = useSelector((state) => state.studentReducer);

  const handleProtectedNav = (e, path) => {
    if (!isAuthenticated) {
      e.preventDefault();
      if (!toast.isActive("auth-error")) {
        toast.error("Please log in to access resources.", {
          toastId: "auth-error",
        });
      }
    } else {
      window.location.href = path;
    }
  };

  const handleImageError = (index) => {
    setImageErrors(prev => ({ ...prev, [index]: true }));
  };

 // Replace the image URLs with these reliable ones:
const careerCards = [
  {
    src: "https://images.unsplash.com/photo-1551434678-e076c223a692?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80",
    alt: "Internship Opportunities",
    title: "Internship Opportunities",
    description: "Kickstart your career with hands-on experience",
    primaryAction: "Internships",
    secondaryAction: "Apply now",
  },
  {
    src: "https://images.unsplash.com/photo-1517245386807-bb43f82c33c4?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80",
    alt: "Experienced Hiring",
    title: "Experienced Hiring",
    description: "Find the perfect role for your expertise",
    primaryAction: "Find Jobs",
    secondaryAction: "Apply now",
  },
  {
    src: "https://images.unsplash.com/photo-1522202176988-66273c2fd55f?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80",
    alt: "Career Development",
    title: "Career Development",
    description: "Enhance your skills and grow professionally",
    primaryAction: "Know more",
    secondaryAction: "Apply now",
    isOutline: true,
  },
];

  // Fallback background colors for when images fail to load
  const fallbackColors = [
    "linear-gradient(135deg, #667eea 0%, #764ba2 100%)",
    "linear-gradient(135deg, #f093fb 0%, #f5576c 100%)",
    "linear-gradient(135deg, #4facfe 0%, #00f2fe 100%)"
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 flex flex-col">
      <main className="flex-grow">
        <section className="w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 md:py-16">
          {/* Header Section */}
          <div className="text-center mb-12 md:mb-16">
            <h1 className="text-4xl font-bold text-gray-900 mb-2">
              <span className="text-blue-600">Career</span>Hub
            </h1>
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              Make Your <span className="text-blue-600">Dream Career</span> A Reality
            </h2>
            <p className="text-lg md:text-xl text-gray-600 max-w-3xl mx-auto">
              Discover opportunities that align with your aspirations and skills
            </p>
          </div>

          {/* Career Cards Grid */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-8 mb-10 md:mb-12">
            {careerCards.map((card, index) => (
              <div
                key={index}
                className={`relative group overflow-hidden rounded-2xl shadow-lg hover:shadow-2xl bg-white transform transition-all duration-500 min-h-[400px] flex flex-col
                  ${hoveredCard === index ? "scale-[1.02] -translate-y-2" : "scale-100"}`}
                onMouseEnter={() => setHoveredCard(index)}
                onMouseLeave={() => setHoveredCard(null)}
              >
                {/* Image/Fallback Container */}
                <div 
                  className="h-48 w-full relative overflow-hidden"
                  style={{
                    background: imageErrors[index] ? fallbackColors[index] : 'transparent'
                  }}
                >
                  {!imageErrors[index] ? (
                    <img
                      src={card.src}
                      alt={card.alt}
                      className="w-full h-full object-cover"
                      onError={() => handleImageError(index)}
                    />
                  ) : (
                    <div className="w-full h-full flex items-center justify-center text-white">
                      <div className="text-center">
                        <div className="text-4xl font-bold mb-2">{card.primaryAction}</div>
                        <div className="text-sm opacity-90">{card.title}</div>
                      </div>
                    </div>
                  )}
                </div>

                {/* Content Section */}
                <div className="flex-1 p-6 flex flex-col">
                  <div className="flex-1">
                    <h3 className="text-xl font-bold text-gray-900 mb-3">
                      {card.title}
                    </h3>
                    <p className="text-gray-600 mb-6 leading-relaxed">
                      {card.description}
                    </p>
                  </div>

                  {/* Action Buttons */}
                  <div className="flex gap-3">
                    <button
                      onClick={(e) => handleProtectedNav(e, "/student")}
                      className={`flex-1 py-3 px-4 rounded-lg font-semibold transition-all duration-300 ${
                        card.isOutline
                          ? "border-2 border-blue-600 text-blue-600 hover:bg-blue-600 hover:text-white"
                          : "bg-blue-600 text-white hover:bg-blue-700"
                      } focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 flex items-center justify-center`}
                    >
                      {card.primaryAction}
                      {!card.isOutline && (
                        <FiArrowRight className="ml-2 transition-transform duration-300 group-hover:translate-x-1" />
                      )}
                    </button>
                    <button
                      onClick={(e) => handleProtectedNav(e, "/apply")}
                      className="flex-1 py-3 px-4 rounded-lg font-semibold border-2 border-gray-300 text-gray-700 hover:border-blue-600 hover:text-blue-600 transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
                    >
                      {card.secondaryAction}
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Bottom CTA */}
          <div className="text-center">
            <button
              onClick={(e) => handleProtectedNav(e, "/student")}
              className="inline-flex items-center px-8 py-4 bg-blue-600 text-white font-semibold rounded-lg text-lg hover:bg-blue-700 transition-all duration-300 shadow-lg hover:shadow-xl transform hover:scale-105 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
            >
              Explore All Opportunities
              <FiArrowRight className="ml-2 transition-transform duration-300 group-hover:translate-x-1" />
            </button>
          </div>
        </section>
      </main>
    </div>
  );
};

export default Main;