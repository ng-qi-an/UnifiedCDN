"use client"

import { createColumnHelper } from "@tanstack/react-table"

import { type DataTableFeatures } from "../features"
import { Files } from "@/lib/schema/schemaTypes"
import { DropdownMenu, DropdownMenuContent, DropdownMenuGroup, DropdownMenuItem, DropdownMenuLabel, DropdownMenuSeparator, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import { Button } from "@/components/ui/button"
import { ExternalLink, MoreHorizontal, Pen, Trash } from "lucide-react"
import { convertFromBytesToSensible } from "@/lib/unitConverter"
import { mimeToIcon, mimeToReadable } from "@/lib/fileTypes"


// Use `accessor` for data columns and `display` for columns without one.
const columnHelper = createColumnHelper<DataTableFeatures, Files>()

export const filesColumns = columnHelper.columns([
    columnHelper.accessor("name", {
        header: "Name",
        cell: ({row}) => {
            const name = row.original.name
            const Icon = mimeToIcon(row.original.contentType)
            return <div className="flex items-center">
                <Icon className="size-4 mr-2"/>
                {name}
            </div>
        }
    }),
    columnHelper.accessor("contentType", {
        header: "Type",
        cell: ({row}) => {
            const contentType = row.original.contentType
            return mimeToReadable(contentType)
        }
    }),
    columnHelper.accessor("size", {
        header: "Size",
        cell: ({row}) => {
            const size = convertFromBytesToSensible(row.original.size)
            return size.value.toFixed(2) + size.unit.toUpperCase()
        }
    }),
    columnHelper.accessor("createdAt", {
        header: "Created at",
        cell: ({row}) => {
            const createdAt = new Date(row.original.createdAt)
            return createdAt.toLocaleString(undefined, {dateStyle: "medium", timeStyle: "short"})
        }
    }),
    columnHelper.accessor("updatedAt", {
        header: "Last modified",
        cell: ({row}) => {
            const updatedAt = new Date(row.original.updatedAt)
            return updatedAt.toLocaleString(undefined, {dateStyle: "medium", timeStyle: "short"})
        }
    }),
    columnHelper.display({
        id: "actions",
        cell: ({ row }) => {
        const payment = row.original
        return <div className="flex justify-end w-full">
            <DropdownMenu>
                <DropdownMenuTrigger render={<Button variant="ghost" size="icon-sm" className="ml-auto">
                    <MoreHorizontal />
                </Button>}/>
                <DropdownMenuContent align="end">
                    <DropdownMenuGroup>
                        <DropdownMenuLabel>Actions</DropdownMenuLabel>
                        <DropdownMenuItem><ExternalLink/> Open</DropdownMenuItem>
                        <DropdownMenuItem><Pen/> Rename</DropdownMenuItem>
                        <DropdownMenuSeparator/>
                        <DropdownMenuItem variant="destructive"><Trash/>Delete</DropdownMenuItem>
                    </DropdownMenuGroup>
                </DropdownMenuContent>
            </DropdownMenu>
        </div>
        },
    }),
])