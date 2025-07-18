export interface Job {
  id: string
  company: string
  position: string
  duration: string
  status: "online" | "away" | "idle"
  description: string
  achievements: string[]
  technologies: string[]
  buddyIcon: string
  awayMessage?: string
}

export interface Project {
  id: string
  name: string
  description: string
  tools: string[]
  icon: string
  details: string
  url?: string
}

export interface IMWindow {
  id: string
  title: string
  isOpen: boolean
  job?: Job
  project?: Project
  type: "buddy" | "im" | "profile" | "notification" | "projects" | "stats" | "personal" | "popup"
  hasNewMessage?: boolean
}

export interface NotificationMessage {
  id: string
  sender: string
  message: string
  timestamp: Date
  isRead: boolean
}

export type LoginState = "login" | "connecting" | "signing-in" | "complete"
