import Link from "next/link";

export default async function Home() {
  return (
    <div className="container flex flex-col items-center justify-center gap-12 px-4 py-16 ">
      <h1 className="text-5xl font-extrabold tracking-tight sm:text-[5rem]">
        <span className="text-[hsl(57,100%,80%)]">AOL</span> Database
      </h1>
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 md:gap-8">
        <Link
          className="flex max-w-xs flex-col gap-4 rounded-xl bg-white/10 p-4 hover:bg-white/20"
          href="/maintenance"
        >
          <h3 className="text-2xl font-bold">Data Maintenance →</h3>
          <div className="text-lg">
            Lakukan pengolahan data seperti select, insert, update, dan delete.
          </div>
        </Link>
        <Link
          className="flex max-w-xs flex-col gap-4 rounded-xl bg-white/10 p-4 hover:bg-white/20"
          href="/report"
        >
          <h3 className="text-2xl font-bold">Report →</h3>
          <div className="text-lg">
            Dapatkan laporan mengenai data yang tersimpan.
          </div>
        </Link>
      </div>
      <p className="mt-8 text-center text-sm">
        Anggota
        <br />
        Samuel Benediktus Meliala - 2602158355 <br />
        Stanislaus Kanaya Jerry Febriano - 2602187664 <br />
        Muhammad Ikhsan Nurasid - 2602168053 <br />
        Muhammad Haekal Aditya Rahmadyan - 2602192071
      </p>
    </div>
  );
}
