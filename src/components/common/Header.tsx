import React from "react";
import Link from "next/link";

const Header = () => {
  return (
    <header className="p-4 text-black">
      <div className="container mx-auto flex justify-between items-center">
        <h1 className="font-semibold text-xl">
          <Link href="/" className="text-2xl font-bold">
            青春について
          </Link>
        </h1>
        <nav>
          <ul className="flex space-x-4">
            <>
              <Link
                href="/login"
                className="bg-white text-gray-900 py-2 px-3 rounded-lg font-medium"
              >
                ログイン
              </Link>
              <Link
                href="/signup"
                className="bg-white text-gray-900 py-2 px-3 rounded-lg font-medium"
              >
                サインアップ
              </Link>
            </>
          </ul>
        </nav>
      </div>
    </header>
  );
};

export default Header;
