'use client';

import { convertUnit, convertFromBytesToSensible } from "@/lib/unitConverter";
import { Label } from "./ui/label";
import { Progress, ProgressIndicator, ProgressTrack } from "./ui/progress";
import { Tooltip, TooltipContent, TooltipTrigger } from "./ui/tooltip";

export default function UsageBar({files, limit, alerts, hideText }:{files: {size: number}[], limit: number, alerts: number[] | undefined, hideText?: boolean}){
    const size = files.reduce((acc, file) => acc + Number(file.size), 0)
    const percentage = ((size / limit) * 100)
    const alert = alerts ? alerts[0] : undefined
    const convertedSize = convertFromBytesToSensible(size)
    const convertedLimit = convertFromBytesToSensible(limit)
    return <Tooltip>
        <TooltipTrigger render={<div>
        <div className="flex items-center justify-between">
            <Label>Storage</Label>
            {!hideText && <span className="text-sm text-muted-foreground">{limit ? `${percentage.toFixed(2)}%` : convertedSize.value == 0 ? "Empty" : convertedSize.value.toFixed(2) + convertedSize.unit.toLocaleUpperCase()}</span>}
        </div>
        {limit ? <Progress value={percentage} className="w-full mt-2">
            <ProgressTrack className="h-1">
                <ProgressIndicator className={`${percentage >= 100 ? 'bg-red-500' : alert && percentage >= alert ? 'bg-amber-500' : ""}`}/>
            </ProgressTrack>
        </Progress> : <></>}
        </div>}/>
        {limit ? <TooltipContent>
            <p>{limit ? `${convertUnit(size, "b", convertedLimit.unit).toFixed(3) + convertedLimit.unit.toUpperCase()} of ${convertedLimit.value.toFixed(2) + convertedLimit.unit.toLocaleUpperCase()} stored` : `No limit was set`}</p>
        </TooltipContent>
        : <></>}
    </Tooltip>
}