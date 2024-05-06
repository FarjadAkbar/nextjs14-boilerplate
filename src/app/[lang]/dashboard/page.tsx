"use client"
import React from 'react';
import { signOut } from "next-auth/react"
import { Button } from '@/components/ui/button';

export default function Dashboard() {
  return (
    <>
     <h1>Hello</h1>
     <Button onClick={() => signOut()}>Logout</Button>
    </>    
  )
}
