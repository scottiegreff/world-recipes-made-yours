"use client";
import React, { useState, useRef, useEffect, ReactNode } from "react";

interface AccordionProps {
  title: string;
  children: ReactNode;
}

const Accordion: React.FC<AccordionProps> = ({ title, children }) => {
  const [isOpen, setIsOpen] = useState(false);
  const contentRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (contentRef.current) {
      contentRef.current.style.maxHeight = isOpen
        ? `${contentRef.current.scrollHeight}px`
        : "0";
    }
  }, [isOpen]);

  return (
    <div className="border-black rounded-lg overflow-hidden py-7">
      <button
        className="w-full text-left p-4 text-3xl lg:text-5xl xl:text-5xl font-bold"
        onClick={() => setIsOpen(!isOpen)}
      >
        {title}
      </button>
      <div
        ref={contentRef}
        className="transition-max-height duration-700 ease-in-out overflow-hidden"
        style={{ maxHeight: "0" }}
      >
        <div className="p-4">{children}</div>
      </div>
    </div>
  );
};

export default Accordion;
