import { ReactNode } from "react";

type PageProps = {
  children: ReactNode;
};

function InteractionsClaimedList({ children }: PageProps) {
  return (
    <section className="px-4 md:px-6 py-6 border-t border-gray-200">
      <div className="max-w-7xl mx-auto">
        <div className="mb-4">
          <h3 className="text-sm font-semibold text-gray-700 uppercase tracking-wide">Minha Lista</h3>
          <div className="h-0.5 w-12 bg-blue-600 mt-2"></div>
        </div>
        <ol className="space-y-4">{children}</ol>
      </div>
    </section>
  );
}

export default InteractionsClaimedList;
