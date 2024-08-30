import { keepPreviousData, useQuery } from "@tanstack/react-query"
import { getCats } from "./apis"
import { CatTag } from "@/types/cat"

export function useCats(page: number, tag: CatTag) {
  return useQuery({
    queryKey: ["cats", page, tag],
    queryFn: () => getCats(page, tag),
    placeholderData: keepPreviousData,
    refetchOnWindowFocus: false,
  })
}
