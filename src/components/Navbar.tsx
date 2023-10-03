import { Link } from "react-router-dom";
import { Button, Input } from "@mantine/core";
import { UploadIcon } from "lucide-react";

export default function Navbar() {
  return (
    <div className="w-full border-b border-b-slate-700/20 shadow-lg py-3 px-3 flex items-center gap-6 text-slate-700">
      <Link to="/">
        <img className="w-10" src="./vite.svg" alt="logo" />
      </Link>

      <form className="grow">
        <Input
          type="text"
          name="searchterm"
          placeholder="Search for high-resolution images"
          py={2}
          px={3}
          radius="xl"
          className="w-full placeholder:text-slate-500 placeholder:text-sm"
          required
        />
      </form>

      <Link
        to="/explore"
        className="text-slate-700/70 hover:text-slate-700 transition-normal font-semibold"
      >
        Explore
      </Link>
      <Link
        to="/advertise"
        className="text-slate-700/70 hover:text-slate-700 transition-normal font-semibold"
      >
        Advertise
      </Link>
      <Link
        to="/upgrade"
        className="bg-gradient-to-r from-rose-400 via-fuchsia-500 to-indigo-500 text-transparent bg-clip-text font-semibold"
      >
        Unsplash+
      </Link>

      <Button
        radius="sm"
        leftSection={<UploadIcon size={20} />}
        className="border border-slate-700/30 text-slate-700/60 hover:border-slate-700 hover:text-slate-700 transition-normal"
      >
        Upload
      </Button>
    </div>
  );
}
