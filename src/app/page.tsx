import Calendar31  from "@/components/calendar-31"

export default function Home() {
  return (
    <div className="grid grid-rows-[20px_1fr_20px] 
                    items-center justify-items-center min-h-screen p-8 pb-20  
                    font-[family-name:var(--font-geist-sans)]">
      <main className="flex flex-col gap-[32px] row-start-2 items-center sm:items-start">
        <Calendar31></Calendar31>
      </main>
    </div>
  );
}
