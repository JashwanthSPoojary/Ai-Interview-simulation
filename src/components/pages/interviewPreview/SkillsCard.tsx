"use client"
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import axios from "axios";
import { Code, Loader, Plus, Trash } from "lucide-react";
import { useState } from "react";

interface Skills {
    id: string,
    name: string,
}

const SkillsCard = ({skills, profileId}: {skills: Skills[], profileId: string}) => {
    const [editedSkill, setEditedSkill] = useState<Skills[]>(skills);
    const [newSkill, setNewSkill] = useState<string>("");
    const [addSkillLoading, setAddSkillLoading] = useState<boolean>(false);
    const [deleteSkillLoading, setDeleteSkillLoading] = useState<{[key: string]: boolean}>({});
    const [error, setError] = useState<String>("");

    const handleDeleteSkill = async (skillId: string) => {
        setError("");
        setDeleteSkillLoading((prev) => ({...prev, [skillId]: true}));
        try {
            await axios.delete(`/api/profile/skills/${profileId}?skillId=${skillId}`);
            setEditedSkill((prevSkills) => prevSkills.filter((skill) => skill.id !== skillId));
        } catch (error) {
            console.log(error);
            setError("Falied to delete skill");
        } finally {
            setDeleteSkillLoading((prev) => ({...prev, [skillId]: false}));
        }
    }
    
    const handleAddSkill = async () => {
        setError("");
        if(!newSkill?.trim()) {
            setError("Add the Input");
            return;
        }
        
        setAddSkillLoading(true);
        try {
            const res = await axios.post(`/api/profile/skills/${profileId}`, {
                newSkill
            });
            const addedSkill = res.data.addedSkill as Skills;
            setEditedSkill((prevSkills) => [...prevSkills, addedSkill]);
            setNewSkill("");            
        } catch (error) {
            console.error(error);
            setError("Failed to add new skill");
        } finally {
            setAddSkillLoading(false);
        }
    }



    return (
        <Card className="border-gray-200 shadow-sm mt-6">
            <CardHeader className="pb-3 border-b flex flex-row items-center gap-2">
                <Code className="h-5 w-5 text-gray-900" />
                <span className="font-medium text-gray-900">Skills</span>
            </CardHeader>
            <CardContent className="pt-4">
                {error && (
                    <div className="mb-4 p-2 bg-red-50 border border-red-200 rounded text-red-600 text-sm">
                        {error}
                    </div>
                )}
                
                <div className="space-y-4">
                    {editedSkill.length > 0 ? (
                        <div className="flex flex-wrap gap-2">
                            {editedSkill.map((skill,id) => (
                                <div 
                                    key={id} 
                                    className="bg-gray-100 rounded-full py-1 px-3 flex items-center gap-2 group"
                                >
                                    <span className="text-gray-800">{skill.name}</span>
                                    <Button 
                                        variant="ghost" 
                                        size="icon" 
                                        className="h-6 w-6 p-0 opacity-60 hover:opacity-100 hover:bg-gray-200"
                                        onClick={() => handleDeleteSkill(skill.id)}
                                        disabled={deleteSkillLoading[skill.id]}
                                    >
                                        {deleteSkillLoading[skill.id] ? (
                                            <Loader className="h-3 w-3 animate-spin" />
                                        ) : (
                                            <Trash className="h-3 w-3 text-gray-500 hover:text-red-500" />
                                        )}
                                    </Button>
                                </div>
                            ))}
                        </div>
                    ) : (
                        <p className="text-gray-500 italic text-sm">No skills added yet</p>
                    )}
                    
                    <div className="pt-2 border-t">
                        <div className="flex flex-col sm:flex-row gap-2 mt-2">
                            <Input 
                                value={newSkill} 
                                onChange={(e) => setNewSkill(e.target.value)}
                                placeholder="Enter a new skill" 
                                className="flex-1"
                                disabled={addSkillLoading}
                            />
                            <Button 
                                onClick={handleAddSkill} 
                                disabled={addSkillLoading || !newSkill.trim()}
                                className="whitespace-nowrap"
                            >
                                {addSkillLoading ? (
                                    <Loader className="h-4 w-4 mr-2 animate-spin" />
                                ) : (
                                    <Plus className="h-4 w-4 mr-1" />
                                )}
                                Add Skill
                            </Button>
                        </div>
                    </div>
                </div>
            </CardContent>
        </Card>
    )
}

export default SkillsCard