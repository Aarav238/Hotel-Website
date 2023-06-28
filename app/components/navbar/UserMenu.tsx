'use client'
import {AiOutlineMenu} from "react-icons/ai"
import Avatar from "../Avatar"
import MenuItem from "./MenuItem"
import { useCallback, useState } from "react"
import useRegisterModal from "@/app/hooks/useRegisterModal"
import useLoginModal from "@/app/hooks/useLoginModal"
import { User } from "@prisma/client"

interface UserMenuProps {
    currentUser ?: User|null
}
const UserMenu: React.FC<UserMenuProps> = ({
    currentUser
}) => {
    const registerModal = useRegisterModal();
    const loginModal = useLoginModal();
 const [isOpen , setIsOpen] = useState(false)
 const toggleOpen = useCallback(() => {
    setIsOpen((value) => !value);
  }, []);

  return (
    <div 
    className="relative"
    >
        <div className="flex flex-row items-center gap-3 ">
            <div
            onClick={() => {}}

            className=" hidden md:block text-sm font-semibold py-3 px-4 rounded-full hover:bg-neutal-100 transition cursor-pointer "
            >
                AIRBNB your home
            </div>
            <div
             onClick={toggleOpen}
            className="md:px-2 p-4 md:py-1 border-[1px] border-neutral-200 flex flex-row items-center gap-3 rounded-full cursor-pointer transition hover:shadow-md "
            >
                <AiOutlineMenu />
                <div
                className="hidden md:block">
                    <Avatar/>
                </div>
            </div>


        </div>
        {isOpen && (
            <div
            className=" absolute rounded-xl shadow-md w-[40vw] md:w-3/4 bg-white overflow-hidden right-0 top-12 text-sm">
                <div className="flex flex-col cursor-pointer">
                
                {currentUser ? (
                <>
                <MenuItem
                onclick={() => {}}
                label="My trios"
                />
                <MenuItem
                onclick={() => {}}
                label="My favorites"
                />
                <MenuItem
                onclick={() => {}}
                label="My Reservations"
                />
                <MenuItem
                onclick={() => {}}
                label="My Properties"
                />
                <MenuItem
                onclick={() => {}}
                label=""
                />
                </>
                ):
                (<>
                    <MenuItem
                    onclick={loginModal.onOpen}
                    label="Login "
                    />
                    <MenuItem
                    onclick={registerModal.onOpen}
                    label="Sign up"
                    />
                    </>)}
                </div>
            </div>
        )}
    </div>
  )
}

export default UserMenu