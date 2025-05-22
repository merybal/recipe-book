import React, { useState, useRef } from "react";
import clsx from "clsx";
import styles from "./BottomSheet.module.scss";

type BottomSheetProps = {
  children: React.ReactNode;
};

const BottomSheet = ({ children }: BottomSheetProps) => {
  const [screenHeight, setScreenHeight] = useState<"half" | "full">("half");
  const startYRef = useRef<number | null>(null);

  const handleTouchStart = (e: React.TouchEvent) => {
    startYRef.current = e.touches[0].clientY;
  };

  const handleTouchMove = (e: React.TouchEvent) => {
    if (startYRef.current === null) return;
    const currentY = e.touches[0].clientY;
    const deltaY = startYRef.current - currentY;

    if (deltaY > 50 && screenHeight === "half") {
      setScreenHeight("full");
      startYRef.current = null;
    } else if (deltaY < -50 && screenHeight === "full") {
      setScreenHeight("half");
      startYRef.current = null;
    }
  };

  const handleTouchEnd = () => {
    startYRef.current = null;
  };

  return (
    <>
      <div
        className={clsx(
          styles["bottom-sheet"],
          styles[`${screenHeight}-screen`]
        )}
      >
        <div
          className={styles["handle-container"]}
          onTouchStart={handleTouchStart}
          onTouchMove={handleTouchMove}
          onTouchEnd={handleTouchEnd}
        >
          <div className={styles.handle} />
        </div>
        <div className={styles.content}>{children}</div>
      </div>
    </>
  );
};

export default BottomSheet;
