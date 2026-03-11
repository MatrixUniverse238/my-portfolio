import { useEffect, useState } from "react";
import { supabase } from "../lib/supabase";
import { motion } from "framer-motion";

function Projects() {
  const [projects, setProjects] = useState<any[]>([]);

  useEffect(() => {
    fetchProjects();
  }, []);

  async function fetchProjects() {
    const { data, error } = await supabase
      .from("projects")
      .select("*")
      .order("created_at", { ascending: false });

    if (!error) {
      setProjects(data);
    }
  }

  return (
    <section className="min-h-screen bg-[#060912] text-white px-8 md:px-16 py-24">

      <h1 className="text-4xl font-bold mb-16
      bg-gradient-to-r from-blue-400 to-indigo-400
      bg-clip-text text-transparent">
        My Projects
      </h1>

      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-10">

        {projects.map((project:any) => (
          <motion.div
            key={project.id}
            whileHover={{ scale: 1.04 }}
            className="bg-white/5 backdrop-blur-xl border border-white/10 p-6 rounded-xl"
          >
            <h3 className="text-xl font-semibold mb-3">
              {project.title}
            </h3>

            <p className="text-gray-400 mb-4">
              {project.description}
            </p>

            <p className="text-sm text-blue-400 mb-4">
              {project.tech}
            </p>

            <div className="flex gap-4">
              <a href={project.github} target="_blank">GitHub</a>
              <a href={project.demo} target="_blank">Live Demo</a>
            </div>
          </motion.div>
        ))}

      </div>
    </section>
  );
}

export default Projects;