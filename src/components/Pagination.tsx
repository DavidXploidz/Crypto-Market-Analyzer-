import type { Pagination as PaginationType } from "../types/pagination.types";

interface PaginationProps {
    pagination: PaginationType;
    onPageChange: (page: number) => void;
}

export default function Pagination({ pagination, onPageChange }: PaginationProps) {
    const { current_page, last_page } = pagination;

    const handlePrevious = () => {
        if (current_page > 1) {
            onPageChange(current_page - 1);
        }
    };

    const handleNext = () => {
        if (current_page < last_page) {
            onPageChange(current_page + 1);
        }
    };

    return (
        <div className="flex justify-center items-center gap-4 mt-8">
            <button
                onClick={handlePrevious}
                disabled={current_page === 1}
                className="px-4 py-2 text-sm font-medium text-slate-700 bg-white border border-slate-300 rounded-md hover:bg-slate-50 disabled:opacity-50 disabled:cursor-not-allowed"
            >
                Anterior
            </button>
            <span className="text-sm text-slate-700">
                Página {current_page} de {last_page}
            </span>
            <button
                onClick={handleNext}
                disabled={current_page === last_page}
                className="px-4 py-2 text-sm font-medium text-slate-700 bg-white border border-slate-300 rounded-md hover:bg-slate-50 disabled:opacity-50 disabled:cursor-not-allowed"
            >
                Siguiente
            </button>
        </div>
    );
}
