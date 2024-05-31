import Header from "@/components/Header";
import Footer from "@/components/Footer";
import Sidebar from "@/components/Sidebar";
import Wrapper from "@/components/Wrapper";
import Modals from "@/components/Modal/Modals";

export default function MainLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    return (
        <Wrapper>
            <Modals />
            <div className="flex pr-48 max-xl:pr-0">
                <Sidebar />
                <div className="flex-1 flex flex-col">
                    <Header />
                    <main className="mt-10 p-2">{children}</main>
                </div>
            </div>
            <Footer />
        </Wrapper>
    );
}
