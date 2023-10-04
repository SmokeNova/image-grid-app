import { SearchIcon } from "lucide-react";

export default function Searchbox({...props}) {
  return (
    <form className="grow">
      <div className={`w-full flex gap-2 items-center bg-slate-700/10 px-4 py-2 rounded-full border focus-within:bg-white focus-within:border-slate-700/20 hover:border-slate-700/20`} {...props}>
        <button type="submit">
          <SearchIcon size={18} />
        </button>
        <input
          type="text"
          placeholder="Search high-resolution images"
          required
          className="grow focus:outline-none focus:border-none focus:ring-0 bg-transparent"
        />
      </div>
    </form>
  );
}
