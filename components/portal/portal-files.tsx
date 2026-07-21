'use client'

import { motion } from 'framer-motion'
import { useState, useActionState, useEffect } from 'react'
import {
  Search, Download, FileImage, FileText, FileVideo,
  Folder, Grid, List, File as FileIcon, Plus, X, ExternalLink,
} from 'lucide-react'
import { Button } from '@/components/ui/button'
import { addDeliverable, type AddDeliverableState } from '@/lib/actions/portal'
import type { getPortalFilesList } from '@/lib/queries/portal'

type FilesData = Awaited<ReturnType<typeof getPortalFilesList>>

const typeColors: Record<string, string> = {
  figma: 'text-violet-500 bg-violet-500/10',
  pdf: 'text-red-500 bg-red-500/10',
  zip: 'text-amber-500 bg-amber-500/10',
  video: 'text-blue-500 bg-blue-500/10',
  image: 'text-emerald-500 bg-emerald-500/10',
  file: 'text-muted-foreground bg-muted',
}

const typeIcons: Record<string, React.ElementType> = {
  figma: FileImage, pdf: FileText, zip: FileIcon, video: FileVideo, image: FileImage, file: FileIcon,
}

const initialState: AddDeliverableState = {}

function AddFileModal({
  onClose, clientId, projects,
}: {
  onClose: () => void
  clientId: string
  projects: { id: string; name: string }[]
}) {
  const [state, formAction, pending] = useActionState(addDeliverable, initialState)

  useEffect(() => {
    if (state.success) onClose()
  }, [state.success, onClose])

  return (
    <div className="fixed inset-0 z-[60] flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm">
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        className="w-full max-w-md bg-card border border-border rounded-3xl p-6 relative"
      >
        <button onClick={onClose} className="absolute top-5 right-5 text-muted-foreground hover:text-foreground" aria-label="Close">
          <X className="w-5 h-5" />
        </button>
        <h3 className="text-lg font-bold mb-1">Add a File Link</h3>
        <p className="text-xs text-muted-foreground mb-4">
          No file storage is connected yet, so this links out to wherever the file already lives (Drive, Figma, etc.).
        </p>
        <form action={formAction} className="space-y-3">
          <input type="hidden" name="clientId" value={clientId} />
          <input name="name" required placeholder="File name" className="w-full px-4 py-2.5 rounded-xl border border-border bg-background text-sm focus:outline-none focus:ring-2 focus:ring-primary/30" />
          <input name="url" type="url" required placeholder="https://..." className="w-full px-4 py-2.5 rounded-xl border border-border bg-background text-sm focus:outline-none focus:ring-2 focus:ring-primary/30" />
          <div className="grid grid-cols-2 gap-3">
            <select name="fileType" defaultValue="file" className="px-4 py-2.5 rounded-xl border border-border bg-background text-sm focus:outline-none focus:ring-2 focus:ring-primary/30">
              <option value="pdf">PDF</option>
              <option value="figma">Figma</option>
              <option value="zip">Zip</option>
              <option value="video">Video</option>
              <option value="image">Image</option>
              <option value="file">Other</option>
            </select>
            <select name="projectId" defaultValue="" className="px-4 py-2.5 rounded-xl border border-border bg-background text-sm focus:outline-none focus:ring-2 focus:ring-primary/30">
              <option value="">No project</option>
              {projects.map((p) => <option key={p.id} value={p.id}>{p.name}</option>)}
            </select>
          </div>
          {state.error && <p className="text-sm text-destructive">{state.error}</p>}
          <Button type="submit" className="w-full" disabled={pending}>
            {pending ? 'Adding…' : 'Add File Link'}
          </Button>
        </form>
      </motion.div>
    </div>
  )
}

export function PortalFiles({
  data, clientId, projects,
}: {
  data: FilesData
  clientId: string
  projects: { id: string; name: string }[]
}) {
  const [search, setSearch] = useState('')
  const [view, setView] = useState<'grid' | 'list'>('list')
  const [showAdd, setShowAdd] = useState(false)

  const filtered = data.files.filter((f) =>
    f.name.toLowerCase().includes(search.toLowerCase()) ||
    f.project.toLowerCase().includes(search.toLowerCase())
  )

  return (
    <div className="space-y-5 max-w-4xl">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-xl font-bold">Files</h2>
          <p className="text-sm text-muted-foreground">All shared files and deliverables from your projects.</p>
        </div>
        <Button size="sm" className="gap-1.5" onClick={() => setShowAdd(true)}>
          <Plus className="w-4 h-4" /> Add File
        </Button>
      </div>

      {/* Folders */}
      {data.folders.length > 0 && (
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
          {data.folders.map((folder, i) => (
            <motion.div
              key={folder.name}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.04 }}
              className="flex items-center gap-3 p-4 bg-card border border-border rounded-2xl"
            >
              <div className="w-9 h-9 rounded-xl bg-primary/10 flex items-center justify-center shrink-0">
                <Folder className="w-4.5 h-4.5 text-primary" />
              </div>
              <div className="min-w-0">
                <p className="text-xs font-semibold truncate">{folder.name}</p>
                <p className="text-[10px] text-muted-foreground">{folder.count} files</p>
              </div>
            </motion.div>
          ))}
        </div>
      )}

      {/* Search & View Toggle */}
      <div className="flex gap-3">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
          <input
            type="text"
            placeholder="Search files..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full pl-9 pr-4 py-2.5 bg-card border border-border rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-primary/30"
          />
        </div>
        <div className="flex gap-1 bg-muted/50 rounded-xl p-1">
          <button
            onClick={() => setView('list')}
            className={`p-2 rounded-lg transition-colors ${view === 'list' ? 'bg-card text-foreground shadow-sm' : 'text-muted-foreground hover:text-foreground'}`}
            aria-label="List view"
          >
            <List className="w-4 h-4" />
          </button>
          <button
            onClick={() => setView('grid')}
            className={`p-2 rounded-lg transition-colors ${view === 'grid' ? 'bg-card text-foreground shadow-sm' : 'text-muted-foreground hover:text-foreground'}`}
            aria-label="Grid view"
          >
            <Grid className="w-4 h-4" />
          </button>
        </div>
      </div>

      {/* Files */}
      {filtered.length === 0 ? (
        <p className="text-sm text-muted-foreground text-center py-10">No files yet.</p>
      ) : view === 'list' ? (
        <div className="bg-card border border-border rounded-2xl overflow-hidden">
          <div className="grid grid-cols-[1fr_auto_auto_auto] gap-4 px-4 py-2.5 border-b border-border">
            {['File', 'Project', 'Size', ''].map((h) => (
              <p key={h} className="text-[10px] font-semibold text-muted-foreground uppercase tracking-wider">{h}</p>
            ))}
          </div>
          {filtered.map((file, i) => {
            const Icon = typeIcons[file.type] ?? FileIcon
            return (
              <motion.a
                key={file.id}
                href={file.url}
                target="_blank"
                rel="noopener noreferrer"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: i * 0.03 }}
                className="grid grid-cols-[1fr_auto_auto_auto] gap-4 items-center px-4 py-3 border-b border-border/50 last:border-0 hover:bg-accent/30 transition-colors"
              >
                <div className="flex items-center gap-3 min-w-0">
                  <div className={`w-8 h-8 rounded-lg flex items-center justify-center shrink-0 ${typeColors[file.type] ?? 'bg-muted text-muted-foreground'}`}>
                    <Icon className="w-4 h-4" />
                  </div>
                  <div className="min-w-0">
                    <p className="text-sm font-medium truncate">{file.name}</p>
                    <p className="text-xs text-muted-foreground">{file.date}</p>
                  </div>
                </div>
                <span className="text-xs text-muted-foreground whitespace-nowrap">{file.project}</span>
                <span className="text-xs text-muted-foreground whitespace-nowrap">{file.size}</span>
                <ExternalLink className="w-4 h-4 text-muted-foreground" />
              </motion.a>
            )
          })}
        </div>
      ) : (
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-3">
          {filtered.map((file, i) => {
            const Icon = typeIcons[file.type] ?? FileIcon
            return (
              <motion.a
                key={file.id}
                href={file.url}
                target="_blank"
                rel="noopener noreferrer"
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: i * 0.03 }}
                className="bg-card border border-border rounded-2xl p-4 flex flex-col gap-3 group hover:border-primary/30 transition-colors"
              >
                <div className={`w-10 h-10 rounded-xl flex items-center justify-center ${typeColors[file.type] ?? 'bg-muted text-muted-foreground'}`}>
                  <Icon className="w-5 h-5" />
                </div>
                <div className="min-w-0">
                  <p className="text-xs font-medium truncate">{file.name}</p>
                  <p className="text-[10px] text-muted-foreground">{file.size} &middot; {file.date}</p>
                </div>
                <span className="flex items-center justify-center gap-1.5 py-1.5 rounded-lg bg-muted text-xs text-muted-foreground group-hover:bg-primary/10 group-hover:text-primary transition-colors w-full">
                  <Download className="w-3.5 h-3.5" />
                  Open
                </span>
              </motion.a>
            )
          })}
        </div>
      )}

      {showAdd && <AddFileModal onClose={() => setShowAdd(false)} clientId={clientId} projects={projects} />}
    </div>
  )
}
