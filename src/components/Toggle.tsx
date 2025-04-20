import React from 'react'
import { SidebarProvider, SidebarTrigger } from './ui/sidebar'

function Toggle() {
    return (
        <SidebarProvider>

            <SidebarTrigger />
        </SidebarProvider>


    )
}

export default Toggle