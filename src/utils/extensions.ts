declare global {
    interface Array<T> {
        compactMap<O>(transform: (element: T) => O | null | undefined): Array<O>,
        unique(): Array<T>,
    }

    interface ReadonlyArray<T> {
        compactMap<O>(transform: (element: T) => O | null | undefined): Array<O>,
        unique(): Array<T>,
    }
}

Array.prototype.compactMap = function<T, O>(this: T[], transform: (element: T) => O | null | undefined): O[] {
    return this.map(transform).filter((x): x is O => x != null);
};

Array.prototype.unique = function<T>(this: T[]): T[] {
    const set = new Set(this);
    return [...set];
};

export {};
