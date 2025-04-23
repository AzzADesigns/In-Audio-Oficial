import React from 'react';

interface PaginationControlsProps {
    page: number;
    isLoading: boolean;
    onPrevious: () => void;
    onNext: () => void;
}

export const PaginationControls: React.FC<PaginationControlsProps> = ({
    page,
    isLoading,
    onPrevious,
    onNext
}) => {
    return (
        <div className="flex justify-center   2xl:ml-36 w-full max-w-[1050px] lg:justify-end items-center gap-4 mt-4">
            <button
                className="px-4 py-2 bg-secundary text-primary rounded hover:bg-tertiary hover:text-primary transition cursor-pointer"
                disabled={page === 1 || isLoading}
                onClick={onPrevious}
            >
                Anterior
            </button>
            <span className="text-tertiary text-lg">Página {page}</span>
            <button
                className="px-4 py-2 bg-secundary text-primary rounded hover:bg-tertiary hover:text-primary transition cursor-pointer"
                disabled={isLoading}
                onClick={onNext}
            >
                Siguiente
            </button>
        </div>
    );
};
