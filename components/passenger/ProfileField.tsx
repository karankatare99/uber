import React from "react";

interface ProfileFieldProps {
  label: string;
  value: string;
  onChange?: (value: string) => void;
  disabled?: boolean;
  isEditing?: boolean;
}

export const ProfileField: React.FC<ProfileFieldProps> = ({ 
  label, 
  value, 
  onChange, 
  disabled = false, 
  isEditing = false 
}) => (
  <div className="group">
    <label className="block text-[10px] font-bold font-condensed uppercase tracking-widest text-neutral-400 mb-1 group-focus-within:text-black transition-colors">
      {label}
    </label>
    {disabled || !isEditing ? (
      <p className={`text-sm font-semibold py-2 border-b border-transparent truncate ${
        disabled ? "text-neutral-400" : "text-black"
      }`}>
        {value}
      </p>
    ) : (
      <input
        type="text"
        value={value}
        onChange={(e) => onChange?.(e.target.value)}
        className="w-full py-2 bg-transparent border-b border-neutral-200 text-sm font-semibold text-black focus:border-black focus:outline-none transition-all placeholder:text-neutral-300"
      />
    )}
  </div>
);
