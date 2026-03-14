import { motion } from "framer-motion";
import { TypeAnimation } from "react-type-animation";
import { FaReact, FaPython } from "react-icons/fa";
import { SiTensorflow } from "react-icons/si";
import { Link } from "react-router-dom";

interface HeroSectionProps {
  name: string;
  role: string;
  subtitle?: string;
}

function HeroSection({ name, subtitle }: HeroSectionProps) {
  return (
    <section className="relative bg-[#060912] min-h-screen flex flex-col justify-center px-8 md:px-16 text-white overflow-hidden">

      {/* Floating Icons */}
      <motion.div
        animate={{ y: [0, -20, 0] }}
        transition={{ duration: 4, repeat: Infinity }}
        className="absolute top-40 left-20 text-blue-400 text-4xl"
      >
        <FaReact />
      </motion.div>

      <motion.div
        animate={{ y: [0, -25, 0] }}
        transition={{ duration: 5, repeat: Infinity }}
        className="absolute top-60 right-20 text-yellow-400 text-4xl"
      >
        <FaPython />
      </motion.div>

      <motion.div
        animate={{ y: [0, -15, 0] }}
        transition={{ duration: 6, repeat: Infinity }}
        className="absolute bottom-40 right-40 text-orange-400 text-4xl"
      >
        <SiTensorflow />
      </motion.div>

      {/* Content */}
      <div className="max-w-4xl">

        <h1 className="text-5xl md:text-7xl font-bold mb-6">
          Hi, I'm{" "}
          <span className="bg-gradient-to-r from-blue-400 to-indigo-400 bg-clip-text text-transparent">
            {name}
          </span>
        </h1>

        {/* Typing Role */}
        <div className="text-xl md:text-2xl text-gray-300 mb-4">
          <TypeAnimation
            sequence={[
              "Full Stack Developer",
              2000,
              "Machine Learning Enthusiast",
              2000,
              "AI Developer",
              2000
            ]}
            wrapper="span"
            speed={50}
            repeat={Infinity}
          />
        </div>

        {subtitle && (
          <p className="text-gray-400 max-w-2xl mb-10">{subtitle}</p>
        )}

        <div className="flex gap-4">
          <Link to = "/projects">
            <button className="px-7 py-3 rounded-lg bg-blue-500 hover:bg-blue-600 transition font-semibold">
              View My Work
            </button>
          </Link>
          
          <a href =  "#contact">
            <button className="px-7 py-3 rounded-lg border border-gray-600 hover:border-blue-400 hover:text-blue-400 transition">
              Contact Me
            </button>
          </a>
        </div>
      </div>

      {/* Scroll Indicator */}
      <motion.div
        animate={{ y: [0, 10, 0] }}
        transition={{ repeat: Infinity, duration: 1.5 }}
        className="absolute bottom-10 left-1/2 -translate-x-1/2"
      >
        <div className="w-6 h-10 border-2 border-gray-400 rounded-full flex justify-center">
          <div className="w-1 h-3 bg-gray-400 mt-2 rounded"></div>
        </div>
      </motion.div>

    </section>
  );
}

export default HeroSection;