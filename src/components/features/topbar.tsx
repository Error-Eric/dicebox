import { useNavigate } from "react-router-dom";
import { leaveRoom } from "services/ipc";
import PeerInfoModal from "./peerList";
import TicketViewer from "./ticket";
import { PeerInfo } from "types";
import { CiLogout, CiMemoPad } from "react-icons/ci";
import Button from "components/elements/button";
import { ChatEvent } from "types/events";
import EventLogModal from "./eventLog";
import { useState } from "react";

const TopBar: React.FC<{
  eventLog: ChatEvent[];
  neighbours: PeerInfo[];
  onLeave?: () => void;
  roominfo: string;
}> = ({ eventLog, neighbours, onLeave, roominfo }) => {
  const navigate = useNavigate();
  const [openLog, setOpenLog] = useState<boolean>(false);

  return (
    <div className="flex flex-row space-x-2 py-1 px-1 h-[54px] overflow-auto items-center justify-between bg-indigo-950">
      <Button
        onClick={async () => {
          await leaveRoom();
          if (onLeave) {
            onLeave();
          } else {
            navigate("/lobby");
          }
        }}
      >
        <CiLogout />
      </Button>
      <h1 className="text-xl font-bold py-1">{roominfo}</h1>
      <div className="flex flex-row space-x-2">
        <PeerInfoModal peers={neighbours} />
        <TicketViewer />
        <EventLogModal
          eventLog={eventLog}
          isOpen={openLog}
          onClose={() => setOpenLog(false)}
        />
        <Button onClick={() => setOpenLog(true)}>
          <CiMemoPad />
        </Button>
      </div>
      
    </div>
  );
};

export default TopBar;
