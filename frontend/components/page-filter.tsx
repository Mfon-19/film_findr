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
  | "Thriller"
  | "War"
  | "Western";

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
  "Thriller",
  "War",
  "Western",
];

export default function PageFilter() {
  const [sortBy, setSortBy] = useState("popularity.desc");
  const [genres, setGenres] = useState<Genre[]>([]);
  const [rating, setRating] = useState(0); // 0‒10
  const [year, setYear] = useState(2024); // 1970‒2024
  const [language, setLanguage] = useState("en");

  const reset = () => {
    setSortBy("popularity.desc");
    setGenres([]);
    setRating(0);
    setYear(2024);
    setLanguage("en");
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
                <SelectItem
                  value="revenue.desc"
                  className="text-white focus:bg-white/10 focus:text-white">
                  Box-office
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
                min={1970}
                max={2024}
                step={1}
                value={[year]}
                onValueChange={([v]) => setYear(v)}
                className="mt-4"
              />
              <div className="flex justify-between text-[11px] pt-1 text-gray-400">
                <span>1970</span>
                <span>2024</span>
              </div>
            </CollapsibleContent>
          </Collapsible>

          {/* ---------- Language ---------- */}
          <Collapsible>
            <div className="flex items-center justify-between">
              <h4 className="text-sm font-medium text-white">Language</h4>
              <CollapsibleTrigger asChild>
                <button className="text-gray-300 hover:text-white group">
                  <div className="transition-transform duration-200 group-data-[state=open]:rotate-180">
                    <ChevronDown className="h-4 w-4" />
                  </div>
                </button>
              </CollapsibleTrigger>
            </div>
            <CollapsibleContent>
              <Select value={language} onValueChange={setLanguage}>
                <SelectTrigger className="mt-2 h-9 bg-transparent border-gray-600 text-white">
                  <SelectValue placeholder="English" />
                </SelectTrigger>
                <SelectContent className="bg-[#0B304F] border-gray-600">
                  <SelectItem
                    value="en"
                    className="text-white focus:bg-white/10 focus:text-white">
                    English
                  </SelectItem>
                  <SelectItem
                    value="fr"
                    className="text-white focus:bg-white/10 focus:text-white">
                    French
                  </SelectItem>
                  <SelectItem
                    value="es"
                    className="text-white focus:bg-white/10 focus:text-white">
                    Spanish
                  </SelectItem>
                  {/* …add the languages you care about */}
                </SelectContent>
              </Select>
            </CollapsibleContent>
          </Collapsible>

          {/* ---------- Apply button ---------- */}
          <Button
            className="w-full bg-white text-[#0B304F] hover:bg-white/90">
            Apply Filters
          </Button>
        </CardContent>
      </Card>
    </aside>
  );
}
