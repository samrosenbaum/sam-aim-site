"use client"
import { IMWindow } from "@/app/types"

export const statusOptions = [
  { value: "online", label: "Online", color: "bg-green-500", message: "Available for select projects" },
  { value: "away", label: "Away", color: "bg-yellow-500", message: "Building something cool... BRB!" },
  { value: "busy", label: "Busy", color: "bg-red-500", message: "In the zone - coding mode activated 🚀" },
  { value: "invisible", label: "Invisible", color: "bg-gray-500", message: "Ninja mode: here but not here 🥷" },
]

export const getStatusColor = (status: string) => {
  switch (status) {
    case "online":
      return "bg-green-500"
    case "away":
      return "bg-yellow-500"
    case "idle":
      return "bg-red-500"
    default:
      return "bg-gray-500"
  }
}

export const getCurrentStatusInfo = (userStatus: string) => {
  return statusOptions.find((s) => s.value === userStatus) || statusOptions[0]
}

export const getWindowPosition = (
  windows: IMWindow[],
  windowId: string,
  windowType: string,
) => {
  const basePositions: Record<string, { top: number; left: number }> = {
    profile: { top: 50, left: 40 },
    projects: { top: 50, left: 40 },
    stats: { top: 200, left: 40 },
    personal: { top: 200, left: 40 },
    contact: { top: 100, left: 40 },
  }

  if (windowType === "im") {
    const openImWindows = windows.filter((w) => w.type === "im" && w.isOpen).length
    const positions = [
      { top: 80, left: 400 },
      { top: 120, left: 600 },
      { top: 160, left: 800 },
      { top: 200, left: 450 },
      { top: 240, left: 650 },
      { top: 280, left: 850 },
    ]
    return positions[openImWindows % positions.length] || { top: 100, left: 500 }
  }

  if (windowId in basePositions) {
    return basePositions[windowId]
  }
  return { top: 100, left: 400 }
}
