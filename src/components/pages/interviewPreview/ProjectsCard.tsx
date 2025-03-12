"use client"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { PlusCircle, Edit, Trash2, Save, X, Loader } from "lucide-react"
import axios from "axios"
import { useState } from "react"
import { Badge } from "@/components/ui/badge"
import { Separator } from "@/components/ui/separator"
import { AlertCircle } from "lucide-react"
import { Alert, AlertDescription } from "@/components/ui/alert"

interface Projects {
    id: string,
    name: string,
    description: string,
    developerId: string
}
interface NewProject {
    name: string,
    description: string
}

const ProjectsCard = ({ projects, profileId }: { projects: Projects[], profileId: string }) => {
    const [editedProjects, setEditedProjects] = useState<Projects[]>(projects);
    const [isEditing, setIsEditing] = useState<{ [key: string]: boolean }>({});
    const [editedProjectValues, setEditedProjectValues] = useState<{ [key: string]: { name: string, description: string } }>({});
    const [addNewProject, setAddNewProject] = useState<NewProject>({
        name: "",
        description: ""
    });
    const [error, setError] = useState<string>("");
    const [showAddForm, setShowAddForm] = useState<boolean>(false);
    const [isLoading, setIsLoading] = useState<{ [key: string]: boolean }>({});

    const handleDelete = async (projectId: string) => {
        setIsLoading(prev => ({ ...prev, [`delete_${projectId}`]: true }));
        try {
            const res = await axios.delete(`/api/profile/projects/${projectId}`);
            const deletedProjectId = await res.data.deletedProjectId.id;
            setEditedProjects((prevProjects) => prevProjects.filter((project) => project.id !== deletedProjectId));
        } catch (error) {
            console.error(error);
            setError("Failed to delete project");
        } finally {
            setIsLoading(prev => ({ ...prev, [`delete_${projectId}`]: false }));
        }
    }
    
    const handleProjectEdit = async (projectId: string) => {
        setIsLoading(prev => ({ ...prev, [`save_${projectId}`]: true }));
        try {
            const res = await axios.put(`/api/profile/projects/${projectId}`, { 
                name: editedProjectValues[projectId]?.name, 
                description: editedProjectValues[projectId]?.description 
            });
            const updatedProject = res.data.updatedProject;
            setEditedProjects(prevProjects => prevProjects.map((prevProject) => 
                prevProject.id === projectId ? {
                    ...prevProject, 
                    name: updatedProject.name, 
                    description: updatedProject.description
                } : prevProject
            ))
            setIsEditing(prev => ({ ...prev, [projectId]: false }));
        } catch (error) {
            console.error(error);
            setError("Failed to update project");
        } finally {
            setIsLoading(prev => ({ ...prev, [`save_${projectId}`]: false }));
        }
    }
    
    const handleEditingOpen = (projectId: string) => {
        setIsEditing((prev) => ({ ...prev, [projectId]: true }));
        const project = editedProjects.find((project) => project.id === projectId);
        setEditedProjectValues((prev) => ({
            ...prev,
            [projectId]: {
                ...prev[projectId],
                name: project?.name || "",
                description: project?.description || ""
            }
        }));
    }
    
    const handleProjectAdd = async () => {
        if (!addNewProject.name?.trim()) {
            setError("Enter the project name");
            return;
        }
        if (!addNewProject.description?.trim()) {
            setError("Enter the project description");
            return;
        }
        
        setIsLoading(prev => ({ ...prev, "add_project": true }));
        try {
            const res = await axios.post(`/api/profile/projects/${profileId}`, {
                name: addNewProject.name,
                description: addNewProject.description
            });
            setEditedProjects((prev) => [...prev, res.data.newProject]);
            setAddNewProject({ name: "", description: "" });
            setShowAddForm(false);
            setError("");
        } catch (error) {
            console.error(error);
            setError("Failed to add new Project");
        } finally {
            setIsLoading(prev => ({ ...prev, "add_project": false }));
        }
    }

    const resetForm = () => {
        setShowAddForm(false);
        setAddNewProject({ name: "", description: "" });
        setError("");
    }

    return (
        <Card className="w-full shadow-md">
            <CardHeader className="pb-3">
                <div className="flex flex-row justify-between items-center">
                    <CardTitle className="text-xl font-bold">Projects</CardTitle>
                    <Button 
                        onClick={() => setShowAddForm(!showAddForm)} 
                        variant={showAddForm ? "secondary" : "default"} 
                        size="sm" 
                        className="flex gap-1 items-center"
                    >
                        {showAddForm ? <X size={16} /> : <PlusCircle size={16} />}
                        <span className="hidden sm:inline">{showAddForm ? "Cancel" : "Add Project"}</span>
                    </Button>
                </div>
            </CardHeader>
            
            <CardContent className="pt-0 flex flex-col gap-4">
                {error && (
                    <Alert variant="destructive" className="mb-2">
                        <AlertCircle className="h-4 w-4" />
                        <AlertDescription>{error}</AlertDescription>
                    </Alert>
                )}

                {/* Add Project Form */}
                {showAddForm && (
                    <div className="p-4 border rounded-md bg-gray-50 mb-4 dark:bg-gray-900">
                        <h3 className="text-md font-medium mb-2">Add New Project</h3>
                        <div className="flex flex-col gap-3">
                            <Input 
                                value={addNewProject.name} 
                                onChange={(e) => setAddNewProject((prev) => ({ ...prev, name: e.target.value }))} 
                                placeholder="Project name" 
                                className="w-full"
                            />
                            <Textarea 
                                value={addNewProject.description} 
                                onChange={(e) => setAddNewProject((prev) => ({ ...prev, description: e.target.value }))} 
                                placeholder="Project description"
                                className="w-full min-h-[80px]"
                            />
                            <div className="flex gap-2 justify-end mt-2">
                                <Button variant="outline" size="sm" onClick={resetForm}>Cancel</Button>
                                <Button 
                                    size="sm" 
                                    onClick={handleProjectAdd}
                                    disabled={isLoading["add_project"]}
                                >
                                    {isLoading["add_project"] ? (
                                        <>
                                            <Loader className="h-4 w-4 mr-2 animate-spin" /> 
                                            Saving...
                                        </>
                                    ) : (
                                        "Save Project"
                                    )}
                                </Button>
                            </div>
                        </div>
                    </div>
                )}

                {/* Projects List */}
                {editedProjects.length === 0 ? (
                    <div className="text-center py-8 text-gray-500">
                        <p>No projects added yet. Click "Add Project" to get started.</p>
                    </div>
                ) : (
                    <div className="flex flex-col gap-4">
                        {editedProjects.map((project, index) => (
                            <div key={project.id} className="relative">
                                {index > 0 && <Separator className="mb-4" />}
                                
                                {isEditing[project.id] ? (
                                    <div className="flex flex-col gap-3">
                                        <Input
                                            value={editedProjectValues[project.id]?.name || ""}
                                            onChange={(e) => setEditedProjectValues((prev) => ({
                                                ...prev,
                                                [project.id]: { ...prev[project.id], name: e.target.value }
                                            }))}
                                            placeholder="Project name"
                                            className="w-full"
                                        />
                                        <Textarea
                                            value={editedProjectValues[project.id]?.description || ""}
                                            onChange={(e) => setEditedProjectValues((prev) => ({
                                                ...prev,
                                                [project.id]: { ...prev[project.id], description: e.target.value }
                                            }))}
                                            placeholder="Project description"
                                            className="w-full min-h-[80px]"
                                        />
                                        <div className="flex gap-2 justify-end mt-2">
                                            <Button 
                                                variant="outline" 
                                                size="sm"
                                                onClick={() => setIsEditing((prev) => ({ ...prev, [project.id]: false }))}
                                            >
                                                <X size={16} className="mr-1" /> Cancel
                                            </Button>
                                            <Button 
                                                size="sm"
                                                onClick={() => handleProjectEdit(project.id)}
                                                disabled={isLoading[`save_${project.id}`]}
                                            >
                                                {isLoading[`save_${project.id}`] ? (
                                                    <>
                                                        <Loader className="h-4 w-4 mr-2 animate-spin" /> 
                                                        Saving...
                                                    </>
                                                ) : (
                                                    <>
                                                        <Save size={16} className="mr-1" /> Save
                                                    </>
                                                )}
                                            </Button>
                                        </div>
                                    </div>
                                ) : (
                                    <div className="flex flex-col sm:flex-row gap-3 sm:items-start justify-between">
                                        <div className="flex-1">
                                            <h4 className="text-lg font-medium mb-1">{project.name}</h4>
                                            <p className="text-gray-600 dark:text-gray-400 text-sm whitespace-pre-wrap">
                                                {project.description}
                                            </p>
                                        </div>
                                        <div className="flex gap-2 self-end sm:self-start">
                                            <Button 
                                                variant="outline" 
                                                size="sm" 
                                                onClick={() => handleEditingOpen(project.id)}
                                                className="h-8 px-2 text-xs"
                                            >
                                                <Edit size={14} className="mr-1" /> Edit
                                            </Button>
                                            <Button 
                                                variant="default" 
                                                size="sm" 
                                                onClick={() => handleDelete(project.id)}
                                                className="h-8 px-2 text-xs"
                                                disabled={isLoading[`delete_${project.id}`]}
                                            >
                                                {isLoading[`delete_${project.id}`] ? (
                                                    <>
                                                        <Loader className="h-4 w-4 mr-1 animate-spin" /> 
                                                        Deleting...
                                                    </>
                                                ) : (
                                                    <>
                                                        <Trash2 size={14} className="mr-1" /> Delete
                                                    </>
                                                )}
                                            </Button>
                                        </div>
                                    </div>
                                )}
                            </div>
                        ))}
                    </div>
                )}
            </CardContent>
        </Card>
    )
}

export default ProjectsCard