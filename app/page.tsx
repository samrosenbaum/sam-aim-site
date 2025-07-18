"use client"

import { useState, useEffect } from "react"
import LoginScreen from "./components/login/LoginScreen"
import Desktop from "./components/desktop/Desktop"
import {
  Job,
  Project,
  IMWindow,
  NotificationMessage,
  LoginState,
} from "./types"
import { statusOptions } from "./components/desktop/helpers"

export default function AIMPortfolio() {
  const jobs: Job[] = [
    {
      id: "angellist",
      company: "AngelList Venture",
      position: "Founding Account Executive",
      duration: "2020 - 2025",
      status: "online",
      buddyIcon: "🚀",
      description:
        "Built the sales process and playbook for the fund-platform-as-a-service business. Worked with hundreds of Venture Capitalists on VC funds.",
      achievements: [
        "700+ deals closed, millions in ARR generated",
        "Scaled ARR to $xxm per year",
        "Built deep network in VC & startups",
        "Learned SEC regs, fund laws, investing",
        "Solo sales team winning 45+ deals per quarter",
      ],
      technologies: ["Salesforce", "Fund Administration", "SEC Regulations", "VC Relations", "Deal Closing"],
    },
    {
      id: "atrium",
      company: "Atrium",
      position: "Account Executive",
      duration: "2019 - 2020",
      status: "away",
      buddyIcon: "⚖️",
      awayMessage: "Justin Kan's 'rocketship' - infamously shut down while I was on an airplane! 🛫",
      description:
        "Sold legal services to founders raising venture rounds. Spent 100+ hours training in deal closing & negotiation.",
      achievements: [
        "Specialized in venture round legal services",
        "100+ hours deal closing & negotiation training",
        "Worked directly with startup founders",
      ],
      technologies: ["Legal Tech", "Venture Deals", "Negotiation", "Founder Relations"],
    },
    {
      id: "uxpin",
      company: "UXPin",
      position: "SDR Manager → Sales Manager",
      duration: "2016 - 2019",
      status: "idle",
      buddyIcon: "🎨",
      description:
        "Started as SDR Manager overseeing 5 SDRs, eventually managed AEs. Sold UX design software to mid-market & enterprises.",
      achievements: [
        "Managed team of 5+ SDRs and AEs",
        "Sold to mid-market & enterprise clients",
        "Traveled to Poland to work with product team",
        "Scaled design platform sales",
      ],
      technologies: ["Design Software", "Team Management", "Enterprise Sales", "International Business"],
    },
    {
      id: "fit3d",
      company: "Fit3D",
      position: "Founding SDR → AE",
      duration: "2014 - 2016",
      status: "idle",
      buddyIcon: "💪🏼",
      awayMessage: "Hardware is hard! But brought me to the West Coast 🌉",
      description:
        "Started as first SDR building scalable pipeline for 3D body-scanning technology. Sold hardware & software to medical and fitness centers.",
      achievements: [
        "First SDR, built scalable inbound/ outbound pipeline generation",
        "Promoted to first AE role",
        "Sold to medical and fitness centers",
      ],
      technologies: ["Hardware Sales", "3D Technology", "Medical Devices", "Fitness Tech"],
    },
  ]

  const projects: Project[] = [
    {
      id: "coldcase",
      name: "Case Cracker AI",
      icon: "🔍",
      description: "AI analysis for law enforcement to review case files and spot clues human brain may miss",
      tools: ["Supabase", "React", "Cursor", "Vercel", "GPT-4", "Claude"],
      details:
        "Nearly 346,000 cases of homicide and non-negligent manslaughter went unsolved from 1965 to 2023. Building software where law enforcement can upload evidence and use sophisticated AI analysis to bulk review large case files, spot clues, flag untested evidence and identify potential suspects.",
    },
    {
      id: "n8n-automation",
      name: "Pinfast - Marketing Content Automator",
      icon: "🤖",
      description: "Automated bulk content creation and posting to Pinterest for store owners",
      tools: ["n8n", "Claude Sonnet 4", "JSON"],
      details:
        "Built automated workflows using n8n to streamline small business online marketing ops. Created integrations with Etsy and Pinterest APIs to automatically generate and post bulk content, saving hours of manual work. This project demonstrates my ability to learn new tools quickly and build practical automation solutions.",
    },
    {
      id: "zonefinder",
      name: "ZoneFinder",
      icon: "🏠",
      description: "UX for real estate developers to find housing zones in CA",
      tools: ["React.js", "v0", "Vercel", "Visual Studio Code"],
      details:
        "A real estate developer friend expressed finding housing zones as a pain-point. Built a clean UX to solve this specific problem for California real estate development.",
    },
    {
      id: "yrboyfriend",
      name: "Yrboyfriend",
      icon: "💕",
      description: "AI companions, pivoted to personas of real fantasy characters so fans can chat",
      tools: ["React.js", "Vercel", "Visual Studio Code", "AI/LLMs"],
      details:
        "Designed around the research that '25% of young adults believe that AI has the potential to replace real-life romantic relationships.' Exploring the intersection of AI and human connection.",
      url: "https://chat.yrboyfriend.com/",
    },
    {
      id: "kai",
      name: "Kai GPT",
      icon: "🧠",
      description: "GPT focused on anxiety and panic attacks with therapeutic techniques",
      tools: ["OpenAI GPT", "Therapeutic AI", "Mental Health"],
      details:
        "Started building a full app but works fine as a simple GPT. Specifically designed to help people talk through anxiety and panic attacks using proven therapeutic techniques.",
      url: "https://chatgpt.com/g/g-67c5fbf992148191a971f8b46689e9d2-kai",
    },
  ]

  const [loginState, setLoginState] = useState<LoginState>("login")
  const [username, setUsername] = useState("")
  const [password, setPassword] = useState("")
  const [isTyping, setIsTyping] = useState(false)
  const [connectionProgress, setConnectionProgress] = useState(0)

  const [userStatus, setUserStatus] = useState<"online" | "away" | "busy" | "invisible">("online")
  const [showStatusMenu, setShowStatusMenu] = useState(false)
  const [showContactWindow, setShowContactWindow] = useState(false)
  const [contactForm, setContactForm] = useState({ name: "", email: "", subject: "", message: "" })
  const [windows, setWindows] = useState<IMWindow[]>([
    { id: "buddy-list", title: "Buddy List", isOpen: true, type: "buddy" },
    { id: "profile", title: "My Profile", isOpen: false, type: "profile" },
    { id: "projects", title: "Recent Projects", isOpen: false, type: "projects" },
    { id: "stats", title: "Career Stats", isOpen: false, type: "stats" },
    { id: "personal", title: "Fun Stuff", isOpen: false, type: "personal" },
    { id: "aim-popup", title: "Chat with Sam", isOpen: false, type: "popup" },
  ])
  const [notifications, setNotifications] = useState<NotificationMessage[]>([])
  const [showNotification, setShowNotification] = useState(false)
  const [hasPlayedWelcome, setHasPlayedWelcome] = useState(false)
  const [pulsingElements, setPulsingElements] = useState<string[]>([])
  const [currentTime, setCurrentTime] = useState(new Date())

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentTime(new Date())
    }, 60000)
    return () => clearInterval(timer)
  }, [])

  useEffect(() => {
    if (loginState === "login") {
      const timer1 = setTimeout(() => {
        setIsTyping(true)
        const usernameText = "SamRosenbaum91"
        let i = 0
        const typeUsername = setInterval(() => {
          setUsername(usernameText.slice(0, i + 1))
          i++
          if (i >= usernameText.length) {
            clearInterval(typeUsername)
            setTimeout(() => {
              let j = 0
              const passwordText = "••••••••"
              const typePassword = setInterval(() => {
                setPassword(passwordText.slice(0, j + 1))
                j++
                if (j >= passwordText.length) {
                  clearInterval(typePassword)
                  setIsTyping(false)
                  setTimeout(() => {
                    handleSignOn()
                  }, 1000)
                }
              }, 100)
            }, 500)
          }
        }, 150)
      }, 2000)
      return () => clearTimeout(timer1)
    }
  }, [loginState])

  useEffect(() => {
    if (loginState === "connecting" || loginState === "signing-in") {
      const interval = setInterval(() => {
        setConnectionProgress(prev => {
          if (prev >= 100) {
            clearInterval(interval)
            if (loginState === "connecting") {
              setTimeout(() => setLoginState("signing-in"), 500)
            } else {
              setTimeout(() => setLoginState("complete"), 500)
            }
            return 100
          }
          return prev + (loginState === "connecting" ? 8 : 12)
        })
      }, 200)
      return () => clearInterval(interval)
    }
  }, [loginState])

  useEffect(() => {
    if (loginState === "complete" && !hasPlayedWelcome) {
      const timer = setTimeout(() => {
        setShowNotification(true)
        const welcomeNotification: NotificationMessage = {
          id: "welcome",
          sender: "AIM System",
          message: "I built this site because I miss the early 2000's, when after soccer I would chat with my friends on AIM. My first coding experience was customizing my Myspace and I had no idea where the world of tech would take me. </br> 20 years later you can <strong>click around my buddy list or explore hidden gems in the Desktop Icons</strong> to see what I've been up to.",
          timestamp: new Date(),
          isRead: false,
        }
        setNotifications([welcomeNotification])
        setHasPlayedWelcome(true)
        setPulsingElements(["profile-button"])
        setTimeout(() => setPulsingElements([]), 5000)
      }, 1500)
      return () => clearTimeout(timer)
    }
  }, [loginState, hasPlayedWelcome])

  useEffect(() => {
    if (loginState === "complete") {
      const interval = setInterval(() => {
        const allItems = [
          ...jobs.map(j => j.id),
          ...projects.map(p => p.id),
          "stats",
          "personal",
        ]
        const randomItem = allItems[Math.floor(Math.random() * allItems.length)]
        setPulsingElements(prev => [...prev.filter(id => id !== randomItem), randomItem])
        setTimeout(() => {
          setPulsingElements(prev => prev.filter(id => id !== randomItem))
        }, 2000)
      }, 10000)
      return () => clearInterval(interval)
    }
  }, [loginState, jobs, projects])

  // Show AIM popup after a delay
  useEffect(() => {
    if (loginState === "complete") {
      const timer = setTimeout(() => {
        setWindows(prev => prev.map(w => 
          w.id === "aim-popup" ? { ...w, isOpen: true } : w
        ))
      }, 25000) // Show after 25 seconds
      return () => clearTimeout(timer)
    }
  }, [loginState])

  const handleSignOn = () => {
    setLoginState("connecting")
    setConnectionProgress(0)
  }

  const openWindow = (job: Job) => {
    const existing = windows.find(w => w.id === job.id)
    if (existing) {
      setWindows(windows.map(w => (w.id === job.id ? { ...w, isOpen: true } : w)))
    } else {
      setWindows([
        ...windows,
        { id: job.id, title: `Message from ${job.company}`, isOpen: true, type: "im", job },
      ])
    }
    setPulsingElements(prev => prev.filter(id => id !== job.id))
  }

  const openProjectWindow = (project: Project) => {
    const existing = windows.find(w => w.id === project.id)
    if (existing) {
      setWindows(windows.map(w => (w.id === project.id ? { ...w, isOpen: true } : w)))
    } else {
      setWindows([
        ...windows,
        { id: project.id, title: `Project: ${project.name}`, isOpen: true, type: "im", project },
      ])
    }
    setPulsingElements(prev => prev.filter(id => id !== project.id))
  }

  const closeWindow = (id: string) => {
    if (id === "buddy-list") return
    setWindows(windows.map(w => (w.id === id ? { ...w, isOpen: false } : w)))
  }

  const toggleWindow = (id: string) => {
    const existing = windows.find(w => w.id === id)
    if (existing) {
      setWindows(windows.map(w => (w.id === id ? { ...w, isOpen: !w.isOpen } : w)))
      setPulsingElements(prev => prev.filter(item => item !== `${id}-button`))
    }
  }

  const handleStatusChange = (newStatus: typeof userStatus) => {
    setUserStatus(newStatus)
    setShowStatusMenu(false)
    const statusInfo = statusOptions.find(s => s.value === newStatus)
    const statusNotification: NotificationMessage = {
      id: `status-${Date.now()}`,
      sender: "Status Update",
      message: `Status changed to ${statusInfo?.label}: "${statusInfo?.message}"`,
      timestamp: new Date(),
      isRead: false,
    }
    setNotifications(prev => [statusNotification, ...prev.slice(0, 2)])
    setShowNotification(true)
    setTimeout(() => setShowNotification(false), 3000)
  }

  const openContactWindow = () => {
    setShowContactWindow(true)
    setPulsingElements([])
  }

  const closeContactWindow = () => {
    setShowContactWindow(false)
    setContactForm({ name: "", email: "", subject: "", message: "" })
  }

  const handleContactSubmit = () => {
    const { name, email, subject, message } = contactForm
    if (!name || !email || !message) {
      alert("Please fill in all required fields!")
      return
    }
    const mailtoLink = `mailto:samanthakrosenbaum@gmail.com?subject=${encodeURIComponent(subject || `Portfolio Contact from ${name}`)}&body=${encodeURIComponent(
      `Name: ${name}\nEmail: ${email}\n\nMessage:\n${message}\n\n---\nSent via Sam's AIM Portfolio`,
    )}`
    window.location.href = mailtoLink
    const successNotification: NotificationMessage = {
      id: `contact-${Date.now()}`,
      sender: "Contact Form",
      message: `Email client opened! Your message to Sam is ready to send. 📧`,
      timestamp: new Date(),
      isRead: false,
    }
    setNotifications(prev => [successNotification, ...prev.slice(0, 2)])
    setShowNotification(true)
    closeContactWindow()
  }

  const dismissNotification = () => {
    setNotifications([])
    setShowNotification(false)
  }

  const handleAIMResponse = (response: "yes" | "no") => {
    if (response === "yes") {
      // Open contact window or email
      openContactWindow()
      setWindows(prev => prev.map(w => 
        w.id === "aim-popup" ? { ...w, isOpen: false } : w
      ))
    } else {
      // Just close the popup
      setWindows(prev => prev.map(w => 
        w.id === "aim-popup" ? { ...w, isOpen: false } : w
      ))
    }
  }

  if (loginState !== "complete") {
    return (
      <LoginScreen
        loginState={loginState}
        username={username}
        password={password}
        isTyping={isTyping}
        connectionProgress={connectionProgress}
        setUsername={setUsername}
        setPassword={setPassword}
        handleSignOn={handleSignOn}
      />
    )
  }

  return (
    <Desktop
      windows={windows}
      setWindows={setWindows}
      userStatus={userStatus}
      showStatusMenu={showStatusMenu}
      setShowStatusMenu={setShowStatusMenu}
      showContactWindow={showContactWindow}
      contactForm={contactForm}
      setContactForm={setContactForm}
      notifications={notifications}
      showNotification={showNotification}
      currentTime={currentTime}
      pulsingElements={pulsingElements}
      openWindow={openWindow}
      openProjectWindow={openProjectWindow}
      closeWindow={closeWindow}
      toggleWindow={toggleWindow}
      openContactWindow={openContactWindow}
      closeContactWindow={closeContactWindow}
      handleContactSubmit={handleContactSubmit}
      handleStatusChange={handleStatusChange}
      dismissNotification={dismissNotification}
      jobs={jobs}
      projects={projects}
      handleAIMResponse={handleAIMResponse}
    />
  )
}
