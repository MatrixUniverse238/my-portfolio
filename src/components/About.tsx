import { motion } from "framer-motion";
import profile from "../images/profile.jpg";

function About() {
  return (
    <section
      id="about"
      className="relative py-32 px-8 md:px-16 bg-[#020617] text-white overflow-hidden"
    >
      {/* background glow */}
      <div className="absolute top-20 left-1/4 w-[400px] h-[400px] bg-blue-500/20 blur-[120px] rounded-full"></div>

      <motion.div
        initial={{ opacity: 0, y: 40 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        viewport={{ once: true }}
        className="max-w-6xl mx-auto grid md:grid-cols-2 gap-16 items-center"
      >
        {/* Image */}
        <div className="flex justify-center">
          <div className="w-72 h-72 rounded-2xl overflow-hidden border border-white/10 bg-white/5 backdrop-blur-lg">
            <img
              src={profile}
              alt="Aniket"
              className="w-full h-full rounded-xl"
            />
          </div>
        </div>

        {/* Text */}
        <div>
          <h2 className="text-4xl font-bold mb-6 bg-gradient-to-r from-blue-400 to-indigo-400 bg-clip-text text-transparent">
            About Me
          </h2>

          <p className="text-gray-300 leading-relaxed mb-6">
            I'm <span className="text-white font-semibold">Aniket Barman</span>, a Computer Science student passionate about building intelligent systems and modern web applications.
          </p>

          <p className="text-gray-400 leading-relaxed mb-6">
            My main interests include Artificial Intelligence, Machine Learning, and Full Stack Development. I enjoy solving real-world problems through technology and building scalable digital products.
          </p>

          <p className="text-gray-400 leading-relaxed">
            Currently, I'm working on projects involving machine learning models, modern web technologies, and data-driven applications.
          </p>

          {/* tech tags */}
          <div className="flex flex-wrap gap-3 mt-8">
            {["Python", "TensorFlow", "PyTorch", "React", "Node.js", "MongoDB"].map(
              (skill) => (
                <span
                  key={skill}
                  className="px-4 py-2 bg-white/5 border border-white/10 rounded-lg text-sm text-gray-300"
                >
                  {skill}
                </span>
              )
            )}
          </div>
        </div>
      </motion.div>
    </section>
  );
}

export default About;