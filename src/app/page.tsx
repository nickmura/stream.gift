import Activity from "@/components/Activity";
import Search from "@/components/Search";

export default function Home() {
    return (
        <div
            className="flex flex-col items-center justify-center py-20"
        >
            <h1 className="text-white font-normal text-7xl mb-10">Trade your NFTs</h1>

            <Search />
            <Activity/>
        </div>
    )
}