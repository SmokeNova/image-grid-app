import { FormEvent, useState } from "react";
import { SearchIcon } from "lucide-react";
import { useNavigate } from "react-router-dom";

export default function Searchbox({ ...props }) {
  const [searchTerm, setSearchTerm] = useState("");
  const navigate = useNavigate();

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    navigate(`/search/${searchTerm}`);
    setSearchTerm("");
  };

  return (
    <form className="grow" onSubmit={handleSubmit}>
      <div
        className={`w-full flex gap-2 items-center bg-slate-700/10 px-4 py-2 rounded-full border focus-within:bg-white focus-within:border-slate-700/20 hover:border-slate-700/20`}
        {...props}
      >
        <button type="submit">
          <SearchIcon size={18} />
        </button>
        <input
          type="text"
          placeholder="Search high-resolution images"
          required
          className="grow focus:outline-none focus:border-none focus:ring-0 bg-transparent"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
      </div>
    </form>
  );
}
