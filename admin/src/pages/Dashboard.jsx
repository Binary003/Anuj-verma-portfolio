import { useState, useEffect } from "react";
import { FolderKanban, Wrench, Mail, TrendingUp } from "lucide-react";
import { projectsAPI, skillsAPI, contactAPI } from "../api";

const Dashboard = () => {
  const [stats, setStats] = useState({
    projects: 0,
    skills: 0,
    messages: 0,
    unreadMessages: 0,
  });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchStats = async () => {
      try {
        const [projectsRes, skillsRes, messagesRes] = await Promise.all([
          projectsAPI.getAll(),
          skillsAPI.getAll(),
          contactAPI.getAll(),
        ]);

        const messages = messagesRes.data.data;
        setStats({
          projects: projectsRes.data.data.length,
          skills: skillsRes.data.data.length,
          messages: messages.length,
          unreadMessages: messages.filter((m) => !m.read).length,
        });
      } catch (error) {
        console.error("Error fetching stats:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchStats();
  }, []);

  const statCards = [
    {
      name: "Total Projects",
      value: stats.projects,
      icon: FolderKanban,
      color: "bg-blue-600",
    },
    {
      name: "Total Skills",
      value: stats.skills,
      icon: Wrench,
      color: "bg-green-600",
    },
    {
      name: "Total Messages",
      value: stats.messages,
      icon: Mail,
      color: "bg-purple-600",
    },
    {
      name: "Unread Messages",
      value: stats.unreadMessages,
      icon: TrendingUp,
      color: "bg-orange-600",
    },
  ];

  if (loading) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-500"></div>
      </div>
    );
  }

  return (
    <div>
      <h1 className="text-2xl font-bold text-white mb-6">Dashboard</h1>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {statCards.map((stat) => (
          <div
            key={stat.name}
            className="bg-gray-800 rounded-xl p-6 border border-gray-700"
          >
            <div className="flex items-center justify-between">
              <div>
                <p className="text-gray-400 text-sm">{stat.name}</p>
                <p className="text-3xl font-bold text-white mt-1">
                  {stat.value}
                </p>
              </div>
              <div className={`${stat.color} p-3 rounded-lg`}>
                <stat.icon size={24} className="text-white" />
              </div>
            </div>
          </div>
        ))}
      </div>

      <div className="mt-8 bg-gray-800 rounded-xl p-6 border border-gray-700">
        <h2 className="text-xl font-semibold text-white mb-4">Quick Actions</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <a
            href="/projects"
            className="p-4 bg-gray-700 rounded-lg hover:bg-gray-600 transition-colors"
          >
            <FolderKanban className="text-blue-400 mb-2" size={24} />
            <p className="text-white font-medium">Manage Projects</p>
            <p className="text-gray-400 text-sm">
              Add, edit or delete projects
            </p>
          </a>
          <a
            href="/skills"
            className="p-4 bg-gray-700 rounded-lg hover:bg-gray-600 transition-colors"
          >
            <Wrench className="text-green-400 mb-2" size={24} />
            <p className="text-white font-medium">Manage Skills</p>
            <p className="text-gray-400 text-sm">Update your skill set</p>
          </a>
          <a
            href="/messages"
            className="p-4 bg-gray-700 rounded-lg hover:bg-gray-600 transition-colors"
          >
            <Mail className="text-purple-400 mb-2" size={24} />
            <p className="text-white font-medium">View Messages</p>
            <p className="text-gray-400 text-sm">Check contact submissions</p>
          </a>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
