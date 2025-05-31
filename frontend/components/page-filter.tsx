"use client";

import { useState } from "react";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import {
  Select,
  SelectTrigger,
  SelectValue,
  SelectContent,
  SelectItem,
} from "@/components/ui/select";
import { Checkbox } from "@/components/ui/checkbox";
import {
  Collapsible,
  CollapsibleTrigger,
  CollapsibleContent,
} from "@/components/ui/collapsible";
import { Slider } from "@/components/ui/slider";
import { RotateCcw, ChevronDown } from "lucide-react";
import { useRouter } from "next/navigation";
import { useSearchParams } from "next/navigation";

type Genre =
  | "Action"
  | "Adventure"
  | "Animation"
  | "Comedy"
  | "Crime"
  | "Documentary"
  | "Drama"
  | "Family"
  | "Fantasy"
  | "History"
  | "Horror"
  | "Music"
  | "Mystery"
  | "Romance"
  | "Science Fiction"
  | "TV Movie"
  | "Thriller"
  | "War"
  | "Western"
  | "Action & Adventure"
  | "Kids"
  | "News"
  | "Reality"
  | "Sci-Fi & Fantasy"
  | "Soap"
  | "Talk"
  | "War & Politics";

const allGenres: Genre[] = [
  "Action",
  "Adventure",
  "Animation",
  "Comedy",
  "Crime",
  "Documentary",
  "Drama",
  "Family",
  "Fantasy",
  "History",
  "Horror",
  "Music",
  "Mystery",
  "Romance",
  "Science Fiction",
  "TV Movie",
  "Thriller",
  "War",
  "Western",
  "Action & Adventure",
  "Kids",
  "News",
  "Reality",
  "Sci-Fi & Fantasy",
  "Soap",
  "Talk",
  "War & Politics",
];

export default function PageFilter({ type }: { type: string }) {
  const router = useRouter();
  const searchParams = useSearchParams();

  // Initial URL params
  const [sortBy, setSortBy] = useState(
    searchParams.get("sortBy") || "popularity.desc"
  );

  const [genres, setGenres] = useState<Genre[]>(() => {
    const genreParam = searchParams.get("genres");
    return genreParam ? (genreParam.split(",") as Genre[]) : [];
  });
  const [rating, setRating] = useState(() => {
    const ratingParam = searchParams.get("rating");
    return ratingParam ? parseFloat(ratingParam) : 0;
  });
  const [year, setYear] = useState(() => {
    const yearParam = searchParams.get("year");
    return yearParam ? parseInt(yearParam) : 2025;
  });
  const [language, setLanguage] = useState(
    searchParams.get("language") || "en"
  );

  const applyFilters = () => {
    const params = new URLSearchParams();

    if (sortBy !== "popularity.desc") params.set("sortBy", sortBy);
    if (genres.length > 0) params.set("genres", genres.join(","));
    if (rating > 0) params.set("rating", rating.toString());
    if (year !== 2025) params.set("year", year.toString());
    if (language !== "en") params.set("language", language);

    const queryString = params.toString();
    router.push(`/${type}${queryString ? `?${queryString}` : ""}`);
  };

  const reset = () => {
    setSortBy("popularity.desc");
    setGenres([]);
    setRating(0);
    setYear(2025);
    setLanguage("en");

    // clear URL params
    router.push(`/${type}`);
  };

  return (
    <aside className="sticky top-4 h-fit w-64 shrink-0">
      <Card className="bg-[#0B304F] border-none text-white">
        {/* ---------- Title & reset ---------- */}
        <CardHeader className="flex flex-row items-center justify-between pb-2">
          <CardTitle className="text-lg text-white">Filters</CardTitle>
          <button
            onClick={reset}
            title="Reset"
            className="rounded p-1 text-gray-300 transition hover:bg-white/10 hover:text-white">
            <RotateCcw size={16} />
          </button>
        </CardHeader>

        <CardContent className="space-y-6">
          {/* ---------- Sort By ---------- */}
          <div className="space-y-1">
            <h4 className="text-sm font-medium text-white">Sort By</h4>
            <Select value={sortBy} onValueChange={setSortBy}>
              <SelectTrigger className="h-9 bg-transparent border-gray-600 text-white">
                <SelectValue placeholder="Popularity" />
              </SelectTrigger>
              <SelectContent className="bg-[#0B304F] border-gray-600">
                <SelectItem
                  value="popularity.desc"
                  className="text-white focus:bg-white/10 focus:text-white">
                  Popularity
                </SelectItem>
                <SelectItem
                  value="vote_average.desc"
                  className="text-white focus:bg-white/10 focus:text-white">
                  Rating (high → low)
                </SelectItem>
                <SelectItem
                  value="primary_release_date.desc"
                  className="text-white focus:bg-white/10 focus:text-white">
                  Newest
                </SelectItem>
              </SelectContent>
            </Select>
          </div>

          {/* ---------- Genres ---------- */}
          <Collapsible>
            <div className="flex items-center justify-between">
              <h4 className="text-sm font-medium text-white">Genres</h4>
              <CollapsibleTrigger asChild>
                <button className="text-gray-300 hover:text-white group">
                  <div className="transition-transform duration-200 group-data-[state=open]:rotate-180">
                    <ChevronDown className="h-4 w-4" />
                  </div>
                </button>
              </CollapsibleTrigger>
            </div>

            <CollapsibleContent>
              <ul className="grid grid-cols-2 gap-x-2 gap-y-1 pt-2">
                {allGenres.map((g) => {
                  const checked = genres.includes(g);
                  return (
                    <li key={g} className="flex items-center gap-2">
                      <Checkbox
                        id={g}
                        checked={checked}
                        onCheckedChange={() =>
                          setGenres((prev) =>
                            checked ? prev.filter((x) => x !== g) : [...prev, g]
                          )
                        }
                        className="border-gray-500 data-[state=checked]:bg-white data-[state=checked]:text-[#0B304F]">
                        x
                      </Checkbox>
                      <label
                        htmlFor={g}
                        className="cursor-pointer select-none text-xs text-gray-300">
                        {g}
                      </label>
                    </li>
                  );
                })}
              </ul>
            </CollapsibleContent>
          </Collapsible>

          {/* ---------- Rating slider ---------- */}
          <Collapsible>
            <div className="flex items-center justify-between">
              <h4 className="text-sm font-medium text-white">Rating</h4>
              <CollapsibleTrigger asChild>
                <button className="text-gray-300 hover:text-white group">
                  <div className="transition-transform duration-200 group-data-[state=open]:rotate-180">
                    <ChevronDown className="h-4 w-4" />
                  </div>
                </button>
              </CollapsibleTrigger>
            </div>

            <CollapsibleContent>
              <Slider
                min={0}
                max={10}
                step={0.5}
                value={[rating]}
                onValueChange={([v]) => setRating(v)}
                className="mt-4"
              />
              <div className="flex justify-between text-[11px] pt-1 text-gray-400">
                <span>0</span>
                <span>Current: {rating}</span>
                <span>10</span>
              </div>
            </CollapsibleContent>
          </Collapsible>

          {/* ---------- Year slider ---------- */}
          <Collapsible>
            <div className="flex items-center justify-between">
              <h4 className="text-sm font-medium text-white">Release Year</h4>
              <CollapsibleTrigger asChild>
                <button className="text-gray-300 hover:text-white group">
                  <div className="transition-transform duration-200 group-data-[state=open]:rotate-180">
                    <ChevronDown className="h-4 w-4" />
                  </div>
                </button>
              </CollapsibleTrigger>
            </div>

            <CollapsibleContent>
              <Slider
                min={1900}
                max={2025}
                step={1}
                value={[year]}
                onValueChange={([v]) => setYear(v)}
                className="mt-4"
              />
              <div className="flex justify-between text-[11px] pt-1 text-gray-400">
                <span>1970</span>
                <span>Current: {year}</span>
                <span>2025</span>
              </div>
            </CollapsibleContent>
          </Collapsible>
          {/* ---------- Apply button ---------- */}
          <Button
            onClick={applyFilters}
            className="w-full bg-white text-[#0B304F] hover:bg-white/90">
            Apply Filters
          </Button>
        </CardContent>
      </Card>
    </aside>
  );
}
