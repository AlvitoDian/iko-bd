import React, { useState, useRef, useEffect } from "react";

export default function App() {
  const [isDragging, setIsDragging] = useState(false);
  const [dragPosition, setDragPosition] = useState({ x: 0, y: 0 });
  const [isEating, setIsEating] = useState(false);
  const [isHappy, setIsHappy] = useState(false);
  const [isOpenLetter, setIsOpenLetter] = useState(false);
  const [isNearMouth, setIsNearMouth] = useState(false);
  const [feedCount, setFeedCount] = useState(0);
  const [draggedFood, setDraggedFood] = useState(null);

  const catRef = useRef(null);
  const mouthRef = useRef(null);
  const dragRef = useRef(null);

  const foods = [
    { id: 1, emoji: "🐟", name: "Ikan" },
    { id: 2, emoji: "🥛", name: "Susu" },
    { id: 3, emoji: "🍗", name: "Ayam" },
    { id: 4, emoji: "🐭", name: "Tikus" },
  ];

  const handleMouseDown = (e, food) => {
    setIsDragging(true);
    setDraggedFood(food);
    const rect = e.currentTarget.getBoundingClientRect();
    dragRef.current = {
      offsetX: e.clientX - rect.left,
      offsetY: e.clientY - rect.top,
    };
  };

  const handleMouseMove = (e) => {
    if (!isDragging) return;

    const newPosition = {
      x: e.clientX - dragRef.current.offsetX,
      y: e.clientY - dragRef.current.offsetY,
    };
    setDragPosition(newPosition);

    if (mouthRef.current) {
      const mouthRect = mouthRef.current.getBoundingClientRect();
      const distance = Math.sqrt(
        Math.pow(e.clientX - (mouthRect.left + mouthRect.width / 2), 2) +
          Math.pow(e.clientY - (mouthRect.top + mouthRect.height / 2), 2)
      );

      setIsNearMouth(distance < 80);
    }
  };

  const handleMouseUp = () => {
    if (isDragging && isNearMouth) {
      setIsEating(true);
      setFeedCount((prev) => prev + 1);

      setTimeout(() => {
        setIsEating(false);
      }, 1500);
    }

    setIsDragging(false);
    setIsNearMouth(false);
    setDraggedFood(null);
    setDragPosition({ x: 0, y: 0 });
  };

  useEffect(() => {
    if (feedCount >= 3) {
      setIsHappy(true);
    }
  }, [feedCount]);

  useEffect(() => {
    if (isDragging) {
      document.addEventListener("mousemove", handleMouseMove);
      document.addEventListener("mouseup", handleMouseUp);

      return () => {
        document.removeEventListener("mousemove", handleMouseMove);
        document.removeEventListener("mouseup", handleMouseUp);
      };
    }
  }, [isDragging, isNearMouth]);

  return (
    <div className="min-h-screen bg-gradient-to-b from-blue-200 to-green-200 p-8 select-none">
      {isOpenLetter && (
        <div className="fixed inset-0 bg-black bg-opacity-40 flex items-center justify-center z-[909090] animate-fadeIn">
          <div
            className="bg-white p-8 rounded-2xl shadow-2xl max-w-md mx-4 relative border border-pink-200 animate-slideIn"
            style={{
              backgroundImage: `
           linear-gradient(to right, #fce4ec 1px, transparent 1px),
           linear-gradient(to bottom, transparent 23px, #fce4ec 24px, #fce4ec 25px, transparent 26px)
         `,
              backgroundSize: "100% 32px, 100% 32px",
              backgroundPosition: "40px 0, 0 0",
            }}
          >
            {/* Paper hole punches */}
            <div className="absolute left-6 top-8 w-3 h-3 bg-white border-2 border-pink-200 rounded-full"></div>
            <div className="absolute left-6 top-20 w-3 h-3 bg-white border-2 border-pink-200 rounded-full"></div>
            <div className="absolute left-6 top-32 w-3 h-3 bg-white border-2 border-pink-200 rounded-full"></div>
            <div className="absolute left-6 top-44 w-3 h-3 bg-white border-2 border-pink-200 rounded-full"></div>
            <div className="absolute left-6 top-56 w-3 h-3 bg-white border-2 border-pink-200 rounded-full"></div>

            {/* Red margin line */}
            <div className="absolute left-10 top-0 bottom-0 w-px bg-pink-300"></div>

            {/* Close button */}
            <button
              onClick={() => setIsOpenLetter(false)}
              className="absolute top-4 right-4 text-pink-400 hover:text-pink-600 text-2xl font-bold transition-colors duration-200 z-10"
            >
              ×
            </button>

            {/* Letter content */}
            <div className="ml-8 relative z-10">
              <h2 className="text-2xl font-bold text-gray-700 mb-6 font-serif text-center">
                🎉 Happy Birthday! 🎂
              </h2>

              <div className="text-gray-600 leading-loose space-y-4 font-serif text-base handwriting-style">
                <p className="italic text-pink-500 border-b border-dotted border-pink-200 pb-1">
                  My Dearest Love,
                </p>

                <p className="border-b border-dotted border-pink-100 pb-1">
                  Pada hari istimewa ini, aku ingin mengucapkan selamat ulang
                  tahun untuk orang yang paling berarti dalam hidupku. ✨
                </p>

                <p className="border-b border-dotted border-pink-100 pb-1">
                  Setiap hari bersamamu adalah hadiah yang tak ternilai. Kamu
                  membuat dunia ini lebih indah dengan senyumanmu. 😊
                </p>

                <p className="border-b border-dotted border-pink-100 pb-1">
                  Semoga tahun ini membawa kebahagiaan, kesehatan, dan semua
                  impianmu menjadi kenyataan. 🌟
                </p>

                <p className="text-pink-500 font-bold text-center border-b border-dotted border-pink-200 pb-1">
                  I love you more than words can say! 💕
                </p>

                <div className="text-right mt-6 italic">
                  <p className="border-b border-dotted border-pink-100 pb-1">
                    With all my love,
                  </p>
                  <p className="font-bold text-pink-600 border-b border-dotted border-pink-200 pb-1 mt-2">
                    Your Forever ❤️
                  </p>
                </div>
              </div>

              {/* Birthday cake emoji animation */}
              <div className="mt-6 text-3xl animate-bounce text-center">
                🎂🕯️✨
              </div>
            </div>

            {/* Paper texture overlay */}
            <div
              className="absolute inset-0 opacity-5 pointer-events-none"
              style={{
                backgroundImage: `radial-gradient(circle at 1px 1px, rgba(0,0,0,0.1) 1px, transparent 0)`,
                backgroundSize: "20px 20px",
              }}
            ></div>
          </div>
        </div>
      )}

      <div className="max-w-4xl mx-auto">
        <h1 className="text-4xl font-bold text-center mb-4 text-gray-800">
          🐱 Beri Makan Kucing
        </h1>

        <div className="text-center mb-8">
          <p className="text-lg text-gray-700">
            Seret makanan ke mulut kucing! Sudah diberi makan: {feedCount} kali
          </p>
        </div>

        <div className="flex justify-center items-center mb-12">
          {/* Cat */}
          <div className="relative h-[500px] w-[350px]" ref={catRef}>
            {isEating && (
              <div className="absolute top-[140px] left-[150px] bg-white text-[#33292b] text-sm px-3 py-3 rounded-xl shadow-md chat-bubble z-20">
                nyam nyam...
              </div>
            )}

            {isHappy && !isEating && (
              <div className="absolute top-[140px] left-[150px] bg-white text-[#33292b] text-sm px-3 py-3 rounded-xl shadow-md chat-bubble-persist z-20">
                ini ada hadiah... ^^
              </div>
            )}

            {/* Gift Box - appears when isHappy is true */}
            {isHappy && !isEating && (
              <div
                className="absolute top-[275px] left-[65px] z-30 cursor-pointer group"
                onClick={() => {
                  setIsOpenLetter(true);
                }}
              >
                {/* Gift Box Base */}
                <div className="w-[80px] h-[60px] bg-gradient-to-b from-[#ff6b6b] to-[#ee5a52] rounded-lg shadow-lg relative transition-all duration-300 group-hover:shadow-2xl group-hover:scale-105">
                  {/* Gift Box Top - will lift up on hover */}
                  <div
                    className="absolute -top-[8px] left-[5px] w-[70px] h-[15px] bg-gradient-to-b from-[#ff8e8e] to-[#ff6b6b] rounded-t-lg transition-all duration-500 group-hover:-translate-y-[15px] group-hover:-rotate-[5deg] group-hover:shadow-lg"
                    style={{ transformOrigin: "left center" }}
                  />

                  {/* Inner glow when opening */}
                  <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-t from-[#ffd700] via-[#ffed4e] to-transparent opacity-0 group-hover:opacity-60 transition-opacity duration-500 rounded-lg" />

                  {/* Magical light rays */}
                  <div className="absolute top-0 left-[10px] w-[2px] h-[20px] bg-gradient-to-t from-transparent to-[#ffd700] opacity-0 group-hover:opacity-100 transition-all duration-700 group-hover:-translate-y-[10px]" />
                  <div className="absolute top-0 left-[25px] w-[2px] h-[25px] bg-gradient-to-t from-transparent to-[#ffed4e] opacity-0 group-hover:opacity-100 transition-all duration-700 delay-100 group-hover:-translate-y-[15px]" />
                  <div className="absolute top-0 left-[40px] w-[2px] h-[20px] bg-gradient-to-t from-transparent to-[#ffd700] opacity-0 group-hover:opacity-100 transition-all duration-700 delay-200 group-hover:-translate-y-[12px]" />
                  <div className="absolute top-0 left-[55px] w-[2px] h-[18px] bg-gradient-to-t from-transparent to-[#ffed4e] opacity-0 group-hover:opacity-100 transition-all duration-700 delay-150 group-hover:-translate-y-[8px]" />

                  {/* Ribbon Vertical - will break apart on hover */}
                  <div className="absolute top-0 left-[35px] w-[10px] h-[60px] bg-gradient-to-r from-[#ffd700] to-[#ffed4e] z-10 transition-all duration-500" />

                  {/* Ribbon Horizontal - will stretch on hover */}
                  <div className="absolute top-[20px] left-0 w-[80px] h-[10px] bg-gradient-to-b from-[#ffd700] to-[#ffed4e] z-10 transition-all duration-500" />

                  {/* Bow - will bounce on hover */}
                  <div className="absolute -top-[15px] left-[30px] z-20 transition-all duration-300 group-hover:animate-bounce">
                    {/* Left bow */}
                    <div className="w-[8px] h-[15px] bg-gradient-to-r from-[#ffd700] to-[#ffed4e] rounded-l-full absolute left-0 transform -rotate-12 transition-transform duration-500 group-hover:-rotate-[25deg]" />
                    {/* Right bow */}
                    <div className="w-[8px] h-[15px] bg-gradient-to-r from-[#ffd700] to-[#ffed4e] rounded-r-full absolute left-[12px] transform rotate-12 transition-transform duration-500 group-hover:rotate-[25deg]" />
                    {/* Bow center */}
                    <div className="w-[6px] h-[8px] bg-gradient-to-b from-[#ffed4e] to-[#ffd700] rounded-full absolute left-[7px] top-[3px]" />
                  </div>

                  {/* Enhanced sparkles around gift */}
                  <div className="absolute -top-[20px] -left-[15px] w-[2px] h-[2px] bg-[#ffd700] rounded-full animate-pulse group-hover:w-[4px] group-hover:h-[4px] transition-all duration-300" />
                  <div
                    className="absolute -top-[10px] left-[85px] w-[3px] h-[3px] bg-[#ffd700] rounded-full animate-pulse group-hover:w-[5px] group-hover:h-[5px] transition-all duration-300"
                    style={{ animationDelay: "0.5s" }}
                  />
                  <div
                    className="absolute top-[15px] -left-[20px] w-[2px] h-[2px] bg-[#ffd700] rounded-full animate-pulse group-hover:w-[4px] group-hover:h-[4px] transition-all duration-300"
                    style={{ animationDelay: "1s" }}
                  />
                  <div
                    className="absolute top-[35px] left-[90px] w-[2px] h-[2px] bg-[#ffd700] rounded-full animate-pulse group-hover:w-[4px] group-hover:h-[4px] transition-all duration-300"
                    style={{ animationDelay: "1.5s" }}
                  />

                  {/* Additional hover sparkles */}
                  <div className="absolute -top-[25px] left-[20px] w-[3px] h-[3px] bg-[#fff] rounded-full opacity-0 group-hover:opacity-100 group-hover:animate-ping transition-all duration-500" />
                  <div className="absolute -top-[30px] left-[50px] w-[2px] h-[2px] bg-[#fff] rounded-full opacity-0 group-hover:opacity-100 group-hover:animate-ping transition-all duration-500 delay-200" />
                  <div className="absolute -top-[20px] left-[35px] w-[4px] h-[4px] bg-[#fff] rounded-full opacity-0 group-hover:opacity-100 group-hover:animate-ping transition-all duration-500 delay-100" />
                </div>
              </div>
            )}

            <div className="relative top-[150px] left-[50px]">
              {/* Face */}
              <div
                className={`h-[100px] w-[150px] bg-[#33292b] rounded-[30px] relative ${
                  isEating ? "chewing-face" : ""
                }`}
              >
                {/* Left Ear */}
                <div className="w-10 h-10 border-b-[50px] border-b-[#33292b] border-l-[20px] border-l-transparent border-r-[20px] border-r-transparent absolute -top-[40px] left-[10px] -rotate-[0deg] z-10">
                  <div className="w-0 h-0 border-b-[40px] border-b-[#d36149] border-l-[15px] border-l-transparent border-r-[15px] border-r-transparent absolute -right-[15px] top-[5px]" />
                </div>

                {/* Right Ear */}
                <div className="w-0 h-0 border-b-[50px] border-b-[#33292b] border-l-[20px] border-l-transparent border-r-[20px] border-r-transparent absolute -top-[40px] left-[90px] rotate-[0deg] z-10">
                  <div className="w-0 h-0 border-b-[40px] border-b-[#d36149] border-l-[15px] border-l-transparent border-r-[15px] border-r-transparent absolute -left-[15px] top-[5px]" />
                </div>

                {/* Eyes */}
                {!isEating && !isHappy && (
                  <>
                    <div className="h-[30px] w-[30px] bg-[#d2873b] rounded-full absolute top-[30px] left-[30px]">
                      <div className="h-[24px] w-[24px] bg-[#262626] rounded-full absolute top-[3px] left-[3px]" />
                    </div>
                    <div className="h-[30px] w-[30px] bg-[#d2873b] rounded-full absolute top-[30px] left-[90px]">
                      <div className="h-[24px] w-[24px] bg-[#262626] rounded-full absolute top-[3px] left-[3px]" />
                    </div>
                  </>
                )}

                {/* Eyes Close */}
                {isEating && (
                  <>
                    <div className="h-[30px] w-[30px] bg-[#d2873b] rounded-full absolute top-[30px] left-[30px]">
                      <div className="h-[24px] w-[44px] bg-[#33292b] absolute top-[-5px] left-[-3px]" />
                      <div className="h-[24px] w-[24px] bg-[#33292b] rounded-full absolute top-[3px] left-[3px]" />
                    </div>
                    <div className="h-[30px] w-[30px] bg-[#d2873b] rounded-full absolute top-[30px] left-[90px]">
                      <div className="h-[24px] w-[44px] bg-[#33292b] absolute top-[-5px] left-[-3px]" />
                      <div className="h-[24px] w-[24px] bg-[#33292b] rounded-full absolute top-[3px] left-[3px]" />
                    </div>
                  </>
                )}

                {/* Eyes is Happy */}
                {isHappy && !isEating && (
                  <>
                    <div className="h-[30px] w-[30px] bg-[#d2873b] rounded-full absolute top-[30px] left-[30px]">
                      <div className="h-[24px] w-[44px] bg-[#33292b] absolute top-[15px] left-[-3px]" />
                      <div className="h-[24px] w-[24px] bg-[#33292b] rounded-full absolute top-[3px] left-[3px]" />
                    </div>
                    <div className="h-[30px] w-[30px] bg-[#d2873b] rounded-full absolute top-[30px] left-[90px]">
                      <div className="h-[24px] w-[44px] bg-[#33292b] absolute top-[15px] left-[-3px]" />
                      <div className="h-[24px] w-[24px] bg-[#33292b] rounded-full absolute top-[3px] left-[3px]" />
                    </div>
                  </>
                )}

                {/* Nose */}
                <div className="w-0 h-0 border-t-[8px] border-t-[#d36149] border-l-[7px] border-l-transparent border-r-[7px] border-r-transparent absolute top-[55px] left-[68px]">
                  {/* Mouth Lines */}
                  <div
                    className={`absolute top-[8px] left-[0px] ${
                      isEating ? "chewing-lines" : ""
                    }`}
                    ref={mouthRef}
                  >
                    <div className="h-[7px] w-[1px] bg-[#d36149] absolute rotate-[30deg] origin-top" />
                    <div className="h-[7px] w-[1px] bg-[#d36149] absolute -rotate-[30deg] origin-top left-[0px]" />
                  </div>
                </div>
              </div>

              {/* Body */}
              <div className="h-[120px] w-[150px] bg-[#33292b] relative left-[30px] rounded-tr-[65px] mt-[-10px]">
                {/* Stomach */}
                <div
                  className="absolute w-[70px] h-[121.7px] left-[80px] bottom-0 z-[99] rounded-tr-full opacity-80"
                  style={{
                    background:
                      "linear-gradient(to left, rgba(115, 115, 115, 0.5), transparent)",
                  }}
                />

                {/* Paws */}
                <div className="h-[10px] w-[22px] bg-[#33292b] absolute top-[120px] rounded-b-[10px] z-[10000]" />
                <div className="h-[10px] w-[22px] bg-[#33292b] absolute top-[120px] left-[50px] rounded-b-[10px] z-[10000]" />

                {/* Tail  */}
                <div className="absolute top-[90px] left-[120px]">
                  {/* Bagian horizontal */}
                  <div className="w-[70px] h-[20px] bg-[#33292b] rounded-l-[40px] absolute left-[0px] rounded-br-full" />

                  {/* Bagian vertikal */}
                  <div
                    className={`w-[20px] h-[50px] bg-[#33292b] rounded-t-[30px] absolute -top-[47px] left-[50px] ${
                      !isEating ? "tail-wag rotate-0" : "rotate-[10deg]"
                    }`}
                    style={{ transformOrigin: "bottom center" }}
                  />
                </div>
              </div>

              {/* Shadow */}
              <div className="h-[30px] w-[150px] bg-[rgba(8,8,8,0.05)] rounded-full relative -bottom-[15px] left-[20px] -z-10" />
            </div>
          </div>
        </div>

        {/* Food Items */}
        <div className="flex justify-center space-x-8">
          {foods.map((food) => (
            <div
              key={food.id}
              className={`cursor-pointer select-none transition-transform hover:scale-110 ${
                draggedFood?.id === food.id && isDragging ? "opacity-50" : ""
              }`}
              onMouseDown={(e) => handleMouseDown(e, food)}
            >
              <div className="text-center">
                <div className="text-6xl mb-2 hover:animate-bounce">
                  {food.emoji}
                </div>
                <p className="text-sm text-gray-700 font-medium">{food.name}</p>
              </div>
            </div>
          ))}
        </div>

        {/* Dragged Food */}
        {isDragging && draggedFood && (
          <div
            className={`fixed pointer-events-none z-50 text-5xl transition-transform ${
              isNearMouth ? "scale-125 animate-pulse" : "scale-100"
            }`}
            style={{
              left: dragPosition.x,
              top: dragPosition.y,
              transform: "translate(-50%, -50%)",
            }}
          >
            {draggedFood.emoji}
          </div>
        )}

        {/* Instructions */}
        <div className="text-center mt-12 text-gray-600">
          <p className="text-lg">
            💡 Klik dan seret makanan ke mulut kucing untuk memberinya makan!
          </p>
        </div>

        {/* Eating Animation Indicator */}
      </div>

      <style jsx>{`
        @keyframes wag {
          0%,
          100% {
            transform: rotate(12deg);
          }
          50% {
            transform: rotate(60deg);
          }
        }
        .animate-wag {
          animation: wag 0.3s ease-in-out infinite;
        }
      `}</style>
    </div>
  );
}
