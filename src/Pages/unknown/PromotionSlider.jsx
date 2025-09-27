import img from '../../../assets/logo/sponsorLogo.png';

const PromotionSlider = () => {
  const cards = [
    { id: 1, logo: img },
    { id: 2, logo: img },
    { id: 3, logo: img },
    { id: 1, logo: img },
    { id: 2, logo: img },
    { id: 3, logo: img },
    { id: 1, logo: img },
    { id: 2, logo: img },
    { id: 3, logo: img },
    { id: 1, logo: img },
    { id: 2, logo: img },
    { id: 3, logo: img },
    { id: 1, logo: img },
    { id: 2, logo: img },
    { id: 3, logo: img },
    { id: 1, logo: img },
    { id: 2, logo: img },
    { id: 3, logo: img },
  ];

  const duplicatedCards = [...cards, ...cards]; // Duplicate to ensure continuous loop

  return (
    <div className="p-4 mb-6 overflow-hidden sm:p-6">
      <style>
        {`
          @keyframes marquee {
            0% { transform: translateX(0); }
            100% { transform: translateX(-50%); } /* Move half the total width for seamless loop */
          }
          .marquee-container {
            display: flex;
            gap: 1.25rem; /* gap-5 = 1.25rem for smaller screens, adjustable */
            animation: marquee 30s linear infinite;
            width: 200%; /* Double width to accommodate duplicated content */
          }
          .marquee-container:hover {
            animation-play-state: paused;
          }
          .card-container {
            flex-shrink: 0;
            width: calc(33.33vw - 0.9375rem); /* ~33% viewport width minus half gap for 3 cards per view */
            max-width: 150px;
            min-width: 100px;
            height: 80px; /* Fixed height for consistency */
          }
          @media (min-width: 641px) {
            .marquee-container {
              gap: 2.5rem; /* gap-10 = 2.5rem for desktop */
            }
            .card-container {
              width: calc(50vw - 3.75rem); /* 50% viewport width minus half gap */
              max-width: 200px;
              min-width: 150px;
              height: 100px;
            }
          }
          @media (max-width: 640px) {
            .marquee-container {
              animation-duration: 10s; /* Slower speed for better visibility on phones */
            }
            .card-container {
              width: calc(33.33vw - 0.625rem); /* Adjusted for 3 cards per view on small screens */
              max-width: 120px;
              min-width: 80px;
              height: 60px;
            }
          }
        `}
      </style>

      <div className="overflow-hidden">
        <div className="marquee-container">
          {duplicatedCards.map((card, index) => (
            <div key={`${card.id}-${index}`} className="card-container">
              <div className="border-2 px-2 py-3 rounded-2xl border-[#0000004D] h-full flex items-center justify-center">
                <img
                  src={card.logo || "/placeholder.svg"}
                  alt={`Sponsor Logo ${card.id}`}
                  className="h-6 object-contain sm:h-8"
                />
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default PromotionSlider;