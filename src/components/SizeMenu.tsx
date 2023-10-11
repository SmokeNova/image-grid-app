import { Button, Text } from "@mantine/core";
import { useClickOutside } from "@mantine/hooks";
import { SettingsIcon } from "lucide-react";
import { useState } from "react";

export default function SizeMenu({
  setCols,
}: {
  setCols: (n: 1 | 2 | 3) => void;
}) {
  const [opened, setOpened] = useState(false);
  const ref = useClickOutside(() => setOpened(false));

  return (
    <div className="relative">
      <Button
        size="compact-lg"
        className="bg-slate-200 hover:bg-white text-slate-800 transition-normal"
        onClick={() => setOpened((prev) => !prev)}
      >
        <SettingsIcon />
      </Button>

      {opened && (
        <div
          ref={ref}
          className="w-[150px] bg-white pt-3 flex flex-col gap-2 rounded absolute top-10 right-0"
        >
          <Text size="xs" className="px-3">
            Card Size
          </Text>
          <Button
            size="compact-sm"
            className="text-slate-700 flex justify-start hover:bg-slate-200 px-3"
            onClick={() => setCols(1)}
          >
            Small
          </Button>
          <Button
            size="compact-sm"
            className="text-slate-700 flex justify-start hover:bg-slate-200 px-3"
            onClick={() => setCols(2)}
          >
            Medium
          </Button>
          <Button
            size="compact-sm"
            className="text-slate-700 flex justify-start hover:bg-slate-200 px-3"
            onClick={() => setCols(3)}
          >
            Large
          </Button>
        </div>
      )}
    </div>
  );
}
