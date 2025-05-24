import React, { useState, useRef, useEffect } from "react";

export default function App() {
  const [isDragging, setIsDragging] = useState(false);
  const [dragPosition, setDragPosition] = useState({ x: 0, y: 0 });
  const [isEating, setIsEating] = useState(false);
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

    // Check if food is near cat's mouth
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
      // Cat eats the food
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
                {!isEating && (
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

                {/* Nose */}
                <div className="w-0 h-0 border-t-[8px] border-t-[#d36149] border-l-[7px] border-l-transparent border-r-[7px] border-r-transparent absolute top-[55px] left-[68px]">
                  {/* Mouth Lines */}
                  <div
                    className={`absolute top-[8px] left-[0px] ${
                      isEating ? "chewing-lines" : ""
                    }`}
                  >
                    <div className="h-[7px] w-[1px] bg-[#d36149] absolute rotate-[30deg] origin-top" />
                    <div className="h-[7px] w-[1px] bg-[#d36149] absolute -rotate-[30deg] origin-top left-[0px]" />
                  </div>
                </div>
              </div>

              {/* Body */}
              <div className="h-[120px] w-[150px] bg-[#33292b] relative left-[30px] rounded-tr-[65px] mt-[-10px]">
                {/* Paws */}
                <div className="h-[10px] w-[22px] bg-[#33292b] absolute top-[120px] rounded-b-[10px]" />
                <div className="h-[10px] w-[22px] bg-[#33292b] absolute top-[120px] left-[50px] rounded-b-[10px]" />

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
