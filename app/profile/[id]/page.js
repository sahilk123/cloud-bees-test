import Image from "next/image";
import Link from "next/link";
import React from "react";

async function fetchUserProfile(id) {
  const res = await fetch(`https://api.github.com/users/${id}`, {
    cache: "no-store",
  });

  if (!res.ok) {
    throw new Error("Failed to fetch data");
  }

  return res.json();
}

export default async function page({ params }) {
  const data = await fetchUserProfile(params.id);
  console.log({ data });
  return (
    <div className="flex flex-col items-center justify-center w-full py-20 ">
      <div className="max-w-lg  bg-gray-800 items-center justify-center flex flex-col text-white p-8 rounded-lg shadow-md">
        <Image
          src={data.avatar_url}
          alt="Profile Picture"
          height={100}
          width={100}
          className=" rounded-full border-4 border-indigo-500"
        />
        <div className="flex flex-col items-start justify-start">
          <h2 className="text-2xl font-bold mt-4">@{data.login}</h2>
          <p className="text-gray-400">@{data.login}</p>
          <p className="mt-4">🌍 {data.location}</p>
          <p className="mt-2">
            👥 Followers: {data.followers} &nbsp; &nbsp; 🤝 Following:{" "}
            {data.following} &nbsp; &nbsp; 📦 Repos: {data.public_repos}
          </p>
          {data.blog && (
            <p className="mt-4">
              🔗{" "}
              <Link href={data.blog} target="_blank">
                Website
              </Link>
            </p>
          )}
          <p className="mt-4">📖 {data.name}</p>
          <p className="mt-2">🏢 Works at: {data.company}</p>
          <div className="w-full justify-center flex items-center mt-6">
            <Link target="_blank" href={data.html_url}>
              <div className="bg-indigo-500 hover:bg-indigo-600 text-white px-4 py-2 rounded-md">
                View Profile
              </div>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
