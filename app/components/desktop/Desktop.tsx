"use client"
import { useEffect } from "react"
import { Card } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Resizable } from "re-resizable"
import {
  X,
  Minus,
  User,
  Mail,
  MapPin,
  Volume2,
  Code,
  Trophy,
  Monitor,
  Network,
  Trash2,
  FolderOpen,
  Linkedin,
  Github,
} from "lucide-react"
import {
  getStatusColor,
  getCurrentStatusInfo,
  getWindowPosition,
  statusOptions,
} from "./helpers"
import {
  Job,
  Project,
  IMWindow,
  NotificationMessage,
} from "@/app/types"

interface DesktopProps {
  windows: IMWindow[]
  userStatus: "online" | "away" | "busy" | "invisible"
  showStatusMenu: boolean
  setShowStatusMenu: (v: boolean) => void
  showContactWindow: boolean
  contactForm: { name: string; email: string; subject: string; message: string }
  setContactForm: React.Dispatch<React.SetStateAction<{ name: string; email: string; subject: string; message: string }>>
  notifications: NotificationMessage[]
  showNotification: boolean
  currentTime: Date
  pulsingElements: string[]
  jobs: Job[]
  projects: Project[]
  openWindow: (job: Job) => void
  openProjectWindow: (project: Project) => void
  closeWindow: (id: string) => void
  toggleWindow: (id: string) => void
  openContactWindow: () => void
  closeContactWindow: () => void
  handleContactSubmit: () => void
  handleStatusChange: (status: "online" | "away" | "busy" | "invisible") => void
  dismissNotification: () => void
  handleAIMResponse: (response: "yes" | "no") => void
  setWindows: React.Dispatch<React.SetStateAction<IMWindow[]>>
}

export default function Desktop({
  windows,
  userStatus,
  showStatusMenu,
  setShowStatusMenu,
  showContactWindow,
  contactForm,
  setContactForm,
  notifications,
  showNotification,
  currentTime,
  pulsingElements,
  jobs,
  projects,
  openWindow,
  openProjectWindow,
  closeWindow,
  toggleWindow,
  openContactWindow,
  closeContactWindow,
  handleContactSubmit,
  handleStatusChange,
  dismissNotification,
  handleAIMResponse,
  setWindows,
}: DesktopProps) {
  // Bitcoin price ticker
  useEffect(() => {
    const fetchBitcoinPrice = async () => {
      try {
        const response = await fetch('https://api.coingecko.com/api/v3/simple/price?ids=bitcoin&vs_currencies=usd')
        const data = await response.json()
        const price = data.bitcoin.usd
        const priceElement = document.getElementById('btc-price')
        if (priceElement) {
          priceElement.textContent = `$${price.toLocaleString()}`
        }
      } catch (error) {
        const priceElement = document.getElementById('btc-price')
        if (priceElement) {
          priceElement.textContent = 'BTC: $--'
        }
      }
    }

    fetchBitcoinPrice()
    const interval = setInterval(fetchBitcoinPrice, 30000) // Update every 30 seconds
    return () => clearInterval(interval)
  }, [])

  return (
    <div className="min-h-screen bg-teal-500 p-0 font-sans relative overflow-hidden">
      {/* CSS Animations */}
      <style>{`
        @keyframes slide-in {
          from {
            opacity: 0;
            transform: translateY(20px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
        
        @keyframes slide-in-left {
          from {
            opacity: 0;
            transform: translateX(-20px);
          }
          to {
            opacity: 1;
            transform: translateX(0);
          }
        }
        
        @keyframes slide-in-right {
          from {
            opacity: 0;
            transform: translateX(20px);
          }
          to {
            opacity: 1;
            transform: translateX(0);
          }
        }
        
        @keyframes slide-in-up {
          from {
            opacity: 0;
            transform: translateY(20px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
        
        @keyframes fade-in {
          from {
            opacity: 0;
            transform: translateY(10px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
        
        .animate-slide-in {
          animation: slide-in 0.8s ease-out;
        }
        
        .animate-slide-in-left {
          animation: slide-in-left 0.6s ease-out;
        }
        
        .animate-slide-in-right {
          animation: slide-in-right 0.5s ease-out;
        }
        
        .animate-slide-in-up {
          animation: slide-in-up 0.3s ease-out;
        }
        
        .animate-fade-in {
          animation: fade-in 0.5s ease-out forwards;
          opacity: 0;
        }

        .pixelated {
          image-rendering: -moz-crisp-edges;
          image-rendering: -webkit-crisp-edges;
          image-rendering: pixelated;
          image-rendering: crisp-edges;
        }
      `}</style>


{/* Windows 95 Desktop Icons */}
<div className="absolute top-4 left-4 space-y-6 z-10">
        <a
          href="/reading-list.txt"
          target="_blank"
          rel="noopener noreferrer"
          className="flex flex-col items-center cursor-pointer hover:bg-blue-400/20 p-2 rounded transition-colors group"
        >
          <div className="w-8 h-8 bg-gray-300 border border-gray-400 rounded flex items-center justify-center mb-1 shadow-sm">
            <span className="text-lg">📚</span>
          </div>
          <span className="text-white text-xs font-bold text-center leading-tight group-hover:bg-blue-600 px-1 rounded">
            My Library
          </span>
        </a>



        <a
          href="https://jspaint.app/"
          target="_blank"
          rel="noopener noreferrer"
          className="flex flex-col items-center cursor-pointer hover:bg-blue-400/20 p-2 rounded transition-colors group"
        >
          <div className="w-8 h-8 bg-gray-300 border border-gray-400 rounded flex items-center justify-center mb-1 shadow-sm">
            <img src="/images/ms-paint.png" alt="Microsoft Paint" className="h-6 w-6 object-contain" />
          </div>
          <span className="text-white text-xs font-bold text-center leading-tight group-hover:bg-blue-600 px-1 rounded">
            Paint
          </span>
        </a>

        <a
          href="https://minesweeper.online/"
          target="_blank"
          rel="noopener noreferrer"
          className="flex flex-col items-center cursor-pointer hover:bg-blue-400/20 p-2 rounded transition-colors group no-underline"
          style={{ textDecoration: 'none' }}
        >
          <div className="w-8 h-8 bg-yellow-300 border border-gray-400 rounded flex items-center justify-center mb-1 shadow-sm">
            <img src="/images/minesweeper.png" alt="Minesweeper" className="h-6 w-6 object-contain" />
          </div>
          <span className="text-white text-xs font-bold text-center leading-tight group-hover:bg-blue-600 px-1 rounded">
            Minesweeper
          </span>
        </a>

        <a
          href="https://x.com/sammskiii"
          target="_blank"
          rel="noopener noreferrer"
          className="flex flex-col items-center cursor-pointer hover:bg-blue-400/20 p-2 rounded transition-colors group"
        >
          <div className="w-8 h-8 bg-gray-300 border border-gray-400 rounded flex items-center justify-center mb-1 shadow-sm">
            <img src="/images/xanga.png" alt="Xanga" className="h-6 w-6 object-contain" />
          </div>
          <span className="text-white text-xs font-bold text-center leading-tight group-hover:bg-blue-600 px-1 rounded">
            Xanga
          </span>
        </a>

        <a
          href="/ai-tools-list.txt"
          target="_blank"
          rel="noopener noreferrer"
          className="flex flex-col items-center cursor-pointer hover:bg-blue-400/20 p-2 rounded transition-colors group"
        >
          <div className="w-8 h-8 bg-purple-300 border border-gray-400 rounded flex items-center justify-center mb-1 shadow-sm">
            <span className="text-lg">⏰</span>
          </div>
          <span className="text-white text-xs font-bold text-center leading-tight group-hover:bg-blue-600 px-1 rounded">
            Time Travel
          </span>
        </a>

        <a
          href="https://open.spotify.com/playlist/1udqwx26htiKljZx4HwVxs"
          target="_blank"
          rel="noopener noreferrer"
          className="flex flex-col items-center cursor-pointer hover:bg-blue-400/20 p-2 rounded transition-colors group"
        >
          <div className="w-8 h-8 bg-gray-300 border border-gray-400 rounded flex items-center justify-center mb-1 shadow-sm">
            <img src="/images/limewire.jpg" alt="LimeWire" className="h-6 w-6 object-contain" />
          </div>
          <span className="text-white text-xs font-bold text-center leading-tight group-hover:bg-blue-600 px-1 rounded">
            LimeWire
          </span>
        </a>

        <div className="flex flex-col items-center cursor-pointer hover:bg-blue-400/20 p-2 rounded transition-colors group"
          onClick={() => {
            setWindows(windows => windows.map(w =>
              w.id === "profile" ? { ...w, isOpen: true } : w
            ));
          }}
        >
          <div className="w-8 h-8 bg-blue-300 border border-gray-400 rounded flex items-center justify-center mb-1 shadow-sm">
            <User className="h-5 w-5 text-gray-700" />
          </div>
          <span className="text-white text-xs font-bold text-center leading-tight group-hover:bg-blue-600 px-1 rounded">
            Sam's Portfolio
          </span>
        </div>
      </div>

      {/* Bottom Right Desktop Icon */}
      <div className="absolute bottom-20 right-4 z-10">
        <a
          href="https://bitcoin.org/bitcoin.pdf"
          target="_blank"
          rel="noopener noreferrer"
          className="flex flex-col items-center cursor-pointer hover:bg-blue-400/20 p-2 rounded transition-colors group"
        >
          <div className="w-8 h-8 bg-orange-300 border border-gray-400 rounded flex items-center justify-center mb-1 shadow-sm">
            <span className="text-lg">🍕</span>
          </div>
          <span className="text-white text-xs font-bold text-center leading-tight group-hover:bg-blue-600 px-1 rounded">
            Fake Internet Pizza Money
          </span>
          <div className="text-[10px] text-yellow-300 font-mono mt-1" id="btc-price">
            Loading...
          </div>
        </a>
      </div>

      {/* Windows 95 Taskbar */}
      <div className="fixed bottom-0 left-0 right-0 h-8 bg-gray-300 border-t-2 border-gray-400 flex items-center px-1 z-50">
        {/* Start Button */}
        <Button
          size="sm"
          className="h-6 bg-gray-300 hover:bg-gray-200 text-black border border-gray-400 text-xs font-bold px-2 mr-2 shadow-sm"
        >
          <span className="mr-1">🪟</span>
          Start
        </Button>

        {/* Taskbar Separator */}
        <div className="w-px h-6 bg-gray-400 mr-2"></div>

        {/* Running Applications */}
        <div className="flex-1 flex gap-1">
          {windows
            .filter((w) => w.isOpen)
            .map((window) => (
              window.id === "buddy-list" ? (
                <Button
                  key={window.id}
                  size="sm"
                  className="h-6 bg-gray-200 text-black border border-gray-400 text-xs px-2 max-w-32 truncate cursor-default"
                  disabled
                >
                  {window.title}
                </Button>
              ) : (
                <Button
                  key={window.id}
                  size="sm"
                  className="h-6 bg-gray-200 hover:bg-gray-100 text-black border border-gray-400 text-xs px-2 max-w-32 truncate"
                  onClick={() => toggleWindow(window.id)}
                >
                  {window.title}
                </Button>
              )
            ))}
        </div>

        {/* System Tray */}
        <div className="flex items-center gap-2 ml-2">
          <div className="w-px h-6 bg-gray-400"></div>
          <div className="flex items-center gap-1 px-2">
            <Volume2 className="h-3 w-3 text-gray-700" />
            <span className="text-xs text-gray-700 font-sans">
              {currentTime.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" })}
            </span>
          </div>
        </div>
      </div>

      <div className="relative pb-8 flex justify-center items-start min-h-[80vh]">
        {/* Buddy List Window */}
        {windows.find((w) => w.id === "buddy-list")?.isOpen && (
          <Card className="w-72 bg-gray-100 border-2 border-gray-400 shadow-lg animate-slide-in-left">
            {/* Title Bar */}
            <div className="bg-gradient-to-r from-blue-600 to-blue-800 text-white px-2 py-1 flex items-center justify-between text-sm">
              <span className="font-bold">📱 SamRosenbaum91's Buddy List</span>
              {/* No close/minimize button for Buddy List */}
            </div>

            {/* Menu Bar */}
            <div className="bg-gray-200 px-2 py-1 text-xs border-b border-gray-300">
              <span className="mr-4">My AIM</span>
              <span className="mr-4">People</span>
              <span>Help</span>
            </div>

            {/* AOL Logo Area */}
            <div className="bg-blue-600 p-2 flex items-center justify-center">
              <div className="bg-yellow-400 text-blue-800 px-3 py-1 rounded font-bold text-sm">
              📩 AOL Instant Messenger
              </div>
            </div>

            {/* Status Buttons */}
            <div className="p-2 bg-gray-100 border-b border-gray-300">
              <div className="flex gap-2">
                <div className="relative">
                  <Button
                    size="sm"
                    className={`${getCurrentStatusInfo(userStatus).color} hover:opacity-80 text-white text-xs flex items-center gap-1`}
                    onClick={() => setShowStatusMenu(!showStatusMenu)}
                  >
                    <span className={`w-2 h-2 rounded-full ${getCurrentStatusInfo(userStatus).color} border border-white`} />
                    {getCurrentStatusInfo(userStatus).label}
                    <span className="text-xs">▼</span>
                  </Button>

                  {/* Status Dropdown */}
                  {showStatusMenu && (
                    <div className="absolute top-full left-0 mt-1 bg-white border border-gray-300 rounded shadow-lg z-10 min-w-32">
                      {statusOptions.map((status) => (
                        <button
                          key={status.value}
                          onClick={() => handleStatusChange(status.value as "online" | "away" | "busy" | "invisible")}
                          className="w-full text-left px-3 py-2 text-xs hover:bg-blue-50 flex items-center gap-2"
                        >
                          <span className={`w-2 h-2 rounded-full ${status.color}`} />
                          {status.label}
                        </button>
                      ))}
                    </div>
                  )}
                </div>

                <Button
                  size="sm"
                  className="bg-blue-500 hover:bg-blue-600 text-white text-xs"
                  onClick={openContactWindow}
                >
                  📧 Contact Me
                </Button>
              </div>

              {/* Status Message */}
              <div className="text-xs text-gray-600 mt-1 italic">"{getCurrentStatusInfo(userStatus).message}"</div>
            </div>

            <div className="p-3 max-h-96 overflow-y-auto flex flex-col h-full">
              {/* Profile Section */}
              <div className="mb-3">
                <Button
                  onClick={() => toggleWindow("profile")}
                  className={`w-full justify-start text-left bg-blue-50 hover:bg-blue-100 text-blue-800 border border-blue-200 transition-all duration-300 ${
                    pulsingElements.includes("profile-button") ? "animate-pulse ring-2 ring-blue-400 bg-blue-100" : ""
                  }`}
                >
                  <User className="h-4 w-4 mr-2" />
                  View My Profile
                  {pulsingElements.includes("profile-button") && (
                    <span className="ml-auto text-xs animate-bounce">👈 Start Here!</span>
                  )}
                </Button>
              </div>

              {/* Contact Information Section */}
              <div className="mb-3">
                <div className="text-xs font-bold text-gray-600 mb-2 border-b border-gray-300 pb-1">
                  Contact Info
                </div>
                <div className="space-y-1">
                  <div className="flex items-center gap-2 text-xs text-gray-700">
                    <Mail className="h-3 w-3" />
                    <a href="mailto:samanthakrosenbaum@gmail.com" className="hover:text-blue-600">
                      samanthakrosenbaum@gmail.com
                    </a>
                  </div>
                  <div className="flex items-center gap-2 text-xs text-gray-700">
                    <Github className="h-3 w-3" />
                    <a href="https://github.com/samrosenbaum" target="_blank" rel="noopener noreferrer" className="hover:text-blue-600">
                      github.com/samrosenbaum
                    </a>
                  </div>
                  <div className="flex items-center gap-2 text-xs text-gray-700">
                    <Linkedin className="h-3 w-3" />
                    <a href="https://linkedin.com/in/samrosenbaum" target="_blank" rel="noopener noreferrer" className="hover:text-blue-600">
                      linkedin.com/in/samrosenbaum
                    </a>
                  </div>
                </div>
              </div>

              {/* Work Experience Section */}
              <div className="text-xs font-bold text-gray-600 mb-2 border-b border-gray-300 pb-1">
                ▼ Recent Work Experience (1/3)
              </div>
              <div className="space-y-1 mb-3">
                {jobs
                  .filter((job) => job.company === "AngelList" || job.status === "online")
                  .map((job) => (
                    <Button
                      key={job.id}
                      onClick={() => openWindow(job)}
                      className={`w-full justify-start text-left p-2 h-auto bg-white hover:bg-blue-50 text-gray-800 border-0 shadow-sm transition-all duration-300 ${
                        pulsingElements.includes(job.id) ? "animate-pulse ring-2 ring-green-400 bg-green-50" : ""
                      }`}
                    >
                      <div className="flex items-center gap-2 w-full">
                        <span className="text-lg">{job.buddyIcon}</span>
                        <span className={`w-2 h-2 rounded-full ${getStatusColor(job.status)}`} />
                        <div className="flex-1 min-w-0">
                          <div className="font-semibold text-xs truncate">{job.company}</div>
                          <div className="text-xs text-gray-600 truncate">{job.position}</div>
                          <div className="text-xs text-gray-400 truncate">{job.duration}</div>
                        </div>
                        {pulsingElements.includes(job.id) && <span className="text-xs animate-bounce">💬</span>}
                      </div>
                    </Button>
                  ))}
              </div>

              {/* Previous Roles Section (UXPin, Atrium & Fit3D) */}
              <div className="text-xs font-bold text-gray-600 mb-2 border-b border-gray-300 pb-1">
                ▼ Previous Roles (3/3)
              </div>
              <div className="space-y-1 mb-3">
                {jobs
                  .filter((job) => job.company === "UXPin" || job.company === "Atrium" || job.company === "Fit3D")
                  .map((job) => (
                    <Button
                      key={job.id}
                      onClick={() => openWindow(job)}
                      className={`w-full justify-start text-left p-2 h-auto bg-gray-50 hover:bg-gray-100 text-gray-600 border-0 shadow-sm transition-all duration-300 ${
                        pulsingElements.includes(job.id) ? "animate-pulse ring-2 ring-gray-400" : ""
                      }`}
                    >
                      <div className="flex items-center gap-2 w-full">
                        <span className="text-lg">{job.buddyIcon}</span>
                        <span className={`w-2 h-2 rounded-full ${getStatusColor(job.status)}`} />
                        <div className="flex-1 min-w-0">
                          <div className="font-semibold text-xs truncate">{job.company}</div>
                          <div className="text-xs text-gray-600 truncate">{job.position}</div>
                          <div className="text-xs text-gray-400 truncate">{job.duration}</div>
                        </div>
                        {pulsingElements.includes(job.id) && <span className="text-xs animate-bounce">💬</span>}
                      </div>
                    </Button>
                  ))}
              </div>

              {/* Quick Access Buttons */}
              <div className="mb-3 space-y-1">
                <Button
                  onClick={() => toggleWindow("stats")}
                  className={`w-full justify-start text-left bg-green-50 hover:bg-green-100 text-green-800 border border-green-200 transition-all duration-300 ${
                    pulsingElements.includes("stats-button") ? "animate-pulse ring-2 ring-green-400" : ""
                  }`}
                >
                  <Trophy className="h-4 w-4 mr-2" />
                  Career Stats
                </Button>
                <Button
                  onClick={() => toggleWindow("personal")}
                  className={`w-full justify-start text-left bg-orange-50 hover:bg-orange-100 text-orange-800 border border-orange-200 transition-all duration-300 ${
                    pulsingElements.includes("personal-button") ? "animate-pulse ring-2 ring-orange-400" : ""
                  }`}
                >
                  <span className="mr-2">🎉</span>
                  Fun Stuff
                </Button>
              </div>

              {/* Skills & Tools Section */}
              <div className="text-xs font-bold text-gray-600 mb-2 border-b border-gray-300 pb-1">
                ▼ Skills & Tools
              </div>
              <div className="text-xs font-bold text-gray-600 mb-2">
                I build + sell
              </div>
              <ul className="list-disc pl-5 text-xs text-gray-700 space-y-1 mb-3">
                <li>Salesforce</li>
                <li>Linkedin Sales Nav / Outreach.io</li>
                <li>v0 / Vercel / Cursor</li>
                <li>Github / Codex / Claude Code </li>
                {/* Add more tools as needed */}
              </ul>

              {/* Projects Section */}
              <div className="text-xs font-bold text-gray-600 mb-2 border-b border-gray-300 pb-1">
                ▼ Stuff I Built Recently ({projects.length})
              </div>
              <div className="space-y-1 mb-3">
                {projects.map((project) => (
                  <div key={project.id} className="flex gap-1">
                    <Button
                      onClick={() => openProjectWindow(project)}
                      className={`flex-1 justify-start text-left p-2 h-auto bg-purple-50 hover:bg-purple-100 text-gray-800 border-0 shadow-sm transition-all duration-300 ${
                        pulsingElements.includes(project.id) ? "animate-pulse ring-2 ring-purple-400" : ""
                      }`}
                    >
                                          <div className="flex items-center gap-2 w-full">
                      <span className="text-lg">{project.icon}</span>
                      <div className="flex-1 min-w-0">
                        <div className="font-semibold text-xs truncate flex items-center gap-1">
                          {project.name}
                          {project.id === "coldcase" && (
                            <span className="text-[10px] bg-red-500 text-white px-1 rounded animate-pulse">
                              ⭐ Favorite
                            </span>
                          )}
                          {project.id === "yrboyfriend" && (
                            <span className="text-[10px] bg-green-500 text-white px-1 rounded">
                              🌐 LIVE
                            </span>
                          )}
                          {project.id === "kai" && (
                            <span className="text-[10px] bg-green-500 text-white px-1 rounded">
                              🌐 LIVE
                            </span>
                          )}
                        </div>
                        <div className="text-xs text-purple-600 truncate">{project.description}</div>
                      </div>
                    </div>
                    </Button>
                    {project.url && (
                      <a
                        href={project.url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="px-2 py-2 bg-green-600 hover:bg-green-700 text-white text-xs rounded flex items-center justify-center transition-colors"
                        title="View Live Site"
                      >
                        🌐
                      </a>
                    )}
                  </div>
                ))}
              </div>

              {/* Minimal Education Section at the very end of the scrollable area */}
              <div className="pt-3 border-t border-gray-200 text-[11px] text-gray-400 text-left">
                Education <br />
                Masters – Univ. of Florida (Entrepreneurship) <br /> 
                BA – Univ of Tampa (Advertising, PR & Design)
              </div>
            </div>
          </Card>
        )}

        {/* Contact Window */}
        {showContactWindow && (
          <Card 
            className="absolute bg-gray-100 border-2 border-gray-400 shadow-lg animate-slide-in-up w-96 z-20"
            style={getWindowPosition(windows, "contact", "contact")}
          >
            <div className="bg-gradient-to-r from-blue-600 to-blue-800 text-white px-2 py-1 flex items-center justify-between text-sm">
              <span className="font-bold">📧 Contact Sam</span>
              <Button
                size="sm"
                variant="ghost"
                className="h-4 w-4 p-0 text-white hover:bg-blue-700"
                onClick={closeContactWindow}
              >
                <X className="h-3 w-3" />
              </Button>
            </div>

            <div className="p-4">
              <div className="space-y-3">
                <div>
                  <label className="text-xs font-bold text-gray-700 mb-1 block">Name *</label>
                  <input
                    type="text"
                    value={contactForm.name}
                    onChange={(e) => setContactForm(prev => ({ ...prev, name: e.target.value }))}
                    className="w-full px-2 py-1 border border-gray-300 rounded text-sm"
                    placeholder="Your name"
                  />
                </div>
                
                <div>
                  <label className="text-xs font-bold text-gray-700 mb-1 block">Email *</label>
                  <input
                    type="email"
                    value={contactForm.email}
                    onChange={(e) => setContactForm(prev => ({ ...prev, email: e.target.value }))}
                    className="w-full px-2 py-1 border border-gray-300 rounded text-sm"
                    placeholder="your@email.com"
                  />
                </div>
                
                <div>
                  <label className="text-xs font-bold text-gray-700 mb-1 block">Subject</label>
                  <input
                    type="text"
                    value={contactForm.subject}
                    onChange={(e) => setContactForm(prev => ({ ...prev, subject: e.target.value }))}
                    className="w-full px-2 py-1 border border-gray-300 rounded text-sm"
                    placeholder="What's this about?"
                  />
                </div>
                
                <div>
                  <label className="text-xs font-bold text-gray-700 mb-1 block">Message *</label>
                  <textarea
                    value={contactForm.message}
                    onChange={(e) => setContactForm(prev => ({ ...prev, message: e.target.value }))}
                    className="w-full px-2 py-1 border border-gray-300 rounded text-sm h-20 resize-none"
                    placeholder="Tell me what you're thinking..."
                  />
                </div>
                
                <div className="flex justify-between items-center pt-2">
                  <div className="text-xs text-gray-500">* Required fields</div>
                  <div className="flex gap-2">
                    <Button
                      size="sm"
                      variant="outline"
                      className="text-xs px-3 py-1"
                      onClick={closeContactWindow}
                    >
                      Cancel
                    </Button>
                    <Button
                      size="sm"
                      className="bg-blue-600 hover:bg-blue-700 text-white px-3 py-1 text-xs"
                      onClick={handleContactSubmit}
                    >
                      Send Email
                    </Button>
                  </div>
                </div>
              </div>
            </div>
          </Card>
        )}

        {/* Notification Window */}
        {notifications.length > 0 && showNotification && (
          <Card className="absolute top-4 right-[10rem] w-80 bg-gray-100 border-2 border-gray-400 shadow-lg animate-slide-in-right">
            <div className="bg-gradient-to-r from-orange-600 to-orange-800 text-white px-2 py-1 flex items-center justify-between text-sm">
              <span className="font-bold">📨 New Message</span>
              <Button
                size="sm"
                variant="ghost"
                className="h-4 w-4 p-0 text-white hover:bg-orange-700"
                onClick={dismissNotification}
              >
                <X className="h-3 w-3" />
              </Button>
            </div>

            <div className="p-4">
              {notifications.map((notification) => (
                <div key={notification.id} className="bg-blue-50 p-3 rounded border-l-4 border-blue-500">
                  <div className="font-bold text-blue-800 text-sm mb-1">{notification.sender}:</div>
                  <div className="text-sm text-blue-700" dangerouslySetInnerHTML={{ __html: notification.message }} />
                  <div className="text-xs text-gray-500 mt-2">{notification.timestamp.toLocaleTimeString()}</div>
                </div>
              ))}
            </div>
          </Card>
        )}

        {/* Profile Window */}
        {windows.find((w) => w.id === "profile")?.isOpen && (
          <Resizable
            defaultSize={{ width: 384, height: 500 }}
            minWidth={320}
            maxWidth={600}
            minHeight={300}
            enable={{
              top: true,
              right: true,
              bottom: true,
              left: true,
              topRight: true,
              bottomRight: true,
              bottomLeft: true,
              topLeft: true,
            }}
            style={{ position: 'absolute', zIndex: 20, ...getWindowPosition(windows, "profile", "profile") }}
          >
            <Card
              className="bg-gray-100 border-2 border-gray-400 shadow-lg animate-slide-in-up w-full z-20"
            >
              <div className="bg-gradient-to-r from-purple-600 to-purple-800 text-white px-2 py-1 flex items-center justify-between text-sm">
                <span className="font-bold">👤 Profile: Sam Rosenbaum</span>
                <Button
                  size="sm"
                  variant="ghost"
                  className="h-4 w-4 p-0 text-white hover:bg-purple-700"
                  onClick={() => closeWindow("profile")}
                >
                  <X className="h-3 w-3" />
                </Button>
              </div>

              <div className="p-4 max-h-96 overflow-y-auto">
                <div className="text-center mb-4">
                  <div className="w-16 h-16 mx-auto mb-2 rounded border-2 border-gray-400 overflow-hidden bg-white flex items-center justify-center">
                    <img
                      src="sam-buddy-icon.png"
                      alt="Sam's Buddy Icon"
                      className="w-full h-full object-contain pixelated"
                    />
                  </div>
                  <h2 className="font-bold text-lg">Sam Rosenbaum</h2>
                  <p className="text-sm text-gray-600">I help startups grow</p>
                </div>

                <div className="space-y-3 text-sm">
                  <div>
                    <strong>Status</strong> Available for select projects
                  </div>
                  <div>
                    <strong>Location</strong> Based in San Francisco / often found in NYC
                  </div>
                  <div>
                    <strong>About</strong>
                    <div className="text-sm text-gray-700 mb-2">
                      Spent 10+ years in sales on early-stage growth teams, building scalable revenue playbooks and working to master the art of negotiation and closing. I've generated millions of dollars in revenue for technology companies.
                    </div>
                    <ul className="list-disc pl-5 text-sm text-gray-700 space-y-1">
                      <li>Right now I'm focused on technical skills and leveraging AI tools.</li>
                      <li>I have a deep network in the Venture Capital & startup ecosystems.</li>
                      <li>700+ deals closed in my last role.</li>
                      <li>Currently enjoying learning through building my own products.</li>
                    </ul>
                  </div>
                </div>
              </div>
            </Card>
          </Resizable>
        )}

        {/* Career Stats Window */}
        {windows.find((w) => w.id === "stats")?.isOpen && (
          <Card
            className="absolute bg-gray-100 border-2 border-gray-400 shadow-lg animate-slide-in-up w-96 z-20"
            style={getWindowPosition(windows, "stats", "stats")}
          >
            <div className="bg-gradient-to-r from-green-600 to-green-800 text-white px-2 py-1 flex items-center justify-between text-sm">
              <span className="font-bold">📊 Career Stats</span>
              <Button
                size="sm"
                variant="ghost"
                className="h-4 w-4 p-0 text-white hover:bg-green-700"
                onClick={() => closeWindow("stats")}
              >
                <X className="h-3 w-3" />
              </Button>
            </div>
            <div className="p-4 max-h-96 overflow-y-auto">
              <div className="space-y-4 text-sm">
                <div className="bg-green-50 p-3 rounded border-l-4 border-green-500">
                  <div className="font-bold text-green-800 mb-2">🎯 Sales Performance</div>
                  <ul className="space-y-1 text-green-700">
                    <li>• 700+ deals closed, millions in ARR generated</li>
                    <li>• Exceeded quota 18/20 quarters, up to 188%</li>
                    <li>• Solo sales team winning 45+ deals per quarter</li>
                    <li>• Deal values: 5-7 figures</li>
                    <li>• Average $75k ARR for 10 years = $750k TLV</li>
                  </ul>
                </div>
                <div className="bg-blue-50 p-3 rounded border-l-4 border-blue-500">
                  <div className="font-bold text-blue-800 mb-2">📈 Career Progression</div>
                  <ul className="space-y-1 text-blue-700">
                    <li>• 10 years in tech sales</li>
                    <li>• SDR → AE → SDR Manager → Sales Manager → AE</li>
                    <li>• Usually early/founding sales team member</li>
                    <li>• Built sales processes and playbooks</li>
                  </ul>
                </div>
                <div className="bg-purple-50 p-3 rounded border-l-4 border-purple-500">
                  <div className="font-bold text-purple-800 mb-2">🚀 Recent Achievements</div>
                  <ul className="space-y-1 text-purple-700">
                    <li>• Built AngelList fund platform sales process</li>
                    <li>• Scaled ARR to $xxm per year</li>
                    <li>• Deep network in VC & startup ecosystem</li>
                    <li>• Learning AI/technical skills for GTM</li>
                  </ul>
                </div>
                <div className="bg-orange-50 p-3 rounded border-l-4 border-orange-500">
                  <div className="font-bold text-orange-800 mb-2">🎓 Training & Skills</div>
                  <ul className="space-y-1 text-orange-700">
                    <li>• 100+ hours deal closing & negotiation training</li>
                    <li>• SEC regulations & fund laws</li>
                    <li>• Team management & leadership</li>
                    <li>• International business experience</li>
                  </ul>
                </div>
              </div>
            </div>
          </Card>
        )}

        {/* Fun Stuff Window */}
        {windows.find((w) => w.id === "personal")?.isOpen && (
          <Card
            className="absolute bg-gray-100 border-2 border-gray-400 shadow-lg animate-slide-in-up w-96 z-20"
            style={getWindowPosition(windows, "personal", "personal")}
          >
            <div className="bg-gradient-to-r from-orange-600 to-orange-800 text-white px-2 py-1 flex items-center justify-between text-sm">
              <span className="font-bold">🎉 Fun Stuff</span>
              <Button
                size="sm"
                variant="ghost"
                className="h-4 w-4 p-0 text-white hover:bg-orange-700"
                onClick={() => closeWindow("personal")}
              >
                <X className="h-3 w-3" />
              </Button>
            </div>
            <div className="p-4 max-h-96 overflow-y-auto">
              <div className="space-y-4 text-sm">
                <div className="bg-blue-50 p-3 rounded border-l-4 border-blue-500">
                  <div className="font-bold text-blue-800 mb-2">🌍 Fun Facts</div>
                  <ul className="space-y-1 text-blue-700">
                    <li>• New York born & raised</li>
                    <li>• Once circumnavigated the world via ship</li>
                    <li>• Jumped off the world's highest bungee bridge</li>
                    <li>• 2x 'Best Kicker' award in kickball</li>
                  </ul>
                </div>
                <div className="bg-green-50 p-3 rounded border-l-4 border-green-500">
                  <div className="font-bold text-green-800 mb-2">🎯 Interests</div>
                  <ul className="space-y-1 text-green-700">
                    <li>• Venture Capital & finance</li>
                    <li>• Cryptocurrency</li>
                    <li>• AI & LLMs</li>
                    <li>• Growing early-stage startups</li>
                    <li>• Reader & Writer</li>
                    <li>• Fitness person + tech nerd</li>
                  </ul>
                </div>
                <div className="bg-purple-50 p-3 rounded border-l-4 border-purple-500">
                  <div className="font-bold text-purple-800 mb-2">💪 Personality</div>
                  <ul className="space-y-1 text-purple-700">
                    <li>• Competitive</li>
                    <li>• Curious</li>
                    <li>• Collaborative</li>
                    <li>• Always learning</li>
                  </ul>
                </div>
              </div>
            </div>
          </Card>
        )}

        {/* Projects Window */}
        {windows.find((w) => w.id === "projects")?.isOpen && (
          <Card
            className="absolute bg-gray-100 border-2 border-gray-400 shadow-lg animate-slide-in-up w-96"
            style={getWindowPosition(windows, "projects", "projects")}
          >
            <div className="bg-gradient-to-r from-purple-600 to-purple-800 text-white px-2 py-1 flex items-center justify-between text-sm">
              <span className="font-bold">🚀 Recent AI Projects</span>
              <Button
                size="sm"
                variant="ghost"
                className="h-4 w-4 p-0 text-white hover:bg-purple-700"
                onClick={() => closeWindow("projects")}
              >
                <X className="h-3 w-3" />
              </Button>
            </div>

            <div className="p-4 max-h-96 overflow-y-auto">
              <div className="space-y-4 text-sm">
                {/* Summary Paragraph */}
                <div className="bg-purple-50 p-3 rounded border-l-4 border-purple-500 mb-4">
                  <div className="text-xs font-bold text-purple-800 mb-1"> A New Tool Every Week</div>
                  <div className="text-xs text-purple-700">
                    I'm focused on working in a new AI tool every week and shipping new products to practice my skills. My favorite tools so far include n8n, Clause, Codex, Cursor, and more. Below are some of my recent projects.
                  </div>
                </div>

                {projects.map((project) => (
                  <div
                    key={project.id}
                    className="bg-white p-3 rounded border border-gray-200 shadow-sm hover:shadow-md transition-shadow cursor-pointer"
                    onClick={() => openProjectWindow(project)}
                  >
                    <div className="flex items-center gap-3 mb-2">
                      <span className="text-2xl">{project.icon}</span>
                      <div>
                        <h3 className="font-bold text-purple-800">{project.name}</h3>
                        <p className="text-xs text-gray-600">{project.description}</p>
                      </div>
                    </div>

                    <div className="flex flex-wrap gap-1 mb-2">
                      {project.tools.slice(0, 3).map((tool) => (
                        <Badge key={tool} variant="outline" className="text-xs bg-purple-50">
                          {tool}
                        </Badge>
                      ))}
                      {project.tools.length > 3 && (
                        <Badge variant="outline" className="text-xs bg-gray-50">
                          +{project.tools.length - 3} more
                        </Badge>
                      )}
                    </div>

                    <div className="text-xs text-purple-600 hover:text-purple-800 font-medium">
                      Click to learn more →
                    </div>
                  </div>
                ))}

                <div className="bg-blue-50 p-3 rounded border-l-4 border-blue-500 mt-4">
                  <div className="text-xs font-bold text-blue-800 mb-1">💡 Building with AI</div>
                  <div className="text-xs text-blue-700">
                    These projects showcase my journey learning AI/LLM development while maintaining my sales expertise.
                    Each project solves real problems I've encountered.
                  </div>
                </div>
              </div>
            </div>
          </Card>
        )}

        {/* AIM Popup Window */}
        {windows.find((w) => w.id === "aim-popup")?.isOpen && (
          <Card
            className="absolute bg-gray-100 border-2 border-gray-400 shadow-lg animate-slide-in-up w-[480px] max-h-[400px] overflow-y-auto"
            style={{ left: 220, top: 60, zIndex: 1000, position: 'absolute' }}
          >
            <div className="bg-gradient-to-r from-green-600 to-green-800 text-white px-2 py-1 flex items-center justify-between text-sm">
              <span className="font-bold">💬 New Message from Sam</span>
              <Button
                size="sm"
                variant="ghost"
                className="h-4 w-4 p-0 text-white hover:bg-green-700"
                onClick={() => closeWindow("aim-popup")}
              >
                <X className="h-3 w-3" />
              </Button>
            </div>

            <div className="p-4 bg-white">
              <div className="space-y-3 text-sm">
                <div className="bg-blue-100 p-3 rounded border-l-4 border-blue-500 animate-fade-in">
                  <div className="flex items-center gap-2 mb-1">
                    <span className="text-lg">👤</span>
                    <strong className="text-blue-800">Sam:</strong>
                  </div>
                  <div className="mt-1 text-blue-700">
                    I'm always looking to connect with interesting founders and companies. Whether it's grabbing a coffee to talk crypto, chatting about the latest Silicon Valley seed rounds or just catching up. 
                  </div>
                  <div className="mt-3 text-blue-700">
                    <div className="font-semibold mb-2">Here are some ways I've been helping teams lately:</div>
                    <ul className="space-y-1 text-sm">
                      <li>• Building AI-powered sales automation workflows to maximize leverage</li>
                      <li>• Creating fundraising decks for Fund Managers & startups</li>
                      <li>• Building scalable early-stage startup sales playbooks and processes</li>
                    </ul>
                    <br /> Drop me a note if we should connect. 
                  </div>
                </div>

                <div className="flex gap-2 justify-center">
                  <Button
                    size="sm"
                    className="bg-green-600 hover:bg-green-700 text-white"
                    onClick={() => handleAIMResponse("yes")}
                  >
                    Yes, let's talk! 💬
                  </Button>
                  <Button
                    size="sm"
                    variant="outline"
                    className="border-gray-300 text-gray-700 hover:bg-gray-50"
                    onClick={() => handleAIMResponse("no")}
                  >
                    TTYL Instead
                  </Button>
                </div>
              </div>
            </div>
          </Card>
        )}

        {/* IM Windows for Jobs and Projects */}
        {windows
          .filter((w) => w.type === "im" && w.isOpen)
          .map((window, index) => (
            <Card
              key={window.id}
              className="absolute bg-gray-100 border-2 border-gray-400 shadow-lg w-96 animate-slide-in-up z-20"
              style={getWindowPosition(windows, window.id, window.type)}
            >
              <div className="bg-gradient-to-r from-green-600 to-green-800 text-white px-2 py-1 flex items-center justify-between text-sm">
                <span className="font-bold">💬 {window.title}</span>
                <div className="flex gap-1">
                  <Button size="sm" variant="ghost" className="h-4 w-4 p-0 text-white hover:bg-green-700">
                    <Minus className="h-3 w-3" />
                  </Button>
                  <Button
                    size="sm"
                    variant="ghost"
                    className="h-4 w-4 p-0 text-white hover:bg-green-700"
                    onClick={() => closeWindow(window.id)}
                  >
                    <X className="h-3 w-3" />
                  </Button>
                </div>
              </div>

              <div className="h-80 bg-white border-b border-gray-300 p-3 overflow-y-auto">
                {/* Job Content */}
                {window.job && (
                  <div className="space-y-3 text-sm">
                    <div className="bg-blue-100 p-2 rounded border-l-4 border-blue-500 animate-fade-in">
                      <div className="flex items-center gap-2 mb-1">
                        <span className="text-lg">{window.job.buddyIcon}</span>
                        <strong className="text-blue-800">{window.job.company}:</strong>
                      </div>
                      <div className="mt-1">{window.job.description}</div>
                    </div>

                    <div className="bg-gray-100 p-2 rounded animate-fade-in" style={{ animationDelay: "0.2s" }}>
                      <strong>Position:</strong> {window.job.position}
                      <br />
                      <strong>Duration:</strong> {window.job.duration}
                      <br />
                      <strong>Status:</strong>{" "}
                      <span className={`inline-block w-2 h-2 rounded-full ${getStatusColor(window.job.status)} mr-1`} />
                      {window.job.status}
                      {window.job.awayMessage && (
                        <div className="text-xs italic text-gray-600 mt-1">
                          Away Message: "{window.job.awayMessage}"
                        </div>
                      )}
                    </div>

                    <div
                      className="bg-green-100 p-2 rounded border-l-4 border-green-500 animate-fade-in"
                      style={{ animationDelay: "0.4s" }}
                    >
                      <strong className="text-green-800">Key Achievements:</strong>
                      <ul className="mt-1 space-y-1">
                        {window.job.achievements.map((achievement, i) => (
                          <li key={i} className="text-green-700">
                            • {achievement}
                          </li>
                        ))}
                      </ul>
                    </div>

                    <div
                      className="bg-purple-100 p-2 rounded border-l-4 border-purple-500 animate-fade-in"
                      style={{ animationDelay: "0.6s" }}
                    >
                      <strong className="text-purple-800">Technologies/Skills:</strong>
                      <div className="flex flex-wrap gap-1 mt-2">
                        {window.job.technologies.map((tech) => (
                          <Badge
                            key={tech}
                            variant="outline"
                            className="text-xs bg-white hover:bg-purple-50 transition-colors"
                          >
                            {tech}
                          </Badge>
                        ))}
                      </div>
                    </div>

                    <div
                      className="text-xs text-gray-500 text-center mt-4 animate-fade-in"
                      style={{ animationDelay: "0.8s" }}
                    >
                      I got to work in Venture Capital from the inside and build relationships with some of the most amazing founders & GPs in the business!
                    </div>
                  </div>
                )}

                {/* Project Content */}
                {window.project && (
                  <div className="space-y-3 text-sm">
                    <div className="bg-purple-100 p-2 rounded border-l-4 border-purple-500 animate-fade-in">
                      <div className="flex items-center gap-2 mb-1">
                        <span className="text-lg">{window.project.icon}</span>
                        <strong className="text-purple-800">{window.project.name}:</strong>
                      </div>
                      <div className="mt-1">{window.project.description}</div>
                    </div>

                    {window.project.url && (
                      <div
                        className="bg-orange-100 p-2 rounded border-l-4 border-orange-500 animate-fade-in"
                        style={{ animationDelay: "0.2s" }}
                      >
                        <strong className="text-orange-800">🌐 Live Site:</strong>
                        <div className="mt-1">
                          <a
                            href={window.project.url}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="text-orange-700 hover:text-orange-900 underline"
                          >
                            {window.project.url}
                          </a>
                        </div>
                      </div>
                    )}

                    <div className="bg-blue-100 p-2 rounded animate-fade-in" style={{ animationDelay: "0.4s" }}>
                      <strong className="text-blue-800">Project Details:</strong>
                      <div className="mt-1 text-blue-700">{window.project.details}</div>
                    </div>

                    <div
                      className="bg-green-100 p-2 rounded border-l-4 border-green-500 animate-fade-in"
                      style={{ animationDelay: "0.6s" }}
                    >
                      <strong className="text-green-800">Tools & Technologies:</strong>
                      <div className="flex flex-wrap gap-1 mt-2">
                        {window.project.tools.map((tool) => (
                          <Badge
                            key={tool}
                            variant="outline"
                            className="text-xs bg-white hover:bg-green-50 transition-colors"
                          >
                            {tool}
                          </Badge>
                        ))}
                      </div>
                    </div>

                    <div
                      className="text-xs text-gray-500 text-center mt-4 animate-fade-in"
                      style={{ animationDelay: "0.8s" }}
                    >
                      Inspired by my interest in true crime, I built this working software that can fully parse bulk data and gives an analysis of potential suspects, overlooked evidence, and visual charts and timelines of involved parties.
                    </div>
                  </div>
                )}
              </div>

              <div className="p-2 bg-gray-50 flex items-center gap-2">
                <input
                  type="text"
                  placeholder="Type a message..."
                  className="flex-1 px-2 py-1 text-sm border border-gray-300 rounded focus:border-blue-400 focus:outline-none"
                  disabled
                />
                <Button size="sm" disabled className="bg-blue-500 text-white">
                  Send
                </Button>
              </div>
            </Card>
          ))}
      </div>
    </div>
  )
}

