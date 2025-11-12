"use client";
import React, { useContext } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { assets } from '@/assets/assets'
import { AppContext } from '@/context/AppContext';

// --- Clerk Imports ---
import { useClerk, UserButton, useUser } from "@clerk/nextjs";
// We removed useRouter because we are removing the menu that used it

const Navbar = () => {

    // --- Clerk Hooks ---
    const { openSignIn } = useClerk();
    const { user } = useUser();

    // Use default value {} to prevent errors if context is null
    const { cartItems = {} } = useContext(AppContext) || {};

    // Calculate total cart items
    const totalItems = Object.values(cartItems).reduce((acc, count) => acc + count, 0);

    return (
        <nav className='py-5 px-4 md:px-10 lg:px-16 xl:px-24 flex justify-between items-center border-b'>

            {/* Logo */}
            <Link href={'/'}>
                {assets.logo && (
                    <Image
                        src={assets.logo}
                        width={130}
                        height={40}
                        alt='EcoKart Logo'
                    />
                )}
            </Link>

            {/* Links and Icons */}
            <div className='flex items-center gap-4 sm:gap-6 md:gap-8'>
                <Link href={'/'} className='hidden sm:block text-gray-700 hover:text-gray-900'>Home</Link>
                <Link href={'/all-products'} className='text-gray-700 hover:text-gray-900'>Shop</Link>
                
                {/* Cart Icon */}
                <Link href={'/cart'} className='relative'>
                    {assets.bag_icon && (
                        <Image
                            src={assets.bag_icon}
                            width={28}
                            height={28}
                            alt='Cart Icon'
                        />
                    )}
                    {totalItems > 0 && (
                        <span className='absolute -top-2 -right-2 bg-red-500 text-white text-xs font-semibold rounded-full w-5 h-5 flex items-center justify-center'>
                            {totalItems}
                        </span>
                    )}
                </Link>

                {/* Clerk Auth Button (FIXED) */}
                {/* The broken <UserButton.MenuItems> block is GONE. */}
                {user ? (
                    <UserButton />
                ) : (
                    <button 
                        onClick={() => openSignIn()} 
                        className='px-4 py-2 bg-gray-800 text-white rounded-md hover:bg-gray-900 transition-colors'
                    >
                        Account
                    </button>
                )}
            </div>
        </nav>
    )
}

export default Navbar