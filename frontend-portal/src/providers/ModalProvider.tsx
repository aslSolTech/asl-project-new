"use client";

import { useSyncExternalStore } from "react";

const emptySubscribe = () => () => {};

export const ModalProvider = () => {
  const isMounted = useSyncExternalStore(
    emptySubscribe,
    () => true,
    () => false
  );

  if (!isMounted) return null;

  return (
    <>
      {/* Aur modals (jaise AddCardModal) bhi yahan list kar sakte hain */}
    </>
  );
}

