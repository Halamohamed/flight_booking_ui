import {Mail, Plane} from "lucide-react";

const Footer = () => {
    return (
        <footer className="border-t border-slate-200 bg-white">
            <div className="mx-auto flex max-w-5xl flex-col gap-3 px-4 py-6 text-sm text-slate-600 sm:flex-row sm:items-center sm:justify-between">
                <div className="flex items-center gap-2 font-semibold text-slate-800">
                    <Plane size={18} className="text-sky-600" />
                    Flight Booker
                </div>

                <div className="flex items-center gap-2">
                    <Mail size={16} />
                    info@flightbooker.com
                </div>

                <div>Copyright 2026 Flight Booker</div>
            </div>
        </footer>
    );
};

export default Footer;
