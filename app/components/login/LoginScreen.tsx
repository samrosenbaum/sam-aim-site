"use client"
import { Card } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Minus, X } from "lucide-react"
import { LoginState } from "@/app/types"

interface LoginScreenProps {
  loginState: LoginState
  username: string
  password: string
  isTyping: boolean
  connectionProgress: number
  setUsername: (v: string) => void
  setPassword: (v: string) => void
  handleSignOn: () => void
}

export default function LoginScreen({
  loginState,
  username,
  password,
  isTyping,
  connectionProgress,
  setUsername,
  setPassword,
  handleSignOn,
}: LoginScreenProps) {
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-100 to-blue-200 flex items-center justify-center p-4">
      <Card className="w-80 bg-gray-100 border-2 border-gray-400 shadow-xl">
        <div className="bg-gradient-to-r from-blue-600 to-blue-800 text-white px-2 py-1 flex items-center justify-between text-sm">
          <div className="flex items-center gap-1">
            <span className="text-yellow-400">⚠️</span>
            <span className="font-bold">Sign On</span>
          </div>
          <div className="flex gap-1">
            <Button size="sm" variant="ghost" className="h-4 w-4 p-0 text-white hover:bg-blue-700">
              <Minus className="h-3 w-3" />
            </Button>
            <Button size="sm" variant="ghost" className="h-4 w-4 p-0 text-white hover:bg-blue-700">
              <X className="h-3 w-3" />
            </Button>
          </div>
        </div>
        <div className="p-4">
          {loginState === "login" && (
            <>
              <div className="bg-blue-800 p-4 rounded mb-4 text-center">
                <div className="flex items-center justify-center gap-3 mb-2">
                  <div className="w-12 h-12 bg-yellow-400 rounded-full flex items-center justify-center">
                    <span className="text-blue-800 text-2xl font-bold">🌐</span>
                  </div>
                  <div className="w-8 h-8 bg-blue-500 transform rotate-45"></div>
                </div>
                <div className="text-white font-bold text-lg">AOL</div>
                <div className="text-blue-200 text-sm italic">Instant Messenger</div>
              </div>
              <div className="space-y-3">
                <div>
                  <div className="flex items-center gap-2 mb-1">
                    <span className="text-sm font-semibold">Screen Name</span>
                    <span className="text-red-500">🔑</span>
                    <select className="ml-auto text-xs bg-white border border-gray-300 rounded px-1">
                      <option>▼</option>
                    </select>
                  </div>
                  <input
                    type="text"
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                    className="w-full px-2 py-1 border border-gray-300 rounded text-sm"
                    placeholder="Enter screen name"
                    disabled={isTyping}
                  />
                  <div className="text-xs text-blue-600 underline cursor-pointer mt-1">Get a Screen Name</div>
                </div>
                <div>
                  <div className="text-sm font-semibold mb-1">Password</div>
                  <input
                    type="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className="w-full px-2 py-1 border border-gray-300 rounded text-sm"
                    disabled={isTyping}
                  />
                  <div className="text-xs text-blue-600 underline cursor-pointer mt-1">Forgot Password?</div>
                </div>
                <div className="flex items-center gap-4 text-xs">
                  <label className="flex items-center gap-1">
                    <input type="checkbox" className="w-3 h-3" defaultChecked />
                    Save password
                  </label>
                  <label className="flex items-center gap-1">
                    <input type="checkbox" className="w-3 h-3" />
                    Auto-login
                  </label>
                </div>
                <div className="flex justify-between items-center pt-2">
                  <div className="flex gap-2">
                    <Button size="sm" variant="outline" className="text-xs px-3 py-1 bg-transparent">
                      Help
                    </Button>
                    <Button size="sm" variant="outline" className="text-xs px-3 py-1 bg-transparent">
                      Setup
                    </Button>
                  </div>
                  <Button
                    size="sm"
                    className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-1 text-xs"
                    onClick={handleSignOn}
                    disabled={isTyping || !username || !password}
                  >
                    Sign On
                  </Button>
                </div>
                <div className="text-xs text-gray-500 text-center pt-2 border-t">Version: 5.9.3702</div>
              </div>
            </>
          )}
          {(loginState === "connecting" || loginState === "signing-in") && (
            <div className="text-center py-8">
              <div className="mb-4">
                <div className="w-16 h-16 bg-blue-600 rounded-full mx-auto flex items-center justify-center mb-4 animate-pulse">
                  <span className="text-white text-2xl">🌐</span>
                </div>
                <div className="text-lg font-semibold mb-2">
                  {loginState === "connecting" ? "Connecting..." : "Signing In..."}
                </div>
                <div className="text-sm text-gray-600 mb-4">
                  {loginState === "connecting" ? "Establishing connection to AIM servers" : "Authenticating user credentials"}
                </div>
              </div>
              <div className="w-full bg-gray-200 rounded-full h-2 mb-4">
                <div className="bg-blue-600 h-2 rounded-full transition-all duration-200 ease-out" style={{ width: `${connectionProgress}%` }}></div>
              </div>
              <div className="text-xs text-gray-500">{Math.round(connectionProgress)}% complete</div>
            </div>
          )}
        </div>
      </Card>
    </div>
  )
}
