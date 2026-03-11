import { useState } from "react";
import { motion } from "framer-motion";
import { supabase } from "../lib/supabase";
import linkedin from "../images/linkedin.png";
import gmail from "../images/gmail.png";
import facebook from "../images/facebook.png";

function ContactForm() {
  const [user, setUser] = useState({
    name: "",
    email: "",
    message: "",
  });

  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState("");

  const handleChange = (field: string, value: string) => {
    setUser({ ...user, [field]: value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    try {
      const { error } = await supabase.from("messages").insert({
        name: user.name,
        email: user.email,
        message: user.message,
      });

      if (error) throw error;

      setSuccess(true);
      setUser({ name: "", email: "", message: "" });
    } catch (err: any) {
      setError("Failed to send message. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <section
      id="contact"
      className="relative min-h-screen flex items-center justify-center px-6 bg-[#060912] text-white overflow-hidden"
    >
      {/* Background Glow */}
      <div className="absolute top-40 left-1/3 w-[500px] h-[500px] bg-blue-500/20 blur-[120px] rounded-full"></div>
      <div className="absolute bottom-20 right-1/3 w-[400px] h-[400px] bg-indigo-500/20 blur-[120px] rounded-full"></div>

      <div className="relative z-10 max-w-6xl w-full grid md:grid-cols-2 gap-12">

        {/* Left Contact Info */}
        <motion.div
          initial={{ opacity: 0, x: -40 }}
          whileInView={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.6 }}
        >
          <h2 className="text-4xl font-bold mb-6 bg-gradient-to-r from-blue-400 to-indigo-400 bg-clip-text text-transparent">
            Let's Connect
          </h2>

          <p className="text-gray-400 mb-8">
            I'm always open to discussing new projects, collaborations,
            or opportunities. Feel free to reach out through the form
            or via my social profiles.
          </p>

          {/* Social Links */}
          <div className="flex gap-6 text-3xl">

            <a
              href="https:www.linkedin.com/in/aniket-barman238"
              target="_blank"
              rel="noopener noreferrer"
            >
              <img
                src={linkedin}
                alt="LinkedIn"
                className="w-10 hover:scale-110 transition"
              />
            </a>

            <a
              href="mailto:baniket238@gmail.com">
                <img 
                  src={gmail}
                  alt="Gmail"
                  className="w-10 hover:scale-110 transition"
                />
            </a>

            <a
              href="https://facebook.com/aniket.barman.02"
              target="_blank"
              rel="noopener noreferrer"
            >
              <img 
                src={facebook}
                alt="Facebook"
                className="w-10 hover:scale-110 transition"
              />
            </a>

          </div>
        </motion.div>

        {/* Contact Form */}
        <motion.div
          initial={{ opacity: 0, x: 40 }}
          whileInView={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.6 }}
          className="bg-white/5 backdrop-blur-xl border border-white/10 rounded-2xl p-10"
        >
          <h3 className="text-2xl font-semibold mb-6 text-center">
            Contact Me
          </h3>

          {success ? (
            <div className="text-center">
              <p className="text-green-400 text-xl font-semibold">
                Message sent successfully!
              </p>
              <p className="text-gray-400 mt-2">
                I'll get back to you soon.
              </p>

              <button
                onClick={() => setSuccess(false)}
                className="mt-6 text-blue-400 hover:text-blue-300 underline"
              >
                Send another message
              </button>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-5">

              <input
                type="text"
                placeholder="Your Name"
                value={user.name}
                onChange={(e) => handleChange("name", e.target.value)}
                required
                className="w-full bg-[#020617] border border-white/10 rounded-lg px-4 py-3 text-white focus:outline-none focus:border-blue-400 transition"
              />

              <input
                type="email"
                placeholder="Your Email"
                value={user.email}
                onChange={(e) => handleChange("email", e.target.value)}
                required
                className="w-full bg-[#020617] border border-white/10 rounded-lg px-4 py-3 text-white focus:outline-none focus:border-blue-400 transition"
              />

              <textarea
                placeholder="Your Message"
                value={user.message}
                onChange={(e) => handleChange("message", e.target.value)}
                required
                className="w-full bg-[#020617] border border-white/10 rounded-lg px-4 py-3 text-white h-32 focus:outline-none focus:border-blue-400 transition"
              />

              {error && <p className="text-red-400 text-sm">{error}</p>}

              <button
                type="submit"
                disabled={loading}
                className="w-full py-3 rounded-lg font-semibold bg-blue-500 hover:bg-blue-600 transition disabled:opacity-50"
              >
                {loading ? "Sending..." : "Send Message"}
              </button>

            </form>
          )}
        </motion.div>

      </div>
    </section>
  );
}

export default ContactForm;