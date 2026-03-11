import { useState, useEffect } from "react";
import { supabase } from "../lib/supabase";
import { signOut, getUser } from "../lib/auth";

interface Message {
  id: number;
  name: string;
  email: string;
  message: string;
  read: boolean;
  created_at: string;
}

interface Project {
  id: number;
  title: string;
  description: string;
  tech: string;
  github: string;
  demo: string;
}

function Admin() {
  const [messages, setMessages] = useState<Message[]>([]);
  const [projects, setProjects] = useState<Project[]>([]);
  const [loading, setLoading] = useState(true);

  const [projectForm, setProjectForm] = useState({
    title: "",
    description: "",
    tech: "",
    github: "",
    demo: "",
  });

  useEffect(() => {
    checkAuth();
    fetchMessages();
    fetchProjects();
  }, []);

  async function checkAuth() {
    const user = await getUser();
    if (!user) window.location.href = "/login";
  }

  async function fetchMessages() {
    const { data } = await supabase
      .from("messages")
      .select("*")
      .order("created_at", { ascending: false });

    if (data) setMessages(data);
  }

  async function fetchProjects() {
    const { data } = await supabase
      .from("projects")
      .select("*")
      .order("id", { ascending: false });

    if (data) setProjects(data);

    setLoading(false);
  }

  async function markAsRead(id: number) {
    await supabase.from("messages").update({ read: true }).eq("id", id);

    setMessages(messages.map(msg =>
      msg.id === id ? { ...msg, read: true } : msg
    ));
  }

  async function handleProjectSubmit(e: any) {
    e.preventDefault();

    const { data, error } = await supabase
      .from("projects")
      .insert(projectForm)
      .select();

    if (!error && data) {
      setProjects([data[0], ...projects]);

      setProjectForm({
        title: "",
        description: "",
        tech: "",
        github: "",
        demo: "",
      });
    }
  }

  async function deleteProject(id: number) {
    await supabase.from("projects").delete().eq("id", id);
    setProjects(projects.filter(p => p.id !== id));
  }

  async function handleSignOut() {
    await signOut();
    window.location.href = "/login";
  }

  if (loading)
    return (
      <div className="min-h-screen bg-[#060912] flex items-center justify-center">
        <p className="text-white">Loading...</p>
      </div>
    );

  return (
    <section className="min-h-screen bg-[#060912] text-white px-8 py-12">
      <div className="max-w-5xl mx-auto">

        {/* HEADER */}
        <div className="flex justify-between items-center mb-10">
          <h1 className="text-4xl font-bold text-blue-400">
            Admin Dashboard
          </h1>

          <button
            onClick={handleSignOut}
            className="border border-gray-700 px-4 py-2 rounded-lg hover:border-blue-400 transition text-sm"
          >
            Sign Out
          </button>
        </div>

        {/* ADD PROJECT */}
        <div className="bg-white/5 border border-white/10 rounded-xl p-6 mb-12">
          <h2 className="text-xl font-semibold mb-6 text-blue-400">
            Add Project
          </h2>

          <form onSubmit={handleProjectSubmit} className="flex flex-col gap-4">

            <input
              placeholder="Project Title"
              value={projectForm.title}
              onChange={(e) =>
                setProjectForm({ ...projectForm, title: e.target.value })
              }
              className="bg-[#020617] border border-gray-700 rounded-lg px-4 py-3"
            />

            <textarea
              placeholder="Description"
              value={projectForm.description}
              onChange={(e) =>
                setProjectForm({ ...projectForm, description: e.target.value })
              }
              className="bg-[#020617] border border-gray-700 rounded-lg px-4 py-3"
            />

            <input
              placeholder="Tech Stack"
              value={projectForm.tech}
              onChange={(e) =>
                setProjectForm({ ...projectForm, tech: e.target.value })
              }
              className="bg-[#020617] border border-gray-700 rounded-lg px-4 py-3"
            />

            <input
              placeholder="GitHub Link"
              value={projectForm.github}
              onChange={(e) =>
                setProjectForm({ ...projectForm, github: e.target.value })
              }
              className="bg-[#020617] border border-gray-700 rounded-lg px-4 py-3"
            />

            <input
              placeholder="Live Demo Link"
              value={projectForm.demo}
              onChange={(e) =>
                setProjectForm({ ...projectForm, demo: e.target.value })
              }
              className="bg-[#020617] border border-gray-700 rounded-lg px-4 py-3"
            />

            <button
              type="submit"
              className="bg-blue-500 hover:bg-blue-600 transition py-3 rounded-lg font-semibold"
            >
              Add Project
            </button>

          </form>
        </div>

        {/* PROJECT LIST */}
        <div className="mb-16">
          <h2 className="text-xl font-semibold mb-6 text-blue-400">
            Projects
          </h2>

          <div className="flex flex-col gap-4">
            {projects.map(project => (
              <div
                key={project.id}
                className="p-6 rounded-xl border bg-white/5 border-white/10"
              >
                <div className="flex justify-between items-center">
                  <h3 className="font-semibold">{project.title}</h3>

                  <button
                    onClick={() => deleteProject(project.id)}
                    className="text-red-400 text-sm"
                  >
                    Delete
                  </button>
                </div>

                <p className="text-gray-400 text-sm mt-2">
                  {project.description}
                </p>

                <p className="text-blue-400 text-xs mt-2">
                  {project.tech}
                </p>
              </div>
            ))}
          </div>
        </div>

        {/* MESSAGES */}
        <h2 className="text-xl font-semibold mb-6 text-blue-400">
          Messages
        </h2>

        <div className="flex flex-col gap-4">
          {messages.map(msg => (
            <div
              key={msg.id}
              className={`p-6 rounded-xl border transition ${
                msg.read
                  ? "bg-white/3 border-white/5 opacity-60"
                  : "bg-white/5 border-white/10"
              }`}
            >
              <div className="flex justify-between mb-3">
                <div>
                  <p className="font-semibold">{msg.name}</p>
                  <p className="text-blue-400 text-sm">{msg.email}</p>
                </div>

                {!msg.read && (
                  <button
                    onClick={() => markAsRead(msg.id)}
                    className="text-xs bg-blue-400/10 border border-blue-400/30 px-3 py-1 rounded-full"
                  >
                    Mark read
                  </button>
                )}
              </div>

              <p className="text-gray-300 text-sm">{msg.message}</p>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
}

export default Admin;