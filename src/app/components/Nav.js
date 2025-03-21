'use client'
import { signOut, useSession } from 'next-auth/react'
import Link from 'next/link'
import React from 'react'

function Nav() {
    return (
        <div>
            <div className='flex justify-between items-center p-4'>
                <div>
                    <h1><strong>NAVBAR</strong></h1>
                </div>
                <div className='justify-between'>
                    <Link className='space-x-10' href="/register">Register</Link>
                    < button className='ml-5' onClick={() => signOut()}>Logout</button>
                </div>
            </div>
        </div>
    )
}

export default Nav