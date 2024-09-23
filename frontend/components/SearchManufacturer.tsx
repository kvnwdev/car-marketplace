"use client";

import Image from "next/image";
import { Fragment, useState } from "react";
import {
  Combobox,
  ComboboxInput,
  ComboboxOption,
  ComboboxOptions,
  Transition,
} from "@headlessui/react";

import { manufacturers } from "@/constants";
import { SearchManufacturerProps } from "@/types";

function SearchManufacturer({
  manufacturer,
  setManufacturer,
}: SearchManufacturerProps) {
  const [query, setQuery] = useState("");

  const filteredManufacturers =
    query === ""
      ? manufacturers
      : manufacturers.filter((item) =>
          item
            .toLowerCase()
            .replace(/\s+/g, "")
            .includes(query.toLowerCase().replace(/\s+/g, ""))
        );

  return (
    <div className="search-manufacturer">
      <Combobox
        value={manufacturer}
        onChange={setManufacturer}
        onClose={() => setQuery("")}
      >
        <div className="relative w-full">
          <Image
            src="/car-logo.svg"
            width={20}
            height={20}
            className="absolute top-[14px] ml-4"
            alt="car logo"
          />
          <ComboboxInput
            className="search-manufacturer__input"
            aria-label="Manufacturer"
            displayValue={(item: string) => item}
            onChange={(event) => setQuery(event.currentTarget.value)}
            placeholder="Manufacturer name..."
          />

          <Transition
            as={Fragment}
            leave="transition ease-in duration-100"
            leaveFrom="opacity-100"
            leaveTo="opacity-0"
            afterLeave={() => setQuery("")}
          >
            <ComboboxOptions
              className="absolute mt-1 max-h-60 w-full overflow-auto rounded-md bg-white py-1 text-base shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none sm:text-sm empty:invisible"
              static
            >
              {filteredManufacturers.length == 0 && query != "" ? (
                <ComboboxOption
                  value={query}
                  className="search-manufacturer__option"
                >
                  Create &ldquo;{query}&ldquo;
                </ComboboxOption>
              ) : (
                filteredManufacturers.map((item) => (
                  <ComboboxOption
                    key={item}
                    className={
                      "relative search-manufacturer__option text-gray-900 data-[focus]:bg-primary-blue data-[focus]:text-white"
                    }
                    value={item}
                  >
                    {({ selected }) => (
                      <>
                        <span
                          className={`block truncate ${
                            selected ? "font-medium" : "font-normal"
                          }`}
                        >
                          {item}
                        </span>

                        {selected ? (
                          <span className="absolute inset-y-0 left-0 flex items-center pl-3 text-white data-[focus]:text-pribg-primary-purple"></span>
                        ) : null}
                      </>
                    )}
                  </ComboboxOption>
                ))
              )}
            </ComboboxOptions>
          </Transition>
        </div>
      </Combobox>
    </div>
  );
}

export default SearchManufacturer;
