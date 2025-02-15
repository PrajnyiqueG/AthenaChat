import { useState } from "react"
import { ChevronsUpDownIcon as ChevronUpDown, LogOut } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"

interface ProfileSectionProps {
  user?: {
    name?: string
    email?: string
    avatar?: string
    role?: string
  }
}

export function ProfileSection({ user = {} }: ProfileSectionProps) {
  const [isOpen, setIsOpen] = useState(false)
  const { name = "Guest User", email = "guest@example.com", avatar, role = "Student" } = user

  const handleLogout = async () => {
    // TODO: Implement logout functionality
    console.log("Logout clicked")
  }

  return (
    <div className="p-4 border-t border-border/40 bg-sidebar">
      <DropdownMenu open={isOpen} onOpenChange={setIsOpen}>
        <DropdownMenuTrigger asChild>
          <Button variant="ghost" className="w-full flex items-center justify-between hover:bg-secondary/50 p-2 h-auto">
            <div className="flex items-center gap-3">
              <Avatar>
                <AvatarImage src={avatar || undefined} alt={name} />
                <AvatarFallback>{name.charAt(0)}</AvatarFallback>
              </Avatar>
              <div className="flex flex-col items-start">
                <span className="text-sm font-medium">{name}</span>
                <span className="text-xs text-muted-foreground">{role}</span>
              </div>
            </div>
            <ChevronUpDown className="h-4 w-4 text-muted-foreground" />
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent className="w-56" align="end" forceMount>
          <DropdownMenuItem>
            <div className="flex flex-col space-y-1">
              <p className="text-sm font-medium leading-none">{name}</p>
              <p className="text-xs leading-none text-muted-foreground">{email}</p>
            </div>
          </DropdownMenuItem>
          <DropdownMenuSeparator />
          <DropdownMenuItem onClick={handleLogout}>
            <LogOut className="mr-2 h-4 w-4" />
            <span>Log out</span>
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    </div>
  )
}

