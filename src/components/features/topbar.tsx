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
}> = ({ eventLog, neighbours, onLeave }) => {
  const [openLog, setOpenLog] = useState<boolean>(false);

  return (
    <div className="flex flex-row space-x-2 bg-blue-950 py-1 px-1"
      style = {{height: '54px',
                overflow: 'auto',
                alignItems: 'center',
                justifyContent: "space-between"
              }}>
      <Button
        onClick={async () => {
          await leaveRoom();
          if (onLeave) {
            onLeave();
          } else {
            location.href = "/lobby";
          }
        }}
      >
        <CiLogout />
      </Button>
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
