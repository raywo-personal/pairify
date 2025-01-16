export type SortOrder = "asc" | "desc" | "none";


export function stringCompare(a: string,
                              b: string,
                              sortOrder: SortOrder = "asc"): number {
  return a.localeCompare(b) * direction(sortOrder);
}


function direction(sortOrder: SortOrder): number {
  return sortOrder === "asc" || sortOrder === "none" ? 1 : -1;
}
