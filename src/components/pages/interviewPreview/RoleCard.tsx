"use client"
import React, { useState } from 'react';
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Loader, Pencil, Save, X, UserCircle } from "lucide-react";
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import axios from 'axios';

const RoleCard = ({ role, profileId }: { role: string, profileId: string }) => {
  const [editedRole, setEditedRole] = useState<string>(role);
  const [isEditing, setIsEditing] = useState<boolean>(false);
  const [loading, setLoading] = useState<boolean>(false);

  const handleSave = async () => {
    setLoading(true);
    try {
      const res = await axios.put(`/api/profile/role/${profileId}`, {
        editedRole: editedRole
      });
      setEditedRole(res.data.editedRole);
      setIsEditing(false);
    } catch (error) {
      console.error("Error updating role:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleCancel = () => {
    setEditedRole(role); // Reset to original value
    setIsEditing(false);
  };

  return (
    <Card className="border-gray-200 shadow-sm">
      <CardHeader className="pb-3 border-b flex flex-row items-center justify-between">
        <div className="flex items-center gap-2">
          <UserCircle className="h-5 w-5 text-gray-900" />
          <span className="font-medium text-gray-900">Role</span>
        </div>
        {!isEditing && (
          <Button 
            variant="ghost" 
            size="sm" 
            onClick={() => setIsEditing(true)}
            className="h-8 w-8 p-0"
          >
            <Pencil className="h-4 w-4" />
          </Button>
        )}
      </CardHeader>
      <CardContent className="pt-4">
        {isEditing ? (
          <div className="space-y-4">
            <Input 
              value={editedRole} 
              onChange={(e) => setEditedRole(e.target.value)}
              className="w-full"
            />
            <div className="flex gap-2 justify-end mt-2">
              <Button 
                variant="outline" 
                size="sm"
                onClick={handleCancel}
                disabled={loading}
                className="flex items-center gap-1"
              >
                <X className="h-4 w-4" /> Cancel
              </Button>
              <Button 
                size="sm" 
                onClick={handleSave}
                disabled={loading}
                className="flex items-center gap-1"
              >
                {loading ? (
                  <Loader className="h-4 w-4 animate-spin" />
                ) : (
                  <Save className="h-4 w-4" />
                )}
                Save
              </Button>
            </div>
          </div>
        ) : (
          <div className="text-gray-800 py-2">
            {editedRole}
          </div>
        )}
      </CardContent>
    </Card>
  );
};

export default RoleCard;