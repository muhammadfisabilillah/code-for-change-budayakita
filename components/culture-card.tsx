"use client";

import * as React from "react";
import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import { ArrowRight, ImageOff } from "lucide-react";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
} from "@/components/ui/card";
import { CultureTypeBadge } from "@/components/culture-type";
import type { CultureWithMeta } from "@/lib/types";

export function CultureCard({ culture }: { culture: CultureWithMeta }) {
  const alt =
    culture.accessibility?.alt_text?.trim() ||
    `${culture.name} — ${culture.type} from ${culture.country?.name ?? "the world"}`;

  return (
    <motion.div
      initial={{ opacity: 0, y: 12 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.2 }}
      transition={{ duration: 0.4, ease: "easeOut" }}
      className="h-full"
    >
      <Card className="group flex h-full flex-col overflow-hidden">
        <div className="relative aspect-[4/3] w-full overflow-hidden bg-muted">
          {culture.media_url ? (
            <Image
              src={culture.media_url}
              alt={alt}
              fill
              sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 33vw"
              className="object-cover transition-transform duration-500 group-hover:scale-105 motion-reduce:transform-none motion-reduce:transition-none"
            />
          ) : (
            <div
              className="flex h-full w-full items-center justify-center text-muted-foreground"
              role="img"
              aria-label={alt}
            >
              <ImageOff className="size-10" aria-hidden="true" />
            </div>
          )}
          <div className="absolute left-3 top-3">
            <CultureTypeBadge type={culture.type} />
          </div>
        </div>

        <CardHeader className="pb-2">
          <div className="flex items-center gap-2 text-sm text-muted-foreground">
            {culture.country?.flag_url ? (
              // eslint-disable-next-line @next/next/no-img-element
              <img
                src={culture.country.flag_url}
                alt=""
                aria-hidden="true"
                className="h-4 w-6 rounded-sm object-cover ring-1 ring-border"
              />
            ) : null}
            <span>{culture.country?.name ?? "Unknown"}</span>
          </div>
          <h3 className="text-lg font-semibold leading-tight tracking-tight">
            <Link
              href={`/cultures/${culture.id}`}
              className="rounded underline-offset-4 hover:underline focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background"
            >
              {culture.name}
            </Link>
          </h3>
        </CardHeader>

        <CardContent className="flex-1">
          <p className="line-clamp-3 text-sm text-muted-foreground">
            {culture.detail_desc}
          </p>
        </CardContent>

        <CardFooter>
          <Link
            href={`/cultures/${culture.id}`}
            className="inline-flex items-center gap-1.5 rounded-md text-sm font-medium text-primary underline-offset-4 hover:underline focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background"
          >
            Explore
            <ArrowRight className="size-4" aria-hidden="true" />
          </Link>
        </CardFooter>
      </Card>
    </motion.div>
  );
}