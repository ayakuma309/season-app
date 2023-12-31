import Layout from "@/components/common/Layout";
import Link from "next/link";
import React from "react";

export default function Home() {
    return (
        <Layout>
            <Link href="/pixel">Pixel</Link>
            <Link href="/gradation">Gradation</Link>
            <Link href="/diagnosis">Diagnosis</Link>
        </Layout>
    );
}
