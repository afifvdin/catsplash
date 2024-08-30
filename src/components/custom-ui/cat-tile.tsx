import React from "react"
import { Button } from "../ui/button"
import { ArrowDown } from "lucide-react"

export default function CatTile({ url }: { url: string }) {
  const handleDownload = () => {
    const link = document.createElement("a")
    link.href = url
    link.download = "cat.jpg"
    link.target = "_blank"
    document.body.appendChild(link)
    link.click()
    document.body.removeChild(link)
  }

  return (
    <div className="mt-6 inline-block w-full h-fit relative">
      <img
        src={url}
        className="w-full h-auto bg-cover object-cover"
        alt="cat"
      />
      <div className="absolute left-0 top-0 w-full h-full flex justify-end items-end p-4 gap-4 opacity-0 hover:opacity-100 bg-gradient-to-b from-black/20 via-transparent to-black/20 transition-all">
        <Button
          onClick={handleDownload}
          size="icon"
          variant="outline"
          className="h-auto w-auto p-1.5 rounded-full"
        >
          <ArrowDown className="size-5" />
        </Button>
      </div>
    </div>
  )
}
