"use client";
import Link from "next/link";
import { signIn, signOut, useSession } from "next-auth/react";
import { usePathname } from "next/navigation";
import { FaUserAlt } from "react-icons/fa";
import { GiKnifeFork } from "react-icons/gi";
import { useRouter } from "next/navigation";
import { BsPersonRaisedHand } from "react-icons/bs";
import { ModeToggle } from "./ModeToggle";
import * as React from "react";
import cat from '../../../public/cat.jpg'
import {
  Cloud,
  CreditCard,
  Github,
  Keyboard,
  LifeBuoy,
  LogOut,
  Mail,
  MessageSquare,
  Plus,
  PlusCircle,
  Settings,
  User,
  UserPlus,
  Users,
} from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuPortal,
  DropdownMenuSeparator,
  DropdownMenuShortcut,
  DropdownMenuSub,
  DropdownMenuSubContent,
  DropdownMenuSubTrigger,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
  navigationMenuTriggerStyle,
} from "@/components/ui/navigation-menu";
import { cn } from "@/lib/utils";

import { Button } from "@/components/ui/button";
import Image from "next/image";

const ACTIVE_ROUTE =
  "py-2 px-3 md:mx-10 rounded-full text-xs md:text-lg hover:bg-black hover:text-white hover:rounded-lg hover:transition hover:duration-250";
const INACTIVE_ROUTE =
  "py-2 px-3 text-xs md:mx-10 md:text-lg text-black hover:text-black hover:bg-white hover:rounded-lg hover:transition hover:duration-500";

// async function someFunction(req: any) {
//   const session = await getServerSession(authOptions);
//   // Use the session data here
// }
const components: { title: string; href: string; description: string }[] = [
  {
    title: "Alert Dialog",
    href: "/docs/primitives/alert-dialog",
    description:
      "A modal dialog that interrupts the user with important content and expects a response.",
  },
  {
    title: "Hover Card",
    href: "/docs/primitives/hover-card",
    description:
      "For sighted users to preview content available behind a link.",
  },
  {
    title: "Progress",
    href: "/docs/primitives/progress",
    description:
      "Displays an indicator showing the completion progress of a task, typically displayed as a progress bar.",
  },
  {
    title: "Scroll-area",
    href: "/docs/primitives/scroll-area",
    description: "Visually or semantically separates content.",
  },
  {
    title: "Tabs",
    href: "/docs/primitives/tabs",
    description:
      "A set of layered sections of content—known as tab panels—that are displayed one at a time.",
  },
  {
    title: "Tooltip",
    href: "/docs/primitives/tooltip",
    description:
      "A popup that displays information related to an element when the element receives keyboard focus or the mouse hovers over it.",
  },
];

export default function NavMenu() {
  const pathname = usePathname();
  const router = useRouter();
  const { data: session } = useSession();

  const handleSignInLink = (event: any) => {
    // Your logic here
    event.preventDefault();
    router.push("/login", { scroll: false });
  };
  const handleSignOut = (event: any) => {
    // Your logic here
    // event.preventDefault();
    signOut();
    router.push("/", { scroll: false });
  };

  const handleRegisterLink = (event: any) => {
    // Your logic here
    // event.preventDefault();
    router.push("/register", { scroll: false });
  };

  return (
    <>
      {/* Nav Container */}
      <div className="mt-20 mb-10 ms-5 w-[85%] lg:w-[70vw] flex flex-row justify-between items-center">
        {/* logo here */}
        <div className="flex justify-start w-[20vw] items-center">
          <GiKnifeFork size={40} />
          <a href="/" className="ms-5 lg:ms-10 text-sm md:text-xl">
            AI RECIPE APP
          </a>
        </div>

        {/* div for grouping the right side of navbar TO SEPARATE NAV BETWEEN */}

        {/* main nav here */}
        <div className="lg:w-[35%] md:w-[40%] flex justify-around items-center">
          <div>
            {!session ? (
              <BsPersonRaisedHand size={20} />
            ) : (
              <Image
                width={500}
                height={500}
                src={
                  session?.user?.image
                    ? session.user.image
                    : cat
                }
                alt="User's Avatar"
                className="rounded-full w-[40px] h-[40px] lg:w-[50px] lg:h-[50px]"
              />
            )}
          </div>
          <NavigationMenu>
            <NavigationMenuList>
              <NavigationMenuItem>
                <NavigationMenuTrigger>
                  {" "}
                  <span className="lg:hidden p-[.25rem] border-black border-[1.5px] rounded">
                    | | |
                  </span>
                  <span className="hidden lg:block text-lg">YOUR ACCOUNT</span>
                </NavigationMenuTrigger>
                <NavigationMenuContent>
                  <ul className="bg-black rounded-3xl grid gap-1 p-2 md:w-[400px] lg:w-[500px] lg:grid-cols-[.75fr_1fr]">
                    <li className="row-span-3">
                      <NavigationMenuLink asChild>
                        <a
                          className="text-white flex h-full w-full select-none flex-col justify-end rounded-md bg-gradient-to-b from-muted/50 to-muted p-2 no-underline outline-none focus:shadow-md"
                          href="/"
                        >
                          <GiKnifeFork size={25} />
                          <div className="mb-2 mt-4 text-lg font-medium">
                            AI RECIPE APP
                          </div>
                          <p className="text-xs leading-tight text-muted-foreground">
                            Discouver our world&apos;s recipes.
                          </p>
                        </a>
                      </NavigationMenuLink>
                    </li>
                    <ListItem href="/members" title="MEMBERS">
                      If you wish to save your recipes for future recollection,
                      please register to become a member, then sign-in.
                    </ListItem>
                    <ListItem href="/register" title="REGISTER">
                      Register to become a member.
                    </ListItem>
                    <ListItem href="/login" title="LOGIN">
                      Login to your account.
                    </ListItem>
                    <hr className="w-[90%]" />
                    <input
                      type="button"
                      value="SIGN OUT"
                      onClick={handleSignOut}
                      className="text-white border border-white py-2 my-5 rounded hover:cursor-pointer hover:bg-white hover:text-black hover:transition hover:duration-250"
                    />
                  </ul>
                </NavigationMenuContent>
              </NavigationMenuItem>
            </NavigationMenuList>
          </NavigationMenu>
          <ModeToggle />
        </div>
      </div>
    </>
  );
}

const ListItem = React.forwardRef<
  React.ElementRef<"a">,
  React.ComponentPropsWithoutRef<"a">
>(({ className, title, children, ...props }, ref) => {
  return (
    <li>
      <NavigationMenuLink asChild>
        <a
          ref={ref}
          className={cn(
            "text-xs text-white block select-none space-y-1 rounded-md p-3 leading-none no-underline outline-none transition-colors focus:bg-accent focus:text-accent-foreground",
            className
          )}
          {...props}
        >
          <div className="underline text-lg font-medium leading-none">
            {title}
          </div>
          <p className="line-clamp-2 text-xs leading-snug text-muted-foreground">
            {children}
          </p>
        </a>
      </NavigationMenuLink>
    </li>
  );
});
ListItem.displayName = "ListItem";
