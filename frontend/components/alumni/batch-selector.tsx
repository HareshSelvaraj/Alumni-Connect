"use client"

import { useEffect, useMemo, useState } from "react"
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { alumniData } from "@/lib/data-service"

type Batch = { startYear: number; endYear: number }

function getAvailableBatches(): Batch[] {
  const years = Array.from(new Set(alumniData.map(a => parseInt(a.graduationYear, 10)).filter(Boolean)))
  return years.map(end => ({ startYear: end - 4, endYear: end })).sort((a,b) => b.endYear - a.endYear)
}

export default function AlumniBatchSelector({
  open,
  onClose,
  onSave,
}: {
  open: boolean
  onClose: () => void
  onSave: (batch: Batch) => void
}) {
  const batches = useMemo(() => getAvailableBatches(), [])
  const [mode, setMode] = useState<"select"|"manual">("select")
  const [selected, setSelected] = useState<string>("__NONE__")
  const [startYear, setStartYear] = useState("")
  const [endYear, setEndYear] = useState("")
  const [error, setError] = useState("")

  useEffect(() => { if (!open) { setError("") } }, [open])

  function handleSave() {
    setError("")
    if (mode === "select") {
      if (!selected || selected === "__NONE__") { setError("Please select a batch."); return }
      const [s,e] = selected.split("-").map(n => parseInt(n,10))
      onSave({ startYear: s, endYear: e })
      return
    }
    const s = parseInt(startYear, 10)
    const e = parseInt(endYear, 10)
    if (isNaN(s) || isNaN(e) || s >= e || e - s !== 4) { setError("Enter a valid 4-year range (e.g., 2019–2023). "); return }
    onSave({ startYear: s, endYear: e })
  }

  return (
    <Dialog open={open} onOpenChange={(o)=>{ if(!o) onClose() }}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Select your batch</DialogTitle>
        </DialogHeader>
        <div className="space-y-4">
          <div className="flex gap-2">
            <Button variant={mode === "select" ? "default" : "outline"} onClick={()=>setMode("select")}>Choose</Button>
            <Button variant={mode === "manual" ? "default" : "outline"} onClick={()=>setMode("manual")}>Enter manually</Button>
          </div>
          {mode === "select" ? (
            <Select value={selected} onValueChange={setSelected}>
              <SelectTrigger className="w-full"><SelectValue placeholder="Select batch" /></SelectTrigger>
              <SelectContent>
                {batches.map(b => (
                  <SelectItem key={`${b.startYear}-${b.endYear}`} value={`${b.startYear}-${b.endYear}`}>{b.startYear} - {b.endYear}</SelectItem>
                ))}
              </SelectContent>
            </Select>
          ) : (
            <div className="grid grid-cols-2 gap-3">
              <Input placeholder="Start year (e.g., 2019)" value={startYear} onChange={e=>setStartYear(e.target.value)} />
              <Input placeholder="End year (e.g., 2023)" value={endYear} onChange={e=>setEndYear(e.target.value)} />
            </div>
          )}
          {error && <div className="text-xs text-red-600">{error}</div>}
          <div className="flex justify-end gap-2">
            <Button variant="outline" onClick={onClose}>Cancel</Button>
            <Button onClick={handleSave}>Save</Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  )
}


