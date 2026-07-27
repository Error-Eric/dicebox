import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { VisitedRoom } from "types";
import { getLatestTicket } from "services/ipc";
import ChatView from "components/features/chatView";

export function ChatPage() {
  const navigate = useNavigate();
  const [ticket, setTicket] = useState<VisitedRoom>();

  useEffect(() => {
    getLatestTicket().then((newTicket) => {
      if (newTicket) {
        setTicket(newTicket);
      }
    });
  }, []);

  if (!ticket) return null;

  return <ChatView ticket={ticket} onLeave={() => navigate("/lobby")} />;
}
