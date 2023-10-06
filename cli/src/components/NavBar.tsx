import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
} from '@/components/ui/navigation-menu'
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import { generateFromString } from 'generate-avatar'
import { AuthContext } from '@/context/auth.context'
import { useContext } from 'react'

export const NavBar = () => {
  const { isLoggedIn, user, logOutUser } = useContext(AuthContext)

  return (
    <NavigationMenu className='bg-slate-200'>
      <NavigationMenuList>
        <NavigationMenuItem>
          <NavigationMenuTrigger>My Notes</NavigationMenuTrigger>
          <NavigationMenuContent>
            <ul>
              <li>
                <NavigationMenuLink asChild>
                  <a href='/notes'>
                    <p className='whitespace-nowrap bg-white p-2 transition-colors duration-300 ease-in-out hover:bg-slate-200'>
                      Notes
                    </p>
                  </a>
                </NavigationMenuLink>
              </li>
              <li>
                <NavigationMenuLink asChild>
                  <a href='/archived'>
                    <p className='whitespace-nowrap bg-white p-2 transition-colors duration-300 ease-in-out hover:bg-slate-200'>
                      Archived
                    </p>
                  </a>
                </NavigationMenuLink>
              </li>
              <li>
                <NavigationMenuLink asChild>
                  <a href='/deleted'>
                    <p className='whitespace-nowrap bg-white p-2 transition-colors duration-300 ease-in-out hover:bg-slate-200'>
                      Deleted
                    </p>
                  </a>
                </NavigationMenuLink>
              </li>
            </ul>
          </NavigationMenuContent>
        </NavigationMenuItem>
        <NavigationMenuItem>
          {isLoggedIn ? (
            <button
              className='group inline-flex h-9 w-max items-center justify-center rounded-md bg-background px-4 py-2 text-sm font-medium transition-colors hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground focus:outline-none disabled:pointer-events-none disabled:opacity-50 data-[active]:bg-accent/50 data-[state=open]:bg-accent/50'
              onClick={logOutUser}
            >
              Logout
            </button>
          ) : (
            <NavigationMenuLink
              href='/login'
              className='group inline-flex h-9 w-max items-center justify-center rounded-md bg-background px-4 py-2 text-sm font-medium transition-colors hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground focus:outline-none disabled:pointer-events-none disabled:opacity-50 data-[active]:bg-accent/50 data-[state=open]:bg-accent/50'
            >
              Login
            </NavigationMenuLink>
          )}
        </NavigationMenuItem>
        <NavigationMenuItem className='flex items-center justify-center gap-3'>
          <Avatar>
            <AvatarImage
              src={`data:image/svg+xml;utf8,${generateFromString(
                user ? `${user?.username}` : 'Visitor',
              )}`}
            />
            <AvatarFallback>{user ? user.username : 'Visitor'}</AvatarFallback>
          </Avatar>
          {user ? user.username : 'Visitor'}
        </NavigationMenuItem>
      </NavigationMenuList>
    </NavigationMenu>
  )
}
