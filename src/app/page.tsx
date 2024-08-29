"use client"

import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { cn } from "@/lib/utils"
import { useCats } from "@/services/queries"
import { CatTag } from "@/types/cat"
import { ArrowDown, CornerDownLeft } from "lucide-react"
import { FormEvent, useEffect, useState } from "react"
import { signOut } from "./actions"

export default function Home() {
  const [say, setSay] = useState("")
  const [deferredSay, setDeferredSay] = useState("")
  const [tag, setTag] = useState<CatTag>("orange")
  const [page, setPage] = useState(0)
  const {
    data: cats,
    isPending,
    isFetching,
    isError,
    refetch,
  } = useCats(page, tag)

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault()
    setDeferredSay(say)
  }

  useEffect(() => {
    refetch()
  }, [tag])

  const handleDownload = (url: string) => {
    const link = document.createElement("a")
    link.href = url
    link.download = "cat.jpg"
    link.target = "_blank"
    document.body.appendChild(link)
    link.click()
    document.body.removeChild(link)
  }

  return (
    <div className="max-w-4xl mx-auto py-24 px-4">
      <h1 className="text-7xl text-center font-semibold tracking-tighter">
        Catsplash
      </h1>
      <br />
      <div className="flex items-center gap-4">
        <Select value={tag} onValueChange={(v: CatTag) => setTag(v)}>
          <SelectTrigger className="w-48 shadow-xl text-neutral-800 !outline-none !ring-0 !ring-offset-0 !py-8 !px-4 text-base sm:text-lg rounded-2xl bg-white border">
            <SelectValue placeholder="Cat color" />
          </SelectTrigger>
          <SelectContent>
            <SelectGroup>
              <SelectItem value="black">Black</SelectItem>
              <SelectItem value="brown">Brown</SelectItem>
              <SelectItem value="orange">Orange</SelectItem>
              <SelectItem value="white">White</SelectItem>
            </SelectGroup>
          </SelectContent>
        </Select>
        <form onSubmit={handleSubmit} className="w-full relative">
          <Input
            value={say}
            onChange={(e) => setSay(e.target.value)}
            placeholder="Cat said... (pspsps)"
            className="shadow-xl text-neutral-800 w-full !outline-none !ring-0 !ring-offset-0 !py-8 !px-4 text-base sm:text-lg rounded-2xl bg-white border"
          />
          <Button
            type="submit"
            size="icon"
            className="absolute right-4 top-3.5 p-2 w-auto h-auto rounded-xl hover:translate-y-0.5 transition-all"
          >
            <CornerDownLeft className="size-5" />
          </Button>
        </form>
      </div>
      <br />
      {deferredSay !== "" && say !== "" && (
        <img
          src={`https://cataas.com/cat/${tag}/says/${deferredSay}?fontSize=96&fontColor=yellow`}
          className="w-full h-auto bg-cover object-cover"
        />
      )}
      {isPending || isFetching ? (
        <div
          className={cn(
            say !== "" && "hidden",
            "sm:columns-2 lg:columns-3 gap-6"
          )}
        >
          <div className="mt-6 inline-block w-full h-48 bg-zinc-200 animate-pulse" />
          <div className="mt-6 inline-block w-full h-96 bg-zinc-200 animate-pulse" />
          <div className="mt-6 inline-block w-full h-52 bg-zinc-200 animate-pulse" />
          <div className="mt-6 inline-block w-full h-48 bg-zinc-200 animate-pulse" />
          <div className="mt-6 inline-block w-full h-48 bg-zinc-200 animate-pulse" />
          <div className="mt-6 inline-block w-full h-96 bg-zinc-200 animate-pulse" />
          <div className="mt-6 inline-block w-full h-52 bg-zinc-200 animate-pulse" />
        </div>
      ) : isError ? (
        <div className={cn(say !== "" && "hidden")}>There was an error</div>
      ) : (
        <div
          className={cn(
            say !== "" && "hidden",
            "sm:columns-2 lg:columns-3 gap-6"
          )}
        >
          {cats.map((cat, _) => {
            return (
              <div
                key={cat._id}
                className="mt-6 inline-block w-full h-fit relative"
              >
                <img
                  src={"https://cataas.com/cat/" + cat._id}
                  className="w-full h-auto bg-cover object-cover"
                />
                <div className="absolute left-0 top-0 w-full h-full flex justify-end items-end p-4 gap-4 opacity-0 hover:opacity-100 bg-gradient-to-b from-black/20 via-transparent to-black/20 transition-all">
                  <Button
                    onClick={() =>
                      handleDownload("https://cataas.com/cat/" + cat._id)
                    }
                    size="icon"
                    variant="outline"
                    className="h-auto w-auto p-1.5 rounded-full"
                  >
                    <ArrowDown className="size-5" />
                  </Button>
                </div>
              </div>
            )
          })}
        </div>
      )}
      <br />
      <div className={"flex items-center justify-center gap-4"}>
        {page > 0 && (
          <Button
            className={cn(say !== "" && "hidden")}
            variant="outline"
            onClick={() => setPage((prev) => prev - 1)}
          >
            Previous
          </Button>
        )}
        {cats?.length === 15 && (
          <Button
            className={cn(say !== "" && "hidden")}
            variant="outline"
            onClick={() => setPage((prev) => prev + 1)}
          >
            Next
          </Button>
        )}
        <form action={signOut}>
          <Button type="submit">Logout</Button>
        </form>
      </div>
    </div>
  )
}
