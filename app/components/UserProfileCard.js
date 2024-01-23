"use client";

import Image from "next/image";
import Link from "next/link";
import React, { useEffect, useRef, useState } from "react";

export default function UserProfileCard({ initialItems, fetchProfiles }) {
  const fetching = useRef(false);
  const [pages, setPages] = useState([initialItems]);
  const items = pages.flatMap((page) => page);

  const loadMore = async () => {
    if (!fetching.current) {
      try {
        fetching.current = true;

        const nextPage = pages.length + 1; // Increment the page count
        const data = await fetchProfiles(nextPage);

        setPages((prev) => [...prev, data]);
      } finally {
        fetching.current = false;
      }
    }
  };

  const handleScroll = () => {
    if (
      window.innerHeight + document.documentElement.scrollTop ===
      document.documentElement.offsetHeight
    ) {
      loadMore();
    }
  };

  useEffect(() => {
    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, [pages]);
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8 p-4">
      {items.map((profile, index) => (
        <Link key={index} href={`/profile/${profile.login}`}>
          <div className="flex items-center p-6 space-x-6 bg-white rounded-xl shadow-lg hover:shadow-xl transform hover:scale-105 transition duration-500">
            <div className="items-center justify-center flex flex-col bg-gray-100 p-4 w-72  rounded-lg">
              <Image
                src={profile.avatar_url}
                alt={`${profile.login}'s Avatar`}
                height={48}
                width={48}
                className="w-16 h-16 mx-auto mb-4 rounded-full"
              />
              <div className="text-black text-md font-medium">
                {profile.login}
              </div>
            </div>
          </div>
        </Link>
      ))}
      {fetching.current && <span className="">Loading...</span>}
    </div>
  );
}
