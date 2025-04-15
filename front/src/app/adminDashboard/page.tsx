import CreateCategoryBlock from "@/components/Admin/CreateCategory";
import PendingRequests from "@/components/Admin/PendingRequests";
import { StatsBlock } from "@/components/Admin/StatsBlock";
import { WelcomeBlock } from "@/components/Admin/WelcomeBlock";
import UserSearcherBlock from "@/components/Admin/UserSearcherBlock";
import ReviewManagerBlock from "@/components/Admin/ReviewSearcher";

export default function AdminDashboard() {
    return (
        <div className="p-6 space-y-6">
            <h1 className="text-3xl font-bold">Panel de Administración</h1>
            
            {/* Primera fila: Welcome y Stats */}
            <div className="flex flex-col md:flex-row gap-6">
                <div className="md:w-1/3 flex flex-col">
                    <div className="flex-1">
                        <WelcomeBlock />
                    </div>
                </div>
                <div className="md:w-2/3 flex flex-col">
                    <div className="flex-1">
                        <StatsBlock />
                    </div>
                </div>
            </div>
            
            {/* Segunda fila: PendingRequests y CreateCategory */}
            <div className="flex flex-col md:flex-row gap-6">
                <div className="md:w-2/3 flex flex-col">
                    <div className="flex-1">
                        <PendingRequests />
                    </div>
                </div>
                <div className="md:w-1/3 flex flex-col">
                    <div className="flex-1">
                        <CreateCategoryBlock />
                    </div>
                </div>
            </div>
            {/* Tercera fila: UserSearcher y ReviewManager */}
            <div className="flex flex-col md:flex-row gap-6">
                <div className="md:w-1/2 flex flex-col">
                    <div className="flex-1">
                        <UserSearcherBlock />
                    </div>
                </div>
                <div className="md:w-1/2 flex flex-col">
                    <div className="flex-1">
                        <ReviewManagerBlock />
                    </div>
                </div>
            </div>
        </div>
    )
}