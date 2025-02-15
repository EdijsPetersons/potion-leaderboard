'use client'

import { Calendar } from "lucide-react";
import { Button } from "@/components/ui/button";
import { ToggleGroup, ToggleGroupItem } from "@/components/ui/toggle-group";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuRadioGroup,
  DropdownMenuRadioItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { availableTimeframes } from "@/constants/timeframes";

interface TimeframeSelectorProps {
  value: string;
  onValueChange: (value: string) => void;
}

export function TimeframeSelector({ value, onValueChange }: TimeframeSelectorProps) {
  return (
    <>
      <ToggleGroup
        type="single"
        value={value}
        onValueChange={onValueChange}
        className="hidden lg:flex"
      >
        {availableTimeframes.map((timeframe) => (
          <ToggleGroupItem
            value={timeframe.value}
            aria-label={`Toggle ${timeframe.label}`}
            key={timeframe.value}
            className="rounded-full w-28"
          >
            {timeframe.label}
          </ToggleGroupItem>
        ))}
      </ToggleGroup>
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button
            variant="outline"
            size="icon"
            className="data-[state=open]:bg-accent lg:hidden"
          >
            <Calendar className="w-4 h-4" />
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent
          className="w-36 bg-background"
          side="bottom"
          align="end"
        >
          <DropdownMenuRadioGroup
            value={value}
            onValueChange={onValueChange}
          >
            {availableTimeframes.map((timeframe) => (
              <DropdownMenuRadioItem
                key={timeframe.value}
                value={timeframe.value}
                className="rounded-full w-full"
              >
                {timeframe.label}
              </DropdownMenuRadioItem>
            ))}
          </DropdownMenuRadioGroup>
        </DropdownMenuContent>
      </DropdownMenu>
    </>
  );
}