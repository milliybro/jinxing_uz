import { create } from 'zustand'
import { persist } from 'zustand/middleware'

interface BranchStore {
  branch: number
  setBranch: (branch: number) => void
}

export const useBranchIdStore = create<BranchStore>()(
  persist(
    (set) => ({
      branch: 1,
      setBranch: (branch) => set({ branch }),
    }),
    {
      name: 'branchIdStore',
    },
  ),
)
