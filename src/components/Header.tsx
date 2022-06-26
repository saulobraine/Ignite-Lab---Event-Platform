import { Logo } from "./Logo";
import { ResponsiveMenu } from "./ResponsiveMenu";

export function Header() {
  return (
    <header className="w-full px-5 lg:p-5 flex items-center justify-between lg:justify-center bg-gray-700 border-b border-gray-600 sticky top-0 z-[51]">
      <Logo />
      <ResponsiveMenu />
    </header>
  )
}