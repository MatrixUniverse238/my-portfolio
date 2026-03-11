import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Link } from "react-router-dom";

interface NavbarProps {
  title: string;
}

function Navbar({ title }: NavbarProps) {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const navLinks = [
    { name: "About", type: "section", href: "#about" },
    { name: "Projects", type: "page", href: "/projects" },
    { name: "Contact", type: "section", href: "#contact" },
  ];

  return (
    <nav
      className="fixed top-0 left-0 right-0 z-50
      bg-[#060912]/70 backdrop-blur-xl
      border-b border-white/10
      flex items-center justify-between
      px-8 md:px-16 py-5 text-gray-200"
    >
      {/* Logo */}
      <Link
        to="/"
        className="text-xl font-semibold tracking-wide
        bg-gradient-to-r from-blue-400 to-indigo-400
        bg-clip-text text-transparent"
      >
        {title}
      </Link>

      {/* Desktop Menu */}
      <ul className="hidden md:flex gap-10 font-medium">
        {navLinks.map((link) => (
          <li key={link.name}>
            {link.type === "page" ? (
              <Link
                to={link.href}
                className="relative cursor-pointer
                hover:text-white transition duration-300
                after:absolute after:left-0 after:-bottom-1
                after:h-[2px] after:w-0 after:bg-blue-400
                after:transition-all after:duration-300
                hover:after:w-full"
              >
                {link.name}
              </Link>
            ) : (
              <a
                href={link.href}
                className="relative cursor-pointer
                hover:text-white transition duration-300
                after:absolute after:left-0 after:-bottom-1
                after:h-[2px] after:w-0 after:bg-blue-400
                after:transition-all after:duration-300
                hover:after:w-full"
              >
                {link.name}
              </a>
            )}
          </li>
        ))}
      </ul>

      {/* Mobile Menu Button */}
      <button
        onClick={() => setIsMenuOpen(!isMenuOpen)}
        className="md:hidden px-3 py-1 rounded-lg
        border border-gray-600
        hover:border-blue-400 transition"
      >
        {isMenuOpen ? "Close" : "Menu"}
      </button>

      {/* Mobile Menu */}
      <AnimatePresence>
        {isMenuOpen && (
          <motion.ul
            initial={{ opacity: 0, y: -15 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -15 }}
            transition={{ duration: 0.25 }}
            className="absolute top-full left-0 right-0
            bg-[#060912]/95 backdrop-blur-xl
            border-b border-white/10
            flex flex-col gap-6 px-8 py-8
            md:hidden text-gray-300"
          >
            {navLinks.map((link) => (
              <li key={link.name}>
                {link.type === "page" ? (
                  <Link
                    to={link.href}
                    onClick={() => setIsMenuOpen(false)}
                    className="hover:text-blue-400 transition cursor-pointer"
                  >
                    {link.name}
                  </Link>
                ) : (
                  <a
                    href={link.href}
                    onClick={() => setIsMenuOpen(false)}
                    className="hover:text-blue-400 transition cursor-pointer"
                  >
                    {link.name}
                  </a>
                )}
              </li>
            ))}
          </motion.ul>
        )}
      </AnimatePresence>
    </nav>
  );
}

export default Navbar;