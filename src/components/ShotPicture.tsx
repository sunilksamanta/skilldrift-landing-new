import { getImageProps } from "next/image";

/*
 * A product screenshot with art direction: the wide desktop frame above
 * 760px, and a portrait frame built from the phone-size app screens below it,
 * so a phone visitor sees the app as it looks on a phone. Without a mobile
 * source it falls back to the desktop frame everywhere.
 */
type Props = {
  desktop: string;
  mobile?: string;
  alt: string;
  priority?: boolean;
  sizes?: string;
};

export default function ShotPicture({ desktop, mobile, alt, priority, sizes }: Props) {
  // A <picture> only fetches the source it picks, so the hero can load
  // eagerly with a high fetch priority without pulling both frames.
  const common = {
    alt,
    sizes: sizes ?? "(max-width: 760px) 100vw, 50vw",
    ...(priority ? { loading: "eager" as const, fetchPriority: "high" as const } : {}),
  };
  const { props: d } = getImageProps({ ...common, src: desktop, width: 1800, height: 1290 });
  if (!mobile) {
    // eslint-disable-next-line jsx-a11y/alt-text
    return <img {...d} style={{ width: "100%", height: "auto", display: "block" }} />;
  }
  const { props: m } = getImageProps({ ...common, src: mobile, width: 1080, height: 1350 });
  const { srcSet: desktopSet, ...rest } = d;
  void rest;
  return (
    <picture>
      <source media="(min-width: 761px)" srcSet={desktopSet ?? d.src} width={1800} height={1290} />
      {/* eslint-disable-next-line jsx-a11y/alt-text */}
      <img {...m} style={{ width: "100%", height: "auto", display: "block" }} />
    </picture>
  );
}
