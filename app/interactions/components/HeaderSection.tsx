import { PageStateProps } from "../hooks/useInteractionsPageState";
import HeaderButtonGroup from "@/components/HeaderButtonGroup";
import DatePicker from "@/components/DatePicker";

type Props = {
  filteredCount: number;
  claimedCount: number;
  state: PageStateProps;
};

export default function HeaderSection({ filteredCount, claimedCount, state }: Props) {
  return (
    <header className="sticky top-0 z-50 bg-gradient-to-r from-blue-600 to-blue-700 shadow-lg border-b border-blue-800">
      <div className="max-w-7xl mx-auto px-4 py-6">
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-6">
          {/* Title Section */}
          <div className="flex flex-col gap-3">
            <div className="flex flex-col gap-2 md:flex-row md:gap-8">
              <div className="flex items-baseline gap-2">
                <h2 className="text-white text-lg font-bold">NÃO DESIGNADAS</h2>
                <span className="bg-blue-800 text-blue-100 text-sm font-semibold px-3 py-1 rounded-full">{filteredCount}</span>
              </div>
              <div className="flex items-baseline gap-2">
                <h2 className="text-white text-lg font-bold">MINHA LISTA</h2>
                <span className="bg-blue-800 text-blue-100 text-sm font-semibold px-3 py-1 rounded-full">{claimedCount}</span>
              </div>
            </div>
          </div>

          {/* Filter Controls */}
          <div className="flex flex-col sm:flex-row gap-3 sm:items-center">
            <HeaderButtonGroup onSetDateOrder={state.toggleSortOrder} />
            <DatePicker value={state.date} onDateChange={state.setDate} onClear={state.clearDate} />
          </div>
        </div>
      </div>
    </header>
  );
}
