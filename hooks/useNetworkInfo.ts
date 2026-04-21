"use client";

import { useEffect, useState } from "react";

interface ConnectionInfo {
  effectiveType: "4g" | "3g" | "2g" | "slow-2g";
  downlink: number;
  rtt: number;
  saveData: boolean;
}

interface NavigatorConnectionLike {
  effectiveType: ConnectionInfo["effectiveType"];
  downlink: number;
  rtt: number;
  saveData: boolean;
  addEventListener: (type: "change", listener: () => void) => void;
  removeEventListener: (type: "change", listener: () => void) => void;
}

type NavigatorWithConnection = Navigator & {
  connection?: NavigatorConnectionLike;
  mozConnection?: NavigatorConnectionLike;
  webkitConnection?: NavigatorConnectionLike;
};

export function useNetworkInfo() {
  const [connection, setConnection] = useState<ConnectionInfo | null>(null);
  const [isSlowNetwork, setIsSlowNetwork] = useState(false);

  useEffect(() => {
    const getConnectionInfo = () => {
      const nav = navigator as NavigatorWithConnection;
      const conn = nav.connection || nav.mozConnection || nav.webkitConnection;

      if (conn) {
        const info: ConnectionInfo = {
          effectiveType: conn.effectiveType,
          downlink: conn.downlink,
          rtt: conn.rtt,
          saveData: conn.saveData,
        };

        setConnection(info);

        setIsSlowNetwork(
          info.effectiveType === "3g" ||
            info.effectiveType === "2g" ||
            info.effectiveType === "slow-2g" ||
            info.saveData
        );
      }
    };

    getConnectionInfo();

    const nav = navigator as NavigatorWithConnection;
    const conn = nav.connection || nav.mozConnection || nav.webkitConnection;
    if (conn) {
      conn.addEventListener("change", getConnectionInfo);
      return () => conn.removeEventListener("change", getConnectionInfo);
    }
  }, []);

  return { connection, isSlowNetwork };
}
