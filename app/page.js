import UserProfileCard from "./components/UserProfileCard";

async function fetchProfiles(since = 1) {
  "use server";

  const res = await fetch(`https://api.github.com/users?since=${since}`, {
    cache: "no-store",
  });

  if (!res.ok) {
    throw new Error("Failed to fetch data");
  }

  return res.json();
}

export default async function Home() {
  const items = await fetchProfiles();
  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24">
      <span className="text-xl font-semibold mb-10">
        Users Github Profile With Infinte Scroll
      </span>
      <UserProfileCard initialItems={items} fetchProfiles={fetchProfiles} />
    </main>
  );
}
