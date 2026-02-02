import { useState, useEffect } from "react";
import { Mail, MailOpen, Trash2, Eye, X } from "lucide-react";
import { contactAPI } from "../api";
import toast from "react-hot-toast";

const Messages = () => {
  const [messages, setMessages] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedMessage, setSelectedMessage] = useState(null);

  useEffect(() => {
    fetchMessages();
  }, []);

  const fetchMessages = async () => {
    try {
      const res = await contactAPI.getAll();
      setMessages(res.data.data);
    } catch (error) {
      toast.error("Failed to fetch messages");
    } finally {
      setLoading(false);
    }
  };

  const handleView = async (message) => {
    setSelectedMessage(message);
    if (!message.read) {
      try {
        await contactAPI.markAsRead(message._id);
        setMessages(
          messages.map((m) =>
            m._id === message._id ? { ...m, read: true } : m,
          ),
        );
      } catch (error) {
        console.error("Failed to mark as read");
      }
    }
  };

  const handleDelete = async (id) => {
    if (!confirm("Are you sure you want to delete this message?")) return;

    try {
      await contactAPI.delete(id);
      toast.success("Message deleted!");
      setMessages(messages.filter((m) => m._id !== id));
      if (selectedMessage?._id === id) setSelectedMessage(null);
    } catch (error) {
      toast.error("Failed to delete message");
    }
  };

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString("en-US", {
      year: "numeric",
      month: "short",
      day: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    });
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-500"></div>
      </div>
    );
  }

  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-2xl font-bold text-white">Messages</h1>
        <span className="text-gray-400">
          {messages.filter((m) => !m.read).length} unread
        </span>
      </div>

      {messages.length === 0 ? (
        <div className="bg-gray-800 rounded-xl p-12 text-center border border-gray-700">
          <p className="text-gray-400">No messages yet.</p>
        </div>
      ) : (
        <div className="bg-gray-800 rounded-xl border border-gray-700 overflow-hidden">
          <div className="divide-y divide-gray-700">
            {messages.map((message) => (
              <div
                key={message._id}
                className={`p-4 hover:bg-gray-750 transition-colors ${!message.read ? "bg-gray-750" : ""}`}
              >
                <div className="flex items-start justify-between">
                  <div className="flex items-start gap-3 flex-1">
                    <div
                      className={`mt-1 ${message.read ? "text-gray-500" : "text-blue-400"}`}
                    >
                      {message.read ? (
                        <MailOpen size={20} />
                      ) : (
                        <Mail size={20} />
                      )}
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-2">
                        <span
                          className={`font-medium ${message.read ? "text-gray-300" : "text-white"}`}
                        >
                          {message.name}
                        </span>
                        {!message.read && (
                          <span className="px-2 py-0.5 bg-blue-600 text-xs text-white rounded">
                            New
                          </span>
                        )}
                      </div>
                      <p className="text-gray-400 text-sm">{message.email}</p>
                      {message.subject && (
                        <p className="text-gray-300 text-sm mt-1 font-medium">
                          {message.subject}
                        </p>
                      )}
                      <p className="text-gray-400 text-sm mt-1 truncate">
                        {message.message}
                      </p>
                      <p className="text-gray-500 text-xs mt-2">
                        {formatDate(message.createdAt)}
                      </p>
                    </div>
                  </div>
                  <div className="flex gap-2 ml-4">
                    <button
                      onClick={() => handleView(message)}
                      className="p-2 text-gray-400 hover:text-white hover:bg-gray-700 rounded"
                    >
                      <Eye size={18} />
                    </button>
                    <button
                      onClick={() => handleDelete(message._id)}
                      className="p-2 text-red-400 hover:bg-gray-700 rounded"
                    >
                      <Trash2 size={18} />
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* View Message Modal */}
      {selectedMessage && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
          <div className="bg-gray-800 rounded-xl w-full max-w-2xl max-h-[90vh] overflow-y-auto">
            <div className="flex items-center justify-between p-4 border-b border-gray-700">
              <h2 className="text-xl font-semibold text-white">
                Message Details
              </h2>
              <button
                onClick={() => setSelectedMessage(null)}
                className="text-gray-400 hover:text-white"
              >
                <X size={24} />
              </button>
            </div>

            <div className="p-4 space-y-4">
              <div>
                <label className="text-sm text-gray-400">From</label>
                <p className="text-white">{selectedMessage.name}</p>
              </div>

              <div>
                <label className="text-sm text-gray-400">Email</label>
                <p className="text-white">
                  <a
                    href={`mailto:${selectedMessage.email}`}
                    className="text-blue-400 hover:underline"
                  >
                    {selectedMessage.email}
                  </a>
                </p>
              </div>

              {selectedMessage.subject && (
                <div>
                  <label className="text-sm text-gray-400">Subject</label>
                  <p className="text-white">{selectedMessage.subject}</p>
                </div>
              )}

              <div>
                <label className="text-sm text-gray-400">Message</label>
                <p className="text-white whitespace-pre-wrap mt-1">
                  {selectedMessage.message}
                </p>
              </div>

              <div>
                <label className="text-sm text-gray-400">Received</label>
                <p className="text-white">
                  {formatDate(selectedMessage.createdAt)}
                </p>
              </div>

              <div className="flex justify-end gap-3 pt-4 border-t border-gray-700">
                <a
                  href={`mailto:${selectedMessage.email}`}
                  className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
                >
                  Reply via Email
                </a>
                <button
                  onClick={() => setSelectedMessage(null)}
                  className="px-4 py-2 bg-gray-700 text-gray-300 rounded-lg hover:bg-gray-600"
                >
                  Close
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Messages;
