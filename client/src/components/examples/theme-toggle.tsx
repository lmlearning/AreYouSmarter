import { ThemeToggle } from "../theme-toggle";
import { ThemeProvider } from "@/lib/theme-provider";

export default function ThemeToggleExample() {
  return (
    <ThemeProvider>
      <div className="flex items-center justify-center h-20">
        <ThemeToggle />
      </div>
    </ThemeProvider>
  );
}
