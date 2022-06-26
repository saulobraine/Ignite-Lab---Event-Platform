import { List, X } from "phosphor-react";
import { useState } from "react";
import { Sidebar } from "./Sidebar";

export function ResponsiveMenu() {
  const [open, setIsOpen] = useState(false);
  return (
    <div className="lg:hidden">
      <button
        type="button"
        className="min-h-[75px] flex gap-3 items-center"
        onClick={() => setIsOpen(!open)}
      >
        Aulas
        <span className="text-blue-500">
          {open
            ? <X size={32} weight="light" />
            : <List size={32} weight="light" />
          }
        </span>
      </button>
      <div className={`
        z-50 absolute left-0 right-0 transition-all ease-in-out duration-500
        ${open ? 'visible opacity-100' : 'invisible opacity-0'}
      `}>
        <Sidebar className="min-w-full w-full" setIsOpen={setIsOpen} open={open} />
      </div>
    </div>
  )
}