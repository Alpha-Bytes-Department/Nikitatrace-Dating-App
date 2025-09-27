

const Testimonial = () => {
  return (
    <div className="p-4 mb-6 overflow-hidden sm:p-6">
      <style>
        {`
          @keyframes marqueeLeft {
            0% { transform: translateX(0); }
            100% { transform: translateX(-50%); }
          }
          @keyframes marqueeRight {
            0% { transform: translateX(-50%); }
            100% { transform: translateX(0); }
          }
          .marquee-wrapper {
            display: flex;
            width: 200%; /* Double width for duplicated content */
          }
          .marquee-left {
            animation: marqueeLeft 20s linear infinite;
          }
          .marquee-right {
            animation: marqueeRight 20s linear infinite;
          }
          .marquee-wrapper:hover {
            animation-play-state: paused;
          }
          .marquee-content {
            display: flex;
            width: 100%; /* Full width to accommodate all cards */
            gap: 1.25rem; /* gap-5 = 1.25rem for smaller screens */
            justify-content: flex-start;
          }
          .card {
            flex-shrink: 0; /* Prevent cards from shrinking */
            width: 300px; /* Default width for larger screens */
            height: 200px;
          }
          @media (min-width: 641px) {
            .marquee-content {
              gap: 2.5rem; /* gap-10 = 2.5rem for desktop */
            }
            .card {
              width: 380px; /* Larger width for desktop */
              height: 250px;
            }
          }
          @media (max-width: 640px) {
            .marquee-left, .marquee-right {
              animation-duration: 10s; /* Slower speed for better visibility on phones */
            }
            .marquee-content p {
              font-size: 0.75rem; /* Smaller text for phones */
              margin: 0 1px;
            }
            .card {
              width: 250px; /* Adjusted width for phones */
              height: 180px;
            }
            .card img {
              height: 10px; /* Smaller image on phones */
              width: 10px;
            }
            .card svg {
              width: 3px; /* Smaller stars on phones */
              height: 3px;
            }
          }
        `}
      </style>
      <div className="overflow-hidden whitespace-nowrap">
        <div className="marquee-wrapper marquee-left">
          <div className="marquee-content">
            <div className="card">
              <div className="p-3 sm:p-5 shadow-2xl rounded-2xl">
                <div className="flex justify-between">
                  <div className="flex items-center gap-2 sm:gap-3">
                    <div>
                      <img
                        src="https://d2gwgwt9a7yxle.cloudfront.net/what_is_user_id_in_net_banking_mobile_871b681e52.jpg"
                        className="h-8 w-8 sm:h-12 sm:w-12 rounded-full object-cover"
                        alt="User Profile"
                      />
                    </div>
                    <div>
                      <h1 className="text-xs sm:text-sm font-medium text-gray-900">
                        User Name
                      </h1>
                      <div className="flex items-center">
                        <svg
                          className="w-2 h-2 sm:w-4 sm:h-4 text-yellow-400 fill-current"
                          viewBox="0 0 24 24"
                        >
                          <path d="M12 .587l3.668 7.431 8.332 1.151-6.001 5.822 1.418 8.257L12 18.897l-7.417 3.364 1.418-8.257-6.001-5.822 8.332-1.151z" />
                        </svg>
                        <svg
                          className="w-2 h-2 sm:w-4 sm:h-4 text-yellow-400 fill-current"
                          viewBox="0 0 24 24"
                        >
                          <path d="M12 .587l3.668 7.431 8.332 1.151-6.001 5.822 1.418 8.257L12 18.897l-7.417 3.364 1.418-8.257-6.001-5.822 8.332-1.151z" />
                        </svg>
                        <svg
                          className="w-2 h-2 sm:w-4 sm:h-4 text-yellow-400 fill-current"
                          viewBox="0 0 24 24"
                        >
                          <path d="M12 .587l3.668 7.431 8.332 1.151-6.001 5.822 1.418 8.257L12 18.897l-7.417 3.364 1.418-8.257-6.001-5.822 8.332-1.151z" />
                        </svg>
                        <svg
                          className="w-2 h-2 sm:w-4 sm:h-4 text-yellow-400 fill-current"
                          viewBox="0 0 24 24"
                        >
                          <path d="M12 .587l3.668 7.431 8.332 1.151-6.001 5.822 1.418 8.257L12 18.897l-7.417 3.364 1.418-8.257-6.001-5.822 8.332-1.151z" />
                        </svg>
                        <svg
                          className="w-2 h-2 sm:w-4 sm:h-4 text-gray-300 fill-current"
                          viewBox="0 0 24 24"
                        >
                          <path d="M12 .587l3.668 7.431 8.332 1.151-6.001 5.822 1.418 8.257L12 18.897l-7.417 3.364 1.418-8.257-6.001-5.822 8.332-1.151z" />
                        </svg>
                      </div>
                    </div>
                  </div>
                  <div className="ml-auto text-green-700 font-bold text-3xl sm:text-6xl">
                    &quot;
                  </div>
                </div>
                <p className="text-xs sm:text-sm text-gray-600 mt-1 text-wrap">
                  This is a sample testimonial about a product or service. It
                  highlights the ease of use, great features, and overall
                  satisfaction with the experience.
                </p>
              </div>
            </div>
            <div className="card">
              <div className="p-3 sm:p-5 shadow-2xl rounded-2xl">
                <div className="flex justify-between">
                  <div className="flex items-center gap-2 sm:gap-3">
                    <div>
                      <img
                        src="https://d2gwgwt9a7yxle.cloudfront.net/what_is_user_id_in_net_banking_mobile_871b681e52.jpg"
                        className="h-8 w-8 sm:h-12 sm:w-12 rounded-full object-cover"
                        alt="User Profile"
                      />
                    </div>
                    <div>
                      <h1 className="text-xs sm:text-sm font-medium text-gray-900">
                        User Name
                      </h1>
                      <div className="flex items-center">
                        <svg
                          className="w-2 h-2 sm:w-4 sm:h-4 text-yellow-400 fill-current"
                          viewBox="0 0 24 24"
                        >
                          <path d="M12 .587l3.668 7.431 8.332 1.151-6.001 5.822 1.418 8.257L12 18.897l-7.417 3.364 1.418-8.257-6.001-5.822 8.332-1.151z" />
                        </svg>
                        <svg
                          className="w-2 h-2 sm:w-4 sm:h-4 text-yellow-400 fill-current"
                          viewBox="0 0 24 24"
                        >
                          <path d="M12 .587l3.668 7.431 8.332 1.151-6.001 5.822 1.418 8.257L12 18.897l-7.417 3.364 1.418-8.257-6.001-5.822 8.332-1.151z" />
                        </svg>
                        <svg
                          className="w-2 h-2 sm:w-4 sm:h-4 text-yellow-400 fill-current"
                          viewBox="0 0 24 24"
                        >
                          <path d="M12 .587l3.668 7.431 8.332 1.151-6.001 5.822 1.418 8.257L12 18.897l-7.417 3.364 1.418-8.257-6.001-5.822 8.332-1.151z" />
                        </svg>
                        <svg
                          className="w-2 h-2 sm:w-4 sm:h-4 text-yellow-400 fill-current"
                          viewBox="0 0 24 24"
                        >
                          <path d="M12 .587l3.668 7.431 8.332 1.151-6.001 5.822 1.418 8.257L12 18.897l-7.417 3.364 1.418-8.257-6.001-5.822 8.332-1.151z" />
                        </svg>
                        <svg
                          className="w-2 h-2 sm:w-4 sm:h-4 text-gray-300 fill-current"
                          viewBox="0 0 24 24"
                        >
                          <path d="M12 .587l3.668 7.431 8.332 1.151-6.001 5.822 1.418 8.257L12 18.897l-7.417 3.364 1.418-8.257-6.001-5.822 8.332-1.151z" />
                        </svg>
                      </div>
                    </div>
                  </div>
                  <div className="ml-auto text-green-700 font-bold text-3xl sm:text-6xl">
                    &quot;
                  </div>
                </div>
                <p className="text-xs sm:text-sm text-gray-600 mt-1 text-wrap">
                  This is a sample testimonial about a product or service. It
                  highlights the ease of use, great features, and overall
                  satisfaction with the experience.
                </p>
              </div>
            </div>
            <div className="card">
              <div className="p-3 sm:p-5 shadow-2xl rounded-2xl">
                <div className="flex justify-between">
                  <div className="flex items-center gap-2 sm:gap-3">
                    <div>
                      <img
                        src="https://d2gwgwt9a7yxle.cloudfront.net/what_is_user_id_in_net_banking_mobile_871b681e52.jpg"
                        className="h-8 w-8 sm:h-12 sm:w-12 rounded-full object-cover"
                        alt="User Profile"
                      />
                    </div>
                    <div>
                      <h1 className="text-xs sm:text-sm font-medium text-gray-900">
                        User Name
                      </h1>
                      <div className="flex items-center">
                        <svg
                          className="w-2 h-2 sm:w-4 sm:h-4 text-yellow-400 fill-current"
                          viewBox="0 0 24 24"
                        >
                          <path d="M12 .587l3.668 7.431 8.332 1.151-6.001 5.822 1.418 8.257L12 18.897l-7.417 3.364 1.418-8.257-6.001-5.822 8.332-1.151z" />
                        </svg>
                        <svg
                          className="w-2 h-2 sm:w-4 sm:h-4 text-yellow-400 fill-current"
                          viewBox="0 0 24 24"
                        >
                          <path d="M12 .587l3.668 7.431 8.332 1.151-6.001 5.822 1.418 8.257L12 18.897l-7.417 3.364 1.418-8.257-6.001-5.822 8.332-1.151z" />
                        </svg>
                        <svg
                          className="w-2 h-2 sm:w-4 sm:h-4 text-yellow-400 fill-current"
                          viewBox="0 0 24 24"
                        >
                          <path d="M12 .587l3.668 7.431 8.332 1.151-6.001 5.822 1.418 8.257L12 18.897l-7.417 3.364 1.418-8.257-6.001-5.822 8.332-1.151z" />
                        </svg>
                        <svg
                          className="w-2 h-2 sm:w-4 sm:h-4 text-yellow-400 fill-current"
                          viewBox="0 0 24 24"
                        >
                          <path d="M12 .587l3.668 7.431 8.332 1.151-6.001 5.822 1.418 8.257L12 18.897l-7.417 3.364 1.418-8.257-6.001-5.822 8.332-1.151z" />
                        </svg>
                        <svg
                          className="w-2 h-2 sm:w-4 sm:h-4 text-gray-300 fill-current"
                          viewBox="0 0 24 24"
                        >
                          <path d="M12 .587l3.668 7.431 8.332 1.151-6.001 5.822 1.418 8.257L12 18.897l-7.417 3.364 1.418-8.257-6.001-5.822 8.332-1.151z" />
                        </svg>
                      </div>
                    </div>
                  </div>
                  <div className="ml-auto text-green-700 font-bold text-3xl sm:text-6xl">
                    &quot;
                  </div>
                </div>
                <p className="text-xs sm:text-sm text-gray-600 mt-1 text-wrap">
                  This is a sample testimonial about a product or service. It
                  highlights the ease of use, great features, and overall
                  satisfaction with the experience.
                </p>
              </div>
            </div>
            <div className="card">
              <div className="p-3 sm:p-5 shadow-2xl rounded-2xl">
                <div className="flex justify-between">
                  <div className="flex items-center gap-2 sm:gap-3">
                    <div>
                      <img
                        src="https://d2gwgwt9a7yxle.cloudfront.net/what_is_user_id_in_net_banking_mobile_871b681e52.jpg"
                        className="h-8 w-8 sm:h-12 sm:w-12 rounded-full object-cover"
                        alt="User Profile"
                      />
                    </div>
                    <div>
                      <h1 className="text-xs sm:text-sm font-medium text-gray-900">
                        User Name
                      </h1>
                      <div className="flex items-center">
                        <svg
                          className="w-2 h-2 sm:w-4 sm:h-4 text-yellow-400 fill-current"
                          viewBox="0 0 24 24"
                        >
                          <path d="M12 .587l3.668 7.431 8.332 1.151-6.001 5.822 1.418 8.257L12 18.897l-7.417 3.364 1.418-8.257-6.001-5.822 8.332-1.151z" />
                        </svg>
                        <svg
                          className="w-2 h-2 sm:w-4 sm:h-4 text-yellow-400 fill-current"
                          viewBox="0 0 24 24"
                        >
                          <path d="M12 .587l3.668 7.431 8.332 1.151-6.001 5.822 1.418 8.257L12 18.897l-7.417 3.364 1.418-8.257-6.001-5.822 8.332-1.151z" />
                        </svg>
                        <svg
                          className="w-2 h-2 sm:w-4 sm:h-4 text-yellow-400 fill-current"
                          viewBox="0 0 24 24"
                        >
                          <path d="M12 .587l3.668 7.431 8.332 1.151-6.001 5.822 1.418 8.257L12 18.897l-7.417 3.364 1.418-8.257-6.001-5.822 8.332-1.151z" />
                        </svg>
                        <svg
                          className="w-2 h-2 sm:w-4 sm:h-4 text-yellow-400 fill-current"
                          viewBox="0 0 24 24"
                        >
                          <path d="M12 .587l3.668 7.431 8.332 1.151-6.001 5.822 1.418 8.257L12 18.897l-7.417 3.364 1.418-8.257-6.001-5.822 8.332-1.151z" />
                        </svg>
                        <svg
                          className="w-2 h-2 sm:w-4 sm:h-4 text-gray-300 fill-current"
                          viewBox="0 0 24 24"
                        >
                          <path d="M12 .587l3.668 7.431 8.332 1.151-6.001 5.822 1.418 8.257L12 18.897l-7.417 3.364 1.418-8.257-6.001-5.822 8.332-1.151z" />
                        </svg>
                      </div>
                    </div>
                  </div>
                  <div className="ml-auto text-green-700 font-bold text-3xl sm:text-6xl">
                    &quot;
                  </div>
                </div>
                <p className="text-xs sm:text-sm text-gray-600 mt-1 text-wrap">
                  This is a sample testimonial about a product or service. It
                  highlights the ease of use, great features, and overall
                  satisfaction with the experience.
                </p>
              </div>
            </div>
          </div>
        </div>

        <div className="marquee-wrapper marquee-right">
          <div className="marquee-content">
            <div className="card">
              <div className="p-3 sm:p-5 shadow-2xl rounded-2xl">
                <div className="flex justify-between">
                  <div className="flex items-center gap-2 sm:gap-3">
                    <div>
                      <img
                        src="https://d2gwgwt9a7yxle.cloudfront.net/what_is_user_id_in_net_banking_mobile_871b681e52.jpg"
                        className="h-8 w-8 sm:h-12 sm:w-12 rounded-full object-cover"
                        alt="User Profile"
                      />
                    </div>
                    <div>
                      <h1 className="text-xs sm:text-sm font-medium text-gray-900">
                        User Name
                      </h1>
                      <div className="flex items-center">
                        <svg
                          className="w-2 h-2 sm:w-4 sm:h-4 text-yellow-400 fill-current"
                          viewBox="0 0 24 24"
                        >
                          <path d="M12 .587l3.668 7.431 8.332 1.151-6.001 5.822 1.418 8.257L12 18.897l-7.417 3.364 1.418-8.257-6.001-5.822 8.332-1.151z" />
                        </svg>
                        <svg
                          className="w-2 h-2 sm:w-4 sm:h-4 text-yellow-400 fill-current"
                          viewBox="0 0 24 24"
                        >
                          <path d="M12 .587l3.668 7.431 8.332 1.151-6.001 5.822 1.418 8.257L12 18.897l-7.417 3.364 1.418-8.257-6.001-5.822 8.332-1.151z" />
                        </svg>
                        <svg
                          className="w-2 h-2 sm:w-4 sm:h-4 text-yellow-400 fill-current"
                          viewBox="0 0 24 24"
                        >
                          <path d="M12 .587l3.668 7.431 8.332 1.151-6.001 5.822 1.418 8.257L12 18.897l-7.417 3.364 1.418-8.257-6.001-5.822 8.332-1.151z" />
                        </svg>
                        <svg
                          className="w-2 h-2 sm:w-4 sm:h-4 text-yellow-400 fill-current"
                          viewBox="0 0 24 24"
                        >
                          <path d="M12 .587l3.668 7.431 8.332 1.151-6.001 5.822 1.418 8.257L12 18.897l-7.417 3.364 1.418-8.257-6.001-5.822 8.332-1.151z" />
                        </svg>
                        <svg
                          className="w-2 h-2 sm:w-4 sm:h-4 text-gray-300 fill-current"
                          viewBox="0 0 24 24"
                        >
                          <path d="M12 .587l3.668 7.431 8.332 1.151-6.001 5.822 1.418 8.257L12 18.897l-7.417 3.364 1.418-8.257-6.001-5.822 8.332-1.151z" />
                        </svg>
                      </div>
                    </div>
                  </div>
                  <div className="ml-auto text-green-700 font-bold text-3xl sm:text-6xl">
                    &quot;
                  </div>
                </div>
                <p className="text-xs sm:text-sm text-gray-600 mt-1 text-wrap">
                  This is a sample testimonial about a product or service. It
                  highlights the ease of use, great features, and overall
                  satisfaction with the experience.
                </p>
              </div>
            </div>
            <div className="card">
              <div className="p-3 sm:p-5 shadow-2xl rounded-2xl">
                <div className="flex justify-between">
                  <div className="flex items-center gap-2 sm:gap-3">
                    <div>
                      <img
                        src="https://d2gwgwt9a7yxle.cloudfront.net/what_is_user_id_in_net_banking_mobile_871b681e52.jpg"
                        className="h-8 w-8 sm:h-12 sm:w-12 rounded-full object-cover"
                        alt="User Profile"
                      />
                    </div>
                    <div>
                      <h1 className="text-xs sm:text-sm font-medium text-gray-900">
                        User Name
                      </h1>
                      <div className="flex items-center">
                        <svg
                          className="w-2 h-2 sm:w-4 sm:h-4 text-yellow-400 fill-current"
                          viewBox="0 0 24 24"
                        >
                          <path d="M12 .587l3.668 7.431 8.332 1.151-6.001 5.822 1.418 8.257L12 18.897l-7.417 3.364 1.418-8.257-6.001-5.822 8.332-1.151z" />
                        </svg>
                        <svg
                          className="w-2 h-2 sm:w-4 sm:h-4 text-yellow-400 fill-current"
                          viewBox="0 0 24 24"
                        >
                          <path d="M12 .587l3.668 7.431 8.332 1.151-6.001 5.822 1.418 8.257L12 18.897l-7.417 3.364 1.418-8.257-6.001-5.822 8.332-1.151z" />
                        </svg>
                        <svg
                          className="w-2 h-2 sm:w-4 sm:h-4 text-yellow-400 fill-current"
                          viewBox="0 0 24 24"
                        >
                          <path d="M12 .587l3.668 7.431 8.332 1.151-6.001 5.822 1.418 8.257L12 18.897l-7.417 3.364 1.418-8.257-6.001-5.822 8.332-1.151z" />
                        </svg>
                        <svg
                          className="w-2 h-2 sm:w-4 sm:h-4 text-yellow-400 fill-current"
                          viewBox="0 0 24 24"
                        >
                          <path d="M12 .587l3.668 7.431 8.332 1.151-6.001 5.822 1.418 8.257L12 18.897l-7.417 3.364 1.418-8.257-6.001-5.822 8.332-1.151z" />
                        </svg>
                        <svg
                          className="w-2 h-2 sm:w-4 sm:h-4 text-gray-300 fill-current"
                          viewBox="0 0 24 24"
                        >
                          <path d="M12 .587l3.668 7.431 8.332 1.151-6.001 5.822 1.418 8.257L12 18.897l-7.417 3.364 1.418-8.257-6.001-5.822 8.332-1.151z" />
                        </svg>
                      </div>
                    </div>
                  </div>
                  <div className="ml-auto text-green-700 font-bold text-3xl sm:text-6xl">
                    &quot;
                  </div>
                </div>
                <p className="text-xs sm:text-sm text-gray-600 mt-1 text-wrap">
                  This is a sample testimonial about a product or service. It
                  highlights the ease of use, great features, and overall
                  satisfaction with the experience.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Testimonial;