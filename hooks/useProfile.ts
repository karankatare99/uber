// hooks/useProfile.ts
"use client";

import { useState, useEffect } from "react";
import axios from "axios";
import { UserProp } from "@/lib/getUser";

interface FormData {
  firstName: string;
  lastName: string;
}

export function useProfile(initialUser: UserProp) {
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [userData, setUserData] = useState<UserProp>(initialUser);
  const [isEditing, setIsEditing] = useState(false);
  const [formData, setFormData] = useState<FormData>({ 
    firstName: "", 
    lastName: "" 
  });

  useEffect(() => {
    setUserData(initialUser);
    setFormData({ 
      firstName: initialUser.firstName || "", 
      lastName: initialUser.lastName || "" 
    });
    setLoading(false);
  }, [initialUser]);

  const updateFirstName = (value: string) => {
    setFormData(prev => ({ ...prev, firstName: value }));
  };

  const updateLastName = (value: string) => {
    setFormData(prev => ({ ...prev, lastName: value }));
  };

  const handleSave = async () => {
    setSaving(true);
    
    try {
      // 1. Update on backend
      const res = await axios.post("/api/users/profile", {
        firstName: formData.firstName,
        lastName: formData.lastName,
        email: userData.email
      });

      const { updatedUser } = res.data;
      setUserData(updatedUser);
      setFormData({ 
        firstName: updatedUser.firstName, 
        lastName: updatedUser.lastName 
      });

      setIsEditing(false);
      
    } catch (e) {
      console.error("Failed to update fields", e);
      alert("Failed to update profile. Please try again.");
    } finally {
      setSaving(false);
    }
  };

  // ... rest of your hook unchanged
  const handleCancel = () => {
    setFormData({ 
      firstName: userData.firstName || "", 
      lastName: userData.lastName || "" 
    });
    setIsEditing(false);
  };

  const startEditing = () => setIsEditing(true);
  const getInitials = () => formData.firstName ? formData.firstName[0].toUpperCase() : "U";

  return {
    loading, saving, userData, formData, isEditing,
    updateFirstName, updateLastName, handleSave, handleCancel, startEditing, getInitials
  };
}
