import { Plus } from 'lucide-react'
import { useState,useEffect } from 'react'
import StatsGrid from '../components/StatsGrid'
import ProjectOverview from '../components/ProjectOverview'
import RecentActivity from '../components/RecentActivity'
import TasksSummary from '../components/TasksSummary'
import CreateProjectDialog from '../components/CreateProjectDialog'


const Dashboard = () => {

    const user = { fullName: 'User' }

    const [isDialogOpen, setIsDialogOpen] = useState(false);
    const [projects, setProjects] = useState([]);
    const[tasks,setTasks]=useState([]);

    const fetchProjects = async () => {
        const token = localStorage.getItem("token");
        console.log("Token:",token);

        if (!token) return;

        try {
            const response = await fetch(
                "https://project-management-system-1jso.onrender.com/projects",
                {
                    method: "GET",
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                }
            );

            const data = await response.json();
            console.log("Projects:",data);

            setProjects(Array.isArray(data)?data:[]);
            console.log("Projects: ",data);

        } catch (error) {
            console.error("Error fetching projects:", error);
        }
    };
    const fetchTasks = async () => {
  const token = localStorage.getItem("token");

  try {
    const response = await fetch("https://project-management-system-1jso.onrender.com/tasks/assigned", {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    const data = await response.json();
    setTasks(Array.isArray(data) ? data : []);
    console.log("DASHBOARD TASKS:",data);
  } catch (error) {
    console.error("Error fetching tasks:", error);
  }
};

    useEffect(() => {
        fetchProjects();
        fetchTasks();
    }, []);
    const totalProjects = projects.length;
    const completedProjects = projects.filter(
        (project)=> project.status === "COMPLETED"

    ).length;
    const myTasks = 0;
    const overdueProjects = projects.filter(
        (project)=> new Date(project.end_date)< new Date() && project.status !=="COMPLETED"
    ).length;
    

    return (
        <div className='max-w-6xl mx-auto'>

            <div className="flex flex-col lg:flex-row justify-between items-start lg:items-center gap-6">
                <div>
                    <h1 className="text-xl sm:text-2xl font-semibold text-gray-900 dark:text-white mb-1">
                        Welcome back, {user?.fullName || 'User'}
                    </h1>

                    <p className="text-gray-500 dark:text-zinc-400 text-sm">
                        Here's what's happening with your projects today
                    </p>
                </div>

                <button
                    onClick={() => setIsDialogOpen(true)}
                    className="flex items-center gap-2 px-5 py-2 text-sm rounded bg-gradient-to-br from-blue-500 to-blue-600 text-white space-x-2 hover:opacity-90 transition"
                >
                    <Plus size={16} />
                    New project
                </button>

                <CreateProjectDialog
                    isDialogOpen={isDialogOpen}
                    setIsDialogOpen={setIsDialogOpen}
                />
            </div>

            <StatsGrid projects = {projects} 
            tasks = {tasks}/>
            <h2 className="text-xl font-bold mt-6 mb-3">
                My Projects
                </h2> 
                <div className="space-y-3">
                {Array.isArray(projects) &&

                    projects.map((project)=>(
                        <div
                        key = {project._id}
                        className="p-4 border rounded-lg">
                            <h3>{project.name}</h3>
                            <p>{project.description}</p>
                            <p>{project.status}</p>
                            {/* <p>{project._id}</p> */}
                        </div>
                    ))}
                    </div>
                    {/* {
                constructor(parameters) {
                    
                }
            } */}

            {/* Project List */}
            {/* <div className="mt-6 space-y-3">
            {Array.isArray(projects) &&
                projects.map((project) => (
                    <div
                        key={project._id}
                        className="p-4 border rounded-lg"
                    >
                        <h3 className="font-semibold">
                            {project.title}
                        </h3>
                        <p className="text-gray-600 dark:text-zinc-400 text-sm mt-2">
                            {project.description}
                        </p>
                        <p className="text-blue-500 font-medium mt-2">
                            {project.status}
                        </p>
                    </div>
                ))}
            </div> */}

            <div className="grid lg:grid-cols-3 gap-8">
                <div className="lg:col-span-2 space-y-8">
                    <ProjectOverview projects = {projects} />
                    <RecentActivity tasks={tasks} />
                </div>

                <div>
                    <TasksSummary tasks = {tasks} />
                </div>
            </div>

        </div>
    );
};

export default Dashboard;