import { prisma } from "@/lib/db";
import { MessageCircle, Calendar } from "lucide-react";

export default async function AdminMessages() {
  const messages = await prisma.contactMessage.findMany({
    orderBy: { createdAt: "desc" },
  });

  return (
    <div>
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="text-3xl font-bold text-white font-display">Inquiries</h1>
          <p className="text-sm text-[#dcd7e3]/60 mt-1">{messages.length} total messages received</p>
        </div>
      </div>

      {messages.length === 0 ? (
        <div className="bg-[#24182e] rounded-2xl border border-white/10 p-16 text-center">
          <div className="w-16 h-16 rounded-2xl bg-[#00c2ff]/10 flex items-center justify-center mx-auto mb-4">
            <MessageCircle size={28} className="text-[#00c2ff]" />
          </div>
          <h3 className="text-white font-semibold text-lg mb-2">No Messages Yet</h3>
          <p className="text-[#dcd7e3]/50 text-sm mb-6">When users submit the contact form, their messages will appear here.</p>
        </div>
      ) : (
        <div className="bg-[#24182e] rounded-2xl border border-white/10 overflow-hidden">
          <table className="w-full text-left text-sm text-[#dcd7e3]/70">
            <thead className="bg-black/20 text-xs uppercase text-white/50 tracking-wider">
              <tr>
                <th className="px-6 py-4">Sender Info</th>
                <th className="px-6 py-4">Message Details</th>
                <th className="px-6 py-4 whitespace-nowrap">Date Received</th>
              </tr>
            </thead>
            <tbody>
              {messages.map((msg) => (
                <tr key={msg.id} className="border-b border-white/5 hover:bg-white/3 transition-colors">
                  <td className="px-6 py-4 align-top">
                    <p className="font-semibold text-white whitespace-nowrap">{msg.name}</p>
                    <a href={`mailto:${msg.email}`} className="text-xs text-[#00c2ff] hover:underline whitespace-nowrap">{msg.email}</a>
                  </td>
                  <td className="px-6 py-4">
                    <p className="text-[#dcd7e3]">{msg.message}</p>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap align-top">
                    <span className="flex items-center gap-1.5 text-[#dcd7e3]/50 text-xs">
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
