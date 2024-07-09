"use client";

export default function Page({ params }: { params: { taskSlug: string } }) {
  const { taskSlug } = params;
  console.log(params);

  return (
    <div>
      <h1>Task slug: {taskSlug} </h1>
      {/* Your task content goes here */}
    </div>
  );
}
