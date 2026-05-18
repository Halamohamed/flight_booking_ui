import Navbar from "./Navbar.tsx";
import Footer from "./Footer.tsx";
import * as React from "react";



const AppLayout = ({children}: {children: React.ReactNode}) => {
    return (
        <div className="min-h-screen bg-slate-100 text-slate-900">
            <header className="border-b border-slate-200 bg-white">
                <div className="mx-auto flex max-w-5xl flex-col gap-3 px-4 py-4 sm:flex-row sm:items-center sm:justify-between">
                    <h1 className="text-lg font-bold text-slate-950">Flight Booker</h1>
                    <Navbar />
                </div>
            </header>

            <main className="mx-auto min-h-[70vh] max-w-5xl p-4 sm:p-6">{children}</main>
            <Footer />
        </div>
    );
};

export default AppLayout;
