"use client";
import { useState } from "react";

export default function WhoAmIButton({
  whoAmIAction,
}: {
  whoAmIAction: () => Promise<string>;
}) {
  const [name, setName] = useState<string>();
  return (
    <div>
      <button
        className="py-2 px-5 border rounded-lg border-black hover:bg-black hover:text-white hover:rounded-lg hover:transition hover:duration-250"
        onClick={async () => {
          setName(await whoAmIAction());
        }}
      >
        Who Am I?
      </button>
      {name && <div className="mt-5">You are {name}</div>}
    </div>
  );
}
