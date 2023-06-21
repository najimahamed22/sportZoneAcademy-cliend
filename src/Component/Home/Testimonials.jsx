import { useState } from "react";
import { FaQuoteLeft } from "react-icons/fa";
import ReactCardFlip from "react-card-flip";

const Testimonials = () => {
  const [isFlipped, setIsFlipped] = useState(false);

  const handleFlip = () => {
    setIsFlipped(!isFlipped);
  };

  return (
    <section className="my-8 body-font">
      <div className="container px-5 mx-auto">
        <h1 className="text-4xl text-center font-bold my-8">Testimonials</h1>
        <div className="flex text-gray-600 flex-wrap -m-4">
          <div className="p-4  md:w-1/2 w-full">
            <ReactCardFlip isFlipped={isFlipped} flipDirection="horizontal">
              {/* Front side of the card */}
              <div
                className="h-full bg-gray-100 p-8 rounded cursor-pointer"
                onClick={handleFlip}>
                <FaQuoteLeft className="block w-5 h-5 text-gray-400 mb-4" />
                <p className="leading-relaxed mb-6">
                  -- I have been training with Sport Zone Academy for the past
                  year, and it has completely transformed my game. The coaches
                  are incredibly knowledgeable and dedicated. They provide
                  personalized training programs that have helped me improve my
                  skills and performance on the field.--
                </p>
              </div>

              {/* Back side of the card */}
              <div
                className="h-full bg-gray-100 p-8 rounded cursor-pointer"
                onClick={handleFlip}>
                <a className="inline-flex items-center">
                  <img
                    alt="testimonial"
                    src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcS1IX9tquXI5btpGxObdQWbZL7MehqceLbp0A&usqp=CAU"
                    className="w-12 h-12 rounded-full flex-shrink-0 object-cover object-center"
                  />
                  <span className="flex-grow flex flex-col pl-4">
                    <span className="title-font font-medium text-gray-900">
                      John Doe
                    </span>
                    <span className="text-gray-500 text-sm">
                      Professional Soccer Player
                    </span>
                  </span>
                </a>
              </div>
            </ReactCardFlip>
          </div>
          <div className="p-4 md:w-1/2 w-full">
            <ReactCardFlip isFlipped={isFlipped} flipDirection="horizontal">
              {/* Front side of the card */}
              <div
                className="h-full bg-gray-100 p-8 rounded cursor-pointer"
                onClick={handleFlip}>
                <FaQuoteLeft className="block w-5 h-5 text-gray-400 mb-4" />
                <p className="leading-relaxed mb-6">
                  --Sport Zone Academy has been instrumental in my athletic
                  development. The trainers are top-notch, and their focus on
                  strength and conditioning has helped me become faster,
                  stronger, and more agile. Thanks to Sport Zone, I have
                  achieved new personal bests in my track and field sports
                  events.--
                </p>
              </div>

              {/* Back side of the card */}
              <div
                className="h-full bg-gray-100 p-8 rounded cursor-pointer"
                onClick={handleFlip}>
                <a className="inline-flex items-center">
                  <img
                    alt="testimonial"
                    src="https://www.indystar.com/gcdn/-mm-/d347529688c3d96c4fb14bb8aa64a0d86c2b5e3b/c=0-22-800-474/local/-/media/Indianapolis/Indianapolis/2014/06/23/1403560764000-AmberCampbell.jpg?width=660&height=373&fit=crop&format=pjpg&auto=webp"
                    className="w-12 h-12 rounded-full flex-shrink-0 object-cover object-center"
                  />
                  <span className="flex-grow flex flex-col pl-4">
                    <span className="title-font font-medium text-gray-900">
                      Jane Smith
                    </span>
                    <span className="text-gray-500 text-sm">
                      Track and Field Athlete
                    </span>
                  </span>
                </a>
              </div>
            </ReactCardFlip>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Testimonials;
