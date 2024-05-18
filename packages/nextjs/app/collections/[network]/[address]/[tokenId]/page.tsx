"use client";

export default function Token({ params }: { params: { id: string } }) {
  console.log(params);

  return (
    <div>
      <p>Hello!</p>
    </div>
  );
}
