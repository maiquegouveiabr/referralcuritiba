import { ReactNode } from "react";

type PageProps = {
  children: ReactNode;
};

function InteractionsList({ children }: PageProps) {
  return (
    <section className="px-4 md:px-6 py-6">
      <div className="max-w-7xl mx-auto">
        <div className="mb-4">
          <h3 className="text-sm font-semibold text-gray-700 uppercase tracking-wide">Não Designadas</h3>
          <div className="h-0.5 w-12 bg-blue-600 mt-2"></div>
        </div>
        <div className="overflow-x-auto -mx-4 px-4 md:mx-0 md:px-0">
          <ol className="flex flex-row gap-3 pb-4">{children}</ol>
        </div>
      </div>
    </section>
  );
}

export default InteractionsList;
