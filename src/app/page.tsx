import Activity from "@/components/Activity";
import Search from "@/components/Search";

export default function Home() {
    return (
        <div
            className="flex items-center justify-center py-20"
        >
            <Search />
            <Activity/>
        </div>
    )
}