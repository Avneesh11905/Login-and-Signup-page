'use client'
import { Button } from '@mantine/core'
import { useRouter } from 'next/navigation';
import React from 'react'

export const HomeButton = () => {
    const router = useRouter();
  return (
    <Button onClick={()=>{router.push(`/`)}} pos='fixed' m={20}>Home</Button>
  )
}
