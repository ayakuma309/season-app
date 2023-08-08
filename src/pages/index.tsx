import Layout from "@/components/common/Layout";
import Link from "next/link";
import React from "react";

export default function Home() {
    return (
        <Layout>
            <Link href="/pixel">
                Pixel
            </Link>
        </Layout>
    );
}
