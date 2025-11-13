import React from "react";

export  function MainContent({ selectedModule, selectedSub }) {
  return (
    <main className="flex-1 overflow-auto p-6 bg-background transition-colors duration-300">
      <h2 className="mb-4 text-xl font-semibold">
        {selectedModule} / {selectedSub}
      </h2>
      <div className="rounded-xl border bg-card p-6 shadow-sm transition-colors duration-300">
        <h2 className="text-base font-medium">
          Yahan per main page banakar lagaunga
        </h2>
      </div>
    </main>
  );
}
