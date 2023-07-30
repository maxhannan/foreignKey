"use client";

function CustomCodeRenderer({ data }: any) {
  data;

  return (
    <pre className="bg-gray-800 rounded-md p-4 max-w-full overflow-x-auto">
      <code className="text-gray-100 text-sm">{data.code}</code>
    </pre>
  );
}

export default CustomCodeRenderer;
