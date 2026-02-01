import React from "react";
import { Bell, Shield, Mail, ChevronRight, LucideIcon } from "lucide-react";

interface SettingItem {
  icon: LucideIcon;
  label: string;
}

const settingsItems: SettingItem[] = [
  { icon: Bell, label: "Notifications" },
  { icon: Shield, label: "Privacy & Security" },
  { icon: Mail, label: "Communications" }
];

export const SettingsSection: React.FC = () => (
  <section>
    <h3 className="text-sm font-black mb-4 text-black">Settings</h3>
    <div className="space-y-1">
      {settingsItems.map((item) => (
        <button 
          key={item.label} 
          className="w-full flex items-center justify-between py-3 group"
        >
          <div className="flex items-center gap-3 text-neutral-500 group-hover:text-black transition-colors">
            <item.icon size={18} strokeWidth={2} />
            <span className="text-sm font-medium">{item.label}</span>
          </div>
          <ChevronRight 
            size={14} 
            className="text-neutral-300 group-hover:text-black transition-colors" 
          />
        </button>
      ))}
    </div>
  </section>
);
