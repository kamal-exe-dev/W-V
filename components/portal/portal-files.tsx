'use client'

import { motion } from 'framer-motion'
import { useState } from 'react'
import {
  Search, Download, FileImage, FileText, FileVideo,
  Folder, Grid, List, File,
} from 'lucide-react'

const folders = [
  { name: 'E-Commerce Platform', count: 24 },
  { name: 'Brand Identity', count: 18 },
  { name: 'Mobile App', count: 12 },
  { name: 'Contracts & Legal', count: 6 },
]

const files = [
  { name: 'Nexus_EComm_Wireframes_v3.fig', type: 'figma', size: '18.4 MB', project: 'E-Commerce Platform', date: 'Jul 18, 2025', icon: FileImage },
  { name: 'Brand_Identity_Guidelines.pdf', type: 'pdf', size: '6.2 MB', project: 'Brand Identity', date: 'Jul 15, 2025', icon: FileText },
  { name: 'Logo_Final_Options.zip', type: 'zip', size: '42.1 MB', project: 'Brand Identity', date: 'Jul 14, 2025', icon: File },
  { name: 'App_Prototype_Walkthrough.mp4', type: 'video', size: '124 MB', project: 'Mobile App', date: 'Jul 10, 2025', icon: FileVideo },
  { name: 'Project_Proposal_Q3.pdf', type: 'pdf', size: '1.8 MB', project: 'Contracts & Legal', date: 'Jul 5, 2025', icon: FileText },
  { name: 'UI_Screens_Handoff_v2.fig', type: 'figma', size: '9.7 MB', project: 'Mobile App', date: 'Jul 3, 2025', icon: FileImage },
  { name: 'Service_Agreement_2025.pdf', type: 'pdf', size: '0.9 MB', project: 'Contracts & Legal', date: 'Jun 28, 2025', icon: FileText },
  { name: 'EComm_DesignSystem.fig', type: 'figma', size: '11.2 MB', project: 'E-Commerce Platform', date: 'Jun 20, 2025', icon: FileImage },
]

const typeColors: Record<string, string> = {
  figma: 'text-violet-500 bg-violet-500/10',
  pdf: 'text-red-500 bg-red-500/10',
  zip: 'text-amber-500 bg-amber-500/10',
  video: 'text-blue-500 bg-blue-500/10',
}

export function PortalFiles() {
  const [search, setSearch] = useState('')
  const [view, setView] = useState<'grid' | 'list'>('list')

  const filtered = files.filter((f) =>
    f.name.toLowerCase().includes(search.toLowerCase()) ||
    f.project.toLowerCase().includes(search.toLowerCase())
  )

  return (
    <div className="space-y-5 max-w-4xl">
      <div>
        <h2 className="text-xl font-bold">Files</h2>
        <p className="text-sm text-muted-foreground">All shared files and deliverables from your projects.</p>
      </div>

      {/* Folders */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
        {folders.map((folder, i) => (
          <motion.button
            key={folder.name}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.04 }}
            className="flex items-center gap-3 p-4 bg-card border border-border rounded-2xl hover:border-primary/30 hover:bg-primary/5 transition-colors text-left group"
          >
            <div className="w-9 h-9 rounded-xl bg-primary/10 flex items-center justify-center shrink-0 group-hover:bg-primary/20 transition-colors">
              <Folder className="w-4.5 h-4.5 text-primary" />
            </div>
            <div className="min-w-0">
              <p className="text-xs font-semibold truncate">{folder.name}</p>
              <p className="text-[10px] text-muted-foreground">{folder.count} files</p>
            </div>
          </motion.button>
        ))}
      </div>

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
      {view === 'list' ? (
        <div className="bg-card border border-border rounded-2xl overflow-hidden">
          <div className="grid grid-cols-[1fr_auto_auto_auto] gap-4 px-4 py-2.5 border-b border-border">
            {['File', 'Project', 'Size', ''].map((h) => (
              <p key={h} className="text-[10px] font-semibold text-muted-foreground uppercase tracking-wider">{h}</p>
            ))}
          </div>
          {filtered.map((file, i) => (
            <motion.div
              key={file.name}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: i * 0.03 }}
              className="grid grid-cols-[1fr_auto_auto_auto] gap-4 items-center px-4 py-3 border-b border-border/50 last:border-0 hover:bg-accent/30 transition-colors"
            >
              <div className="flex items-center gap-3 min-w-0">
                <div className={`w-8 h-8 rounded-lg flex items-center justify-center shrink-0 ${typeColors[file.type] ?? 'bg-muted text-muted-foreground'}`}>
                  <file.icon className="w-4 h-4" />
                </div>
                <div className="min-w-0">
                  <p className="text-sm font-medium truncate">{file.name}</p>
                  <p className="text-xs text-muted-foreground">{file.date}</p>
                </div>
              </div>
              <span className="text-xs text-muted-foreground whitespace-nowrap">{file.project}</span>
              <span className="text-xs text-muted-foreground whitespace-nowrap">{file.size}</span>
              <button
                className="p-1.5 rounded-lg text-muted-foreground hover:text-foreground hover:bg-accent transition-colors"
                aria-label={`Download ${file.name}`}
              >
                <Download className="w-4 h-4" />
              </button>
            </motion.div>
          ))}
        </div>
      ) : (
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-3">
          {filtered.map((file, i) => (
            <motion.div
              key={file.name}
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: i * 0.03 }}
              className="bg-card border border-border rounded-2xl p-4 flex flex-col gap-3 group hover:border-primary/30 transition-colors"
            >
              <div className={`w-10 h-10 rounded-xl flex items-center justify-center ${typeColors[file.type] ?? 'bg-muted text-muted-foreground'}`}>
                <file.icon className="w-5 h-5" />
              </div>
              <div className="min-w-0">
                <p className="text-xs font-medium truncate">{file.name}</p>
                <p className="text-[10px] text-muted-foreground">{file.size} &middot; {file.date}</p>
              </div>
              <button className="flex items-center justify-center gap-1.5 py-1.5 rounded-lg bg-muted text-xs text-muted-foreground hover:bg-primary/10 hover:text-primary transition-colors w-full">
                <Download className="w-3.5 h-3.5" />
                Download
              </button>
            </motion.div>
          ))}
        </div>
      )}
    </div>
  )
}
