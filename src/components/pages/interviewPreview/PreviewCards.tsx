import { Card, CardHeader } from "@/components/ui/card"
import RoleCard from "./RoleCard"
import SkillsCard from "./SkillsCard"
import ProjectsCard from "./ProjectsCard"

interface Projects {
    id:string,
    name:string,
    description:string,
    developerId:string
}
interface Skills {
    id:string,
    name:string,
}
interface ProfileProps {
    id:string,
    role:string,
    skills:Skills[],
    projects:Projects[]
}

const PreviewCards = ({data}:{data:ProfileProps}) => {
  return (
    <div>
      <RoleCard role={data.role} profileId={data.id}/>
      <SkillsCard skills={data.skills} profileId={data.id}/>
      <ProjectsCard projects={data.projects} profileId={data.id} />
    </div>
  )
}

export default PreviewCards;