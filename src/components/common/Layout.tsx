import React from "react";
import Header from "./Header";
import { CommonTypeProps } from "@/types/Type";

const Layout: React.FC<CommonTypeProps> = ({ children }) => {
    return (
        <div className="min-h-screen items-center justify-center font-mono">
            <Header />
            <main className="flex min-h-screen flex-col items-center p-12">
                {children}
            </main>
        </div>
    );
};

export default Layout;
