import { getMessages } from "@/lib/data";
import { MessageCircle, Calendar } from "lucide-react";

export default async function AdminMessages() {
  const messages = await getMessages();

  return (
    <div>
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="text-3xl font-bold text-admin-text font-display">Inquiries</h1>
          <p className="text-sm text-admin-muted mt-1">Read messages from your contact form</p>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        <div className="bg-admin-card p-6 rounded-2xl border border-admin-border relative overflow-hidden group">
          <div className="absolute top-0 right-0 w-32 h-32 bg-[#00c2ff]/5 rounded-full blur-3xl group-hover:bg-cyan-500/20 dark:bg-[#00c2ff]/10 transition-colors"></div>
          <h3 className="text-admin-muted text-sm font-medium mb-1 relative z-10">Total Inquiries</h3>
          <p className="text-3xl font-bold text-admin-text relative z-10">{messages.length}</p>
        </div>
        <div className="bg-admin-card p-6 rounded-2xl border border-admin-border relative overflow-hidden group">
          <div className="absolute top-0 right-0 w-32 h-32 bg-purple-500/5 rounded-full blur-3xl group-hover:bg-purple-500/10 transition-colors"></div>
          <h3 className="text-admin-muted text-sm font-medium mb-1 relative z-10">Inquiries This Week</h3>
          <p className="text-3xl font-bold text-purple-600 dark:text-purple-400 relative z-10">
            {messages.filter(m => {
              const date = new Date(m.createdAt);
              const now = new Date();
              const diffTime = Math.abs(now.getTime() - date.getTime());
              const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
              return diffDays <= 7;
            }).length}
          </p>
        </div>
        <div className="bg-admin-card p-6 rounded-2xl border border-admin-border relative overflow-hidden group">
          <div className="absolute top-0 right-0 w-32 h-32 bg-emerald-500/5 rounded-full blur-3xl group-hover:bg-emerald-500/20 dark:bg-emerald-500/10 transition-colors"></div>
          <h3 className="text-admin-muted text-sm font-medium mb-1 relative z-10">Inquiries Today</h3>
          <p className="text-3xl font-bold text-emerald-600 dark:text-emerald-400 relative z-10">
            {messages.filter(m => new Date(m.createdAt).toDateString() === new Date().toDateString()).length}
          </p>
        </div>
      </div>

      {messages.length === 0 ? (
        <div className="bg-admin-card rounded-2xl border border-admin-border p-16 text-center">
          <div className="w-16 h-16 rounded-2xl bg-cyan-500/20 dark:bg-[#00c2ff]/10 flex items-center justify-center mx-auto mb-4">
            <MessageCircle size={28} className="text-cyan-600 dark:text-[#00c2ff]" />
          </div>
          <h3 className="text-admin-text font-semibold text-lg mb-2">No Messages Yet</h3>
          <p className="text-admin-muted text-sm mb-6">When users submit the contact form, their messages will appear here.</p>
        </div>
      ) : (
        <div className="bg-admin-card rounded-2xl border border-admin-border overflow-hidden">
          <table className="w-full text-left text-sm text-admin-muted">
            <thead className="bg-black/10 dark:bg-black/20 text-xs uppercase text-admin-text/50 tracking-wider">
              <tr>
                <th className="px-6 py-4">Sender Info</th>
                <th className="px-6 py-4">Message Details</th>
                <th className="px-6 py-4 whitespace-nowrap">Date Received</th>
              </tr>
            </thead>
            <tbody>
              {messages.map((msg) => (
                <tr key={msg.id} className="border-b border-admin-border hover:bg-white/3 transition-colors">
                  <td className="px-6 py-4 align-top">
                    <p className="font-semibold text-admin-text whitespace-nowrap">{msg.name}</p>
                    <a href={`mailto:${msg.email}`} className="text-xs text-cyan-600 dark:text-[#00c2ff] hover:underline whitespace-nowrap">{msg.email}</a>
                  </td>
                  <td className="px-6 py-4">
                    <p className="text-admin-text">{msg.message}</p>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap align-top">
                    <span className="flex items-center gap-1.5 text-admin-muted text-xs">
                      <Calendar size={13} />
                      {new Date(msg.createdAt).toLocaleDateString()}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}
