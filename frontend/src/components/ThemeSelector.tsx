import { PaletteIcon } from "lucide-react";
import { useThemeStore } from "../store/useThemeStore";
import { THEMES } from "../constants";
import { cn } from "../lib/utils";

const ThemeSelector = () => {
    const { theme, setTheme } = useThemeStore();
    return (
        <div className="dropdown dropdown-end">
            <button tabIndex={0} className="btn btn-ghost btn-circle">
                <PaletteIcon className="size-5" />
            </button>
            <div className="dropdown-content mt-2 p-1 shadow-2xl bg-base-200 backdrop-blur-lg rounded-2xl w-56 border border-base-content/10 max-h-80 overflow-y-auto">
                <div className="space-y-1">
                    {
                        THEMES.map((themeOpt) => (
                            <button
                                className={cn(
                                    "w-full px-4 py-3 rounded-xl flex items-center gap-3 transition-colors",
                                    theme === themeOpt.name ?
                                        "bg-primary/10 text-primary" :
                                        "hover:bg-base-content/5"
                                )}
                                key={themeOpt.name}
                                onClick={() => setTheme(themeOpt.name)}>
                                <PaletteIcon className="size-4" />
                                <span className="text-sm font-medium">{themeOpt.label}</span>
                                <div className="ml-auto flex gap-1">
                                    {
                                        themeOpt.colors.map((color, i) => (
                                            <span
                                                className="size-2 rounded-full"
                                                style={{ backgroundColor: color }}
                                                key={i} />
                                        ))
                                    }
                                </div>
                            </button>
                        ))
                    }
                </div>
            </div>
        </div>
    )
}
export default ThemeSelector